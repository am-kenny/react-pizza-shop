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

            <footer className="app__footer">
                <p className="footer__text">
                    © {new Date().getFullYear()} Andrii Prykhodko
                    <span className="footer__separator" />
                    <a
                        href="https://github.com/am-kenny/react-pizza-shop"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer__link"
                    >
                        <span className="footer__icon" aria-hidden="true">
                            <svg
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
                                0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
                                -.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
                                0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27
                                1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
                                0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                            </svg>
                        </span>
                        <span className="footer__linkText">GitHub</span>
                    </a>
                </p>
            </footer>
        </div>
    )
}

export default App
