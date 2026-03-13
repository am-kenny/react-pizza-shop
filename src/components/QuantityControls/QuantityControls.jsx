import './QuantityControls.css';
import PropTypes from "prop-types";

const QuantityControls = ({quantity, onIncrement, onDecrement, onRemove, compact = false}) => {
    return (
        <div className={`product-quantity-controls${compact ? " product-quantity-controls--compact" : ""}`}>
            <button
                className="product-quantity-button"
                onClick={onDecrement}
            >
                –
            </button>
            <span className="product-quantity-value">
                {quantity}
            </span>
            <button
                className="product-quantity-button"
                onClick={onIncrement}
            >
                +
            </button>
            <button
                className="product-remove-button"
                onClick={onRemove}
                aria-label="Remove from cart"
            >
                <svg
                    className="product-remove-icon"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        d="M9 3h6a1 1 0 0 1 1 1v1h4v2h-1v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7H4V5h4V4a1 1 0 0 1 1-1zm1 2v0h4V5h-4zm-2 4h2v9H8zm6 0h2v9h-2z"/>
                </svg>
            </button>
        </div>
    );
};

QuantityControls.propTypes = {
    quantity: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    compact: PropTypes.bool,
};

export default QuantityControls;

