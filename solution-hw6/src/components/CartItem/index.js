import React from 'react';

function CartItem({ item, index, onRemove }) {
    return (
        <div className="cart-item">
            <img src={`assets/products/${item.type.toLowerCase().replace(/-| /g, '-')}-cinnamon-roll.jpg`} alt={`${item.type} Cinnamon Roll`} />
            <p>{item.type} cinnamon roll</p>
            <p>Glazing: {item.glazing}</p>
            <p>Pack size: {item.packSize}</p>
            <p>${item.price}</p>
            <a href="#" onClick={e => { e.preventDefault(); onRemove(index); }}>Remove</a>
        </div>
    );
}

export default CartItem;
