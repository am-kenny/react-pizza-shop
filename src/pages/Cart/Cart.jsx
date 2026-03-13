import {useDispatch, useSelector} from "react-redux";
import {clearCart} from "../../redux/slices/cartSlice.jsx";
import {useNavigate} from "react-router-dom";
import CartProduct from "../../components/CartProduct/CartProduct.jsx";
import './Cart.css'
import ProductButton from "../../components/Button/ProductButton.jsx";
import {useContext} from "react";
import {UserContext} from "../../context/UserInfoContext.jsx";



const Cart = () => {
    const {items} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const name = useContext(UserContext)[0]


    const handleClearCart = () => {
        dispatch(clearCart());
    }

    const handleOrder = () => {
        if (items.length > 0) {
            navigate('/order/new')
        }
    }

    return (
        <div className={'cart__container'}>
            <button className={'button__back'} onClick={() => navigate(-1)}>← Back</button>

            <h1 className={'cart__title'}>Your cart, {name? name : 'guest'}</h1>

            {items.length === 0 ? (
                <div className={'cart__empty'}>
                    <p className={'cart__empty-message'}>
                        Your cart is empty. Go to the menu to add pizzas.
                    </p>
                    <ProductButton
                        onClick={() => navigate('/menu')}
                        text={'GO TO MENU'}
                    />
                </div>
            ) : (
                <div>
                    {items.map((item) => {
                        return <CartProduct key={item.id} product={item}/>
                    })}
                </div>
            )}

            {items.length > 0 && (
                <div className={'cart__buttons'}>
                    <ProductButton
                        onClick={handleOrder}
                        text={'ORDER PIZZAS'}
                    ></ProductButton>
                    <ProductButton
                        onClick={handleClearCart}
                        text={'CLEAR CART'}
                        isPrimary={false}
                    ></ProductButton>
                </div>
            )}
        </div>
    );
};

export default Cart;