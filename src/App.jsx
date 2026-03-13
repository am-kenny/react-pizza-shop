import './assets/reset.css'
import './assets/fonts.css'
import './App.css'
import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Menu from "./pages/Menu/Menu.jsx";
import {UserContext} from "./context/UserInfoContext.jsx";
import {useContext} from "react";
import {useSelector} from "react-redux";
import Cart from "./pages/Cart/Cart.jsx";
import cartImage from './assets/images/cart.png'
import NewOrder from "./pages/NewOrder/NewOrder.jsx";
import Order from "./pages/Order/Order.jsx";
import OrderSearch from "./components/OrderSearch/OrderSearch.jsx";

function App() {

    const name = useContext(UserContext)[0]
    const navigate = useNavigate();
    const totalCartItems = useSelector((state) =>
        state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
    );

    return (
        <div className="App">
            <header className={"app__header"}>
                <div className="header-container">
                    <h1 className={"header__company__name"}>PIZZA DAY</h1>
                    <div className="search-container">
                        <OrderSearch />
                    </div>

                    <div className={'cart_and_name'}>
                        <div className="cart-icon-wrapper" onClick={() => navigate('/cart')}>
                            <img className={'cart_image'} src={cartImage} alt={'Cart'}/>
                            {totalCartItems > 0 && (
                                <span className="cart-badge">{totalCartItems}</span>
                            )}
                        </div>
                        <div className={"user_name"}>
                            {name}
                        </div>
                    </div>
                </div>

            </header>

            <div className="content__container">
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/menu' element={<Menu/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='order/new' element={<NewOrder/>}/>
                    <Route path='/order/:id' element={<Order/>}/>
                    <Route path='*' element={<PageNotFound/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App
