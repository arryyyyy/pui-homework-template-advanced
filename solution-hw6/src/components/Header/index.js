import './styles.css';
import React, { useState } from 'react';

function Header({ cart, showPopup, currentAddedRoll, onSearch, onSortChange, sortCriteria, toggleCartDisplay }) {
    let itemCount = cart ? cart.length : 0;
    let total = cart ? cart.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2) : 0;

    // State for the search
    const [searchQuery, setSearchQuery] = useState('');

    // To handle the search bar input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // To handle the search button click
    const handleSearchClick = () => {
        onSearch(searchQuery);
    };

    // To handle change in sorting criteria
    const handleSortChange = (e) => {
        onSortChange(e.target.value);
    };

    return (
        <header>
            <img src="assets/logo/logo-01.svg" alt="Logo" />
            <div>
                <nav>
                    <ul>
                        <li><a href="#" className="products-link">Products</a></li>
                        <li className="cart-dropdown">
                        <a href="#" className="cart-link" onClick={toggleCartDisplay}>Cart</a>
                            <div className="cart-summary">
                                <p id="items">{itemCount} items</p>
                                <p>Total: <span id="totPrice">${total}</span></p>
                            </div>
                            {showPopup && (
                                <div id="cartPopup">
                                    <p>Added to cart</p><br />
                                    <strong>{currentAddedRoll.type} cinnamon roll</strong><br />
                                    <p>{currentAddedRoll.glazing}</p>
                                    <p>Pack of {currentAddedRoll.packSize}</p>
                                    <p>Price: ${typeof currentAddedRoll.price === 'number' ? currentAddedRoll.price.toFixed(2) : currentAddedRoll.price}</p>
                                </div>
                            )}
                        </li>
                    </ul>
                </nav>
                <hr />
                <h1>Our hand-made cinnamon rolls</h1>
                {/* Search & Sort */}
                <div className="search-wrapper">
                    <div className="search-container">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search Roll"
                        />
                        <button onClick={handleSearchClick}>Search</button>
                        <label htmlFor="sortDropdown">sort by:</label> 
                        <select id="sortDropdown" value={sortCriteria} onChange={handleSortChange}>
                            <option value="Name">Name</option>
                            <option value="Base Price">Base Price</option>
                        </select>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
