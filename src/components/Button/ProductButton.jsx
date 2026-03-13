import PropTypes from "prop-types";
import './Button.css';

const ProductButton = (props) => {

    const { text = "Default text", onClick, isPrimary = true, type = null, disabled = false } = props;

    return (
        <button
            className={`button ${isPrimary ? "primary__button": "secondary__button"}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

ProductButton.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string,
    isPrimary: PropTypes.bool,
    type: PropTypes.string,
    disabled: PropTypes.bool
}

export default ProductButton;
