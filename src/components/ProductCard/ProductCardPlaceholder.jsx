import './ProductCard.css';
import pizzaImage from '../../assets/images/pizza.png';

const ProductCardPlaceholder = () => {

    return (
        <div className={`product-card placeholder`}>
            <div className="product-image-container">
                <img src={pizzaImage} alt={name} className="product-image"/>
            </div>
            <div className="product-info">
                <div className={"product-info-text"}>
                    <h3 className="product-name placeholder">{name}</h3>
                    <p className="product-ingredients placeholder"></p>
                    <div className="product-price placeholder"></div>
                </div>
                <div className="add-to-cart-btn">
                    <div className="add-to-cart-btn__inner"></div>
                </div>
            </div>
        </div>
    );

};


export default ProductCardPlaceholder;