import './styles.css';
import React, { useState, useEffect, useCallback } from 'react';
import Roll from '../../components/Roll';
import Header from '../../components/Header';

function Home() {
    const [cart, setCart] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [currentAddedRoll, setCurrentAddedRoll] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [sortCriteria, setSortCriteria] = useState('Name');
    const [resetSelections, setResetSelections] = useState(false);
    const [showCart, setShowCart] = useState(false);

    const [rolls, setRolls] = useState([
        { type: 'Original', basePrice: 2.49 },
        { type: 'Apple', basePrice: 3.49 },
        { type: 'Raisin', basePrice: 2.99 },
        { type: 'Walnut', basePrice: 3.49 },
        { type: 'Double-chocolate', basePrice: 3.99 },
        { type: 'Strawberry', basePrice: 3.99 },
    ]);

    const handleAddToCart = (roll) => {
        setCart([...cart, roll]);
        setCurrentAddedRoll(roll);
        setShowPopup(true);
    };

    useEffect(() => {
        let timer;
        if (showPopup) {
            timer = setTimeout(() => {
                setShowPopup(false);
            }, 3000);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [showPopup]);

    const handleRemoveFromCart = (itemToRemove) => {
        setCart(prevCart => prevCart.filter(item => item !== itemToRemove));
    };

    const toggleCartDisplay = () => {
        setShowCart(prevShow => !prevShow);
    };

    const handleSearch = (query) => {
        setSearchQuery(query.toLowerCase());
    };

    const handleSort = (criteria) => {
        let sorted;
        if (criteria === "Name") {
            sorted = [...rolls].sort((a, b) => a.type.localeCompare(b.type));
        } else if (criteria === "Base Price") {
            sorted = [...rolls].sort((a, b) => a.basePrice - b.basePrice);
        }
        setRolls(sorted);
        setSortCriteria(criteria);
        setResetSelections(prevState => !prevState);  // Toggle the reset state
    };

    const filteredRolls = rolls.filter(roll => (roll.type + " Cinnamon Roll").toLowerCase().includes(searchQuery));

    return (
        <div>
            <Header
                cart={cart}
                showPopup={showPopup}
                currentAddedRoll={currentAddedRoll}
                onSearch={handleSearch}
                onSortChange={handleSort}
                sortCriteria={sortCriteria}
                toggleCartDisplay={toggleCartDisplay}
            />

            {showCart && (
                <div className="cart-display">
                    <hr className="thick-line" />
                    <div className="cart-header">
                        <p>
                            Shopping Cart (
                            {cart.length === 1 ? `${cart.length} item` : `${cart.length} items`}
                            )
                        </p>
                        <p>Total: $ {cart.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2)}</p>
                    </div>
                    {cart.length === 0 ? (
                        <p className="cart-empty-message">The cart is empty!</p>
                    ) : (
                        <div className="cart-items-container">
                            {cart.map(item => (
                                <div className="cart-item" key={item.type + item.glazing + item.packSize}>
                                    <img src={`assets/products/${item.type.toLowerCase().replace(/-| /g, '-')}-cinnamon-roll.jpg`} alt={`${item.type} Cinnamon Roll`} />
                                    <p>{item.type} cinnamon roll</p>
                                    <p>Glazing: {item.glazing}</p>
                                    <p>Pack size: {item.packSize}</p>
                                    <p>${item.price}</p>
                                    <a href="#" onClick={e => { e.preventDefault(); handleRemoveFromCart(item); }}>Remove</a>
                                </div>
                            ))}
                        </div>
                    )}
                    <hr className="thick-line" />
                </div>
            )}


            <div className="cinnamon-rolls-container">
                {filteredRolls.map(roll => (
                    <Roll key={roll.type} type={roll.type} basePrice={roll.basePrice} addToCart={handleAddToCart} resetSelections={resetSelections} />
                ))}
            </div>
        </div>
    );
}

export default Home;
