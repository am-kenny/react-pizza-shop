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
import QuantityControls from "../QuantityControls/QuantityControls.jsx";

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
                    <div className="add-to-cart-btn__inner">
                        {showAddButton && (
                            <ProductButton onClick={handleAddToCart} text={"ADD TO CART"} />
                        )}
                        {showQuantityControls && (
                            <QuantityControls
                                quantity={quantityInCart}
                                onIncrement={handleIncrementQuantity}
                                onDecrement={handleDecrementQuantity}
                                onRemove={handleRemoveFromCart}
                            />
                        )}
                    </div>
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