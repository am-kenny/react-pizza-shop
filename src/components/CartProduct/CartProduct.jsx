import {useDispatch} from "react-redux";
import {decrementQuantity, incrementQuantity, removeFromCart} from "../../redux/slices/cartSlice.jsx";
import PropTypes from "prop-types";
import './CartProduct.css';
import QuantityControls from "../QuantityControls/QuantityControls.jsx";

const CartProduct = ({product}) => {


    const dispatch = useDispatch();


    const handleDeleteFromCart = (id) => {
        dispatch(removeFromCart(id));
    }

    const handleDecrementQuantity = (id) => {
        dispatch(decrementQuantity(id));
    }

    const handleIncrementQuantity = (id) => {
        dispatch(incrementQuantity(id))
    }


    return (
        <div className={'cart__product__container'}>
            <div className={'cart__product__name'}>{product.quantity}x {product.name}</div>
            <div className={'cart__product__info'}>
                <span className={'cart__product__price'}>€{(product.unitPrice * product.quantity).toFixed(2)}</span>
                <QuantityControls
                    quantity={product.quantity}
                    onIncrement={() => handleIncrementQuantity(product.id)}
                    onDecrement={() => handleDecrementQuantity(product.id)}
                    onRemove={() => handleDeleteFromCart(product.id)}
                    compact
                />
            </div>
        </div>
    );
};

CartProduct.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        unitPrice: PropTypes.number.isRequired,
    }).isRequired,
}

export default CartProduct;