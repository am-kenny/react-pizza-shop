import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PIZZA_API } from "../../constants.js";
import "./OrderSearch.css";

const ORDER_ID_REGEX = /^[A-Za-z0-9]{6}$/;

function OrderSearch() {
    const [value, setValue] = useState("");
    const [message, setMessage] = useState(null);
    const [searching, setSearching] = useState(false);
    const navigate = useNavigate();

    const validate = (raw) => {
        const trimmed = raw.trim();
        if (!trimmed) return { valid: false, error: "Enter an order number" };
        if (!ORDER_ID_REGEX.test(trimmed)) {
            return { valid: false, error: "Order number must be 6 letters or digits" };
        }
        return { valid: true, id: trimmed.toUpperCase() };
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        setMessage(null);

        const { valid, error, id } = validate(value);
        if (!valid) {
            setMessage(error);
            return;
        }

        setSearching(true);
        try {
            const response = await fetch(`${PIZZA_API}/order/${id}`);
            if (!response.ok) {
                setMessage("Order not found");
                return;
            }
            const data = await response.json();
            if (data?.data?.id != null) {
                navigate(`/order/${data.data.id}`);
                setValue("");
            } else {
                setMessage("Order not found");
            }
        } catch {
            setMessage("Order not found. Please try again.");
        } finally {
            setSearching(false);
        }
    };

    const handleChange = (e) => {
        setValue(e.target.value);
        if (message) setMessage(null);
    };

    return (
        <div className="order-search">
            <form className="order-search__form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search for the order #"
                    value={value}
                    onChange={handleChange}
                    disabled={searching}
                    className="order-search__input"
                    aria-label="Order number"
                />
                <button
                    type="submit"
                    className="order-search__btn"
                    disabled={searching}
                    aria-label="Search order"
                >
                    {searching ? "..." : "Search"}
                </button>
            </form>
            {message && <p className="order-search__message" role="alert">{message}</p>}
        </div>
    );
}

export default OrderSearch;
