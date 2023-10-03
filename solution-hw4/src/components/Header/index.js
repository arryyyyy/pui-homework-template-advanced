import './styles.css';

function Header({ cart, showPopup, currentAddedRoll }) {
    let itemCount = cart ? cart.length : 0;
    let total = cart ? cart.reduce((acc, item) => acc + parseFloat(item.price), 0) : 0;

    return (
        <header>
            <img src="assets/logo/logo-01.svg" alt="Logo" />
            <div>
                <nav>
                    <ul>
                        <li><a href="#" className="products-link">Products</a></li>
                        <li className="cart-dropdown">
                            <a href="#" className="cart-link">Cart</a>
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
            </div>
        </header>
    );
}

export default Header;
