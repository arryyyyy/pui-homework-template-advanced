import React, { useState, useEffect } from 'react';
import './styles.css';

function Roll({ type, basePrice, addToCart }) {
    const [glazing, setGlazing] = useState('Keep Original');
    const [packSize, setPackSize] = useState(1);
    const [cartPopupVisible, setCartPopupVisible] = useState(false);
    const [price, setPrice] = useState(basePrice);

    useEffect(() => {
        updatePrice(basePrice, glazing, packSize);
    }, [glazing, packSize]);

    const handleGlazingChange = (event) => {
        setGlazing(event.target.value);
    };

    const handlePackSizeChange = (event) => {
        const newSize = parseInt(event.target.value, 10); 
        setPackSize(newSize);
    };

    const updatePrice = (base, glazingOption, packSizeOption) => {
        const glazingPrices = {
            'Keep Original': 0,
            'Sugar Milk': 0,
            'Vanilla': 0.5,
            'Double Chocolate': 1.5,
        };

        const packSizePrices = {
            1: 1,
            3: 3,
            6: 5,
            12: 10,
        };

        const newPrice = (base + glazingPrices[glazingOption]) * packSizePrices[packSizeOption];
        setPrice(newPrice.toFixed(2));
    };

    const handleAddToCart = () => {
        const rollToAdd = {
            type: type,
            glazing: glazing,
            packSize: packSize,
            price: price
        };

        addToCart(rollToAdd);

        setCartPopupVisible(true);
        setTimeout(() => {
            setCartPopupVisible(false);
        }, 3000);
    };

    return (
        <div className="cinnamon-roll">
            <img src={`assets/products/${type.toLowerCase().replace(/-| /g, '-')}-cinnamon-roll.jpg`} alt={`${type} Cinnamon Roll`} />
            <h3>{type} Cinnamon Roll</h3>
            <div className="options">
                <div className="glazing">
                    <label>Glazing:</label>
                    <select value={glazing} onChange={handleGlazingChange}>
                        <option value="Keep Original">Keep Original</option>
                        <option value="Sugar Milk">Sugar Milk</option>
                        <option value="Vanilla">Vanilla</option>
                        <option value="Double Chocolate">Double Chocolate</option>
                    </select>
                </div>
                <div className="pack-sizes">
                    <label>Pack Size:</label>
                    {[1, 3, 6, 12].map(size => (
                        <div key={size}>
                            <input
                                type="radio"
                                id={`pack-size-${size}-${type}`}
                                name="pack-size"
                                value={size}
                                checked={packSize == size}
                                onChange={handlePackSizeChange}
                                key={size}
                            />
                            <label className="pack-size-label" htmlFor={`pack-size-${size}-${type}`}>{size}</label>
                        </div>
                    ))}
                </div>
                <div className="cost-button">
                    <p>${price}</p>
                    <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default Roll;
