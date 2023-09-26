import React from 'react';
import './styles.css';


function Navbar() {
    return (
        <nav>
            <ul>
                <li><a href="#" className="products-link">Products</a></li>
                <li><a href="#" className="cart-link">Cart</a></li>
            </ul>
        </nav>
    );
}

function Title() {
    return (
        <div>
            <hr />
            <h1>Our hand-made cinnamon rolls</h1>
        </div>
    );
}

function Header() {
    return (
        <header>
            <img src="assets/logo/logo-01.svg" alt="Logo" />
            <div>
                <Navbar />
                <Title />
            </div>
        </header>
    );
}

function Product({ name, price, imgSrc }) {
    return (
        <div className="cinnamon-roll">
            <img src={imgSrc} alt={name} />
            <h3>{name}</h3>
            <div className="options">
                <div className="glazing">
                    <label htmlFor={`glazing-${name}`}>Glazing:</label>
                    <select id={`glazing-${name}`}>
                        <option value="original">Keep Original</option>
                        <option value="sugar-milk">Sugar Milk</option>
                        <option value="vanilla-milk">Vanilla Milk</option>
                        <option value="double-chocolate">Double Chocolate</option>
                    </select>
                </div>
                <div className="pack-sizes">
                    <label>Pack Size:</label>
                    <input type="radio" id={`pack-size-1-${name}`} name="pack-size" value="1" />
                    <label htmlFor={`pack-size-1-${name}`} className="pack-size-label">1</label>

                    <input type="radio" id={`pack-size-3-${name}`} name="pack-size" value="3" />
                    <label htmlFor={`pack-size-3-${name}`} className="pack-size-label">3</label>

                    <input type="radio" id={`pack-size-6-${name}`} name="pack-size" value="6" />
                    <label htmlFor={`pack-size-6-${name}`} className="pack-size-label">6</label>

                    <input type="radio" id={`pack-size-12-${name}`} name="pack-size" value="12" />
                    <label htmlFor={`pack-size-12-${name}`} className="pack-size-label">12</label>
                </div>

                <div className="cost-button">
                    <p>{price}</p>
                    <button className="add-to-cart">Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

function ProductSection() {
    const products = [
        { name: "Original Cinnamon Roll", price: "$2.49", imgSrc: "assets/products/original-cinnamon-roll.jpg" },
        { name: "Apple Cinnamon Roll", price: "$3.49", imgSrc: "assets/products/apple-cinnamon-roll.jpg" },
        { name: "Raisin Cinnamon Roll", price: "$2.99", imgSrc: "assets/products/raisin-cinnamon-roll.jpg" },
        { name: "Walnut Cinnamon Roll", price: "$3.49", imgSrc: "assets/products/walnut-cinnamon-roll.jpg" },
        { name: "Double-chocolate Cinnamon Roll", price: "$3.99", imgSrc: "assets/products/double-chocolate-cinnamon-roll.jpg" },
        { name: "Strawberry Cinnamon Roll", price: "$3.99", imgSrc: "assets/products/strawberry-cinnamon-roll.jpg" },
    ];

    return (
        <section className="product">
            <div className="cinnamon-rolls-container">
                {products.map((product, index) => (
                    <Product key={index} {...product} />
                ))}
            </div>
        </section>
    );
}

function HomePage() {
    return (
        <div>
            <Header />
            <ProductSection />
        </div>
    );
}

export default HomePage;
