import {useEffect} from "react";
import './Menu.css'
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getMenuItems} from "../../redux/slices/menuSlice.jsx";
import ProductCardPlaceholder from "../../components/ProductCard/ProductCardPlaceholder.jsx";

const Menu = () => {
    const dispatch = useDispatch();
    const {isLoading, isError, menuItems} = useSelector((state) => state.menu);


    useEffect(() => {
        dispatch(getMenuItems())
    }, [dispatch]);

    if (isError) {
        return <div className="container">Failed to fetch</div>
    }

    if (isLoading) {
        return (
            <div className="container">
                <div className="container__list">
                        <ProductCardPlaceholder/>
                        <ProductCardPlaceholder/>
                        <ProductCardPlaceholder/>
                        <ProductCardPlaceholder/>
                        <ProductCardPlaceholder/>
                </div>
            </div>
        )
    }

    const sortedMenuItems = [...(menuItems || [])].sort((a, b) => {
        if (a.soldOut === b.soldOut) return 0;
        return a.soldOut ? 1 : -1; // available first, unavailable last
    });

    return (
        <div className="container">
            <div className="container__list">
                {sortedMenuItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default Menu