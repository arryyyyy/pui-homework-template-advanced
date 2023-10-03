import './styles.css';
import React, { useState, useEffect } from 'react';
import Roll from '../../components/Roll';
import Header from '../../components/Header';

function Home() {
    const [cart, setCart] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [currentAddedRoll, setCurrentAddedRoll] = useState({});


    const handleAddToCart = (roll) => {
        //Add the roll to cart
        setCart([...cart, roll]);

        // Show the popup
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

    const rollTypes = [
        { type: 'Original', basePrice: 2.49 },
        { type: 'Apple', basePrice: 3.49 },
        { type: 'Raisin', basePrice: 2.99 },
        { type: 'Walnut', basePrice: 3.49 },
        { type: 'Double-chocolate', basePrice: 3.99 },
        { type: 'Strawberry', basePrice: 3.99 },
    ];

    return (
        <div>
            <Header cart={cart} showPopup={showPopup} currentAddedRoll={currentAddedRoll} />

            <div className="cinnamon-rolls-container">
                {rollTypes.map(roll => (
                    <Roll key={roll.type} type={roll.type} basePrice={roll.basePrice} addToCart={handleAddToCart} />
                ))}
            </div>
        </div>
    );
}

export default Home;
