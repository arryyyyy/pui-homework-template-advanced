import './styles.css';
import React, { useState, useEffect, useCallback } from 'react';
import Roll from '../../components/Roll';
import Header from '../../components/Header';
import CartItem from '../../components/CartItem';

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

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const handleAddToCart = (roll) => {
        const updatedCart = [...cart, roll];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        console.log("Updated Cart:", updatedCart);
        setCurrentAddedRoll(roll);
        setShowPopup(true);
    };

    const handleRemoveFromCart = (itemIndex) => {
        const updatedCart = [...cart];
        updatedCart.splice(itemIndex, 1);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        console.log("Updated Cart:", updatedCart);
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
                            {cart.map((item, index) => (
                                <CartItem key={index} item={item} index={index} onRemove={handleRemoveFromCart} />
                            ))}
                        </div>
                    )}
                    <hr className="thick-line" />
                </div>
            )}


            <div className="cinnamon-rolls-container">
                {filteredRolls.length === 0 ? (
                    <p className="no-match-message">No match found for "{searchQuery}"</p>
                ) : (
                    filteredRolls.map(roll => (
                        <Roll key={roll.type} type={roll.type} basePrice={roll.basePrice} addToCart={handleAddToCart} resetSelections={resetSelections} />
                    ))
                )}
            </div>
        </div>
    );
}

export default Home;
