import './ProductCard.css';
import ProductButton from "../Button/ProductButton.jsx";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {
    addToCart,
    decrementQuantity,
    incrementQuantity,
    removeFromCart
} from "../../redux/slices/cartSlice.jsx";
import {capitalizeIngredients} from "../../constants.js";

const ProductCard = ({product}) => {
    const {id, name, unitPrice, imageUrl, ingredients, soldOut} = product;

    const dispatch = useDispatch();
    const {items} = useSelector((state) => state.cart);

    const cartItem = items.find((item) => item.pizzaId === id);
    const quantityInCart = cartItem?.quantity ?? 0;

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    const handleIncrementQuantity = () => {
        if (cartItem) {
            dispatch(incrementQuantity(id));
        } else {
            dispatch(addToCart(product));
        }
    };

    const handleDecrementQuantity = () => {
        if (cartItem) {
            dispatch(decrementQuantity(id));
        }
    };

    const handleRemoveFromCart = () => {
        if (cartItem) {
            dispatch(removeFromCart(id));
        }
    };

    const showAddButton = !soldOut && !cartItem;
    const showQuantityControls = !soldOut && !!cartItem;

    return (
        <div className={`product-card ${soldOut ? 'sold-out' : ''}`}>
            <div className="product-image-container">
                <img src={imageUrl} alt={name} className="product-image"/>
            </div>
            <div className="product-info">
                <div className={"product-info-text"}>
                    <h3 className="product-name">{name}</h3>
                    <p className="product-ingredients">{capitalizeIngredients(ingredients).join(', ')}</p>
                    <div className="product-price">{soldOut ? 'SOLD OUT' : `€${unitPrice.toFixed(2)}`}</div>
                </div>
                <div className="add-to-cart-btn">
                    {showAddButton && (
                        <ProductButton onClick={handleAddToCart} text={"ADD TO CART"} />
                    )}
                    {showQuantityControls && (
                        <div className="product-quantity-controls">
                            <button
                                className="product-quantity-button"
                                onClick={handleDecrementQuantity}
                            >
                                –
                            </button>
                            <span className="product-quantity-value">
                                {quantityInCart}
                            </span>
                            <button
                                className="product-quantity-button"
                                onClick={handleIncrementQuantity}
                            >
                                +
                            </button>
                            <button
                                className="product-remove-button"
                                onClick={handleRemoveFromCart}
                                aria-label="Remove from cart"
                            >
                                <svg
                                    className="product-remove-icon"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M9 3h6a1 1 0 0 1 1 1v1h4v2h-1v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7H4V5h4V4a1 1 0 0 1 1-1zm1 2v0h4V5h-4zm-2 4h2v9H8zm6 0h2v9h-2z" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
        unitPrice: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired,
        soldOut: PropTypes.bool.isRequired,
    }).isRequired,
};

export default ProductCard;