import {useState} from "react";
import {useParams} from "react-router-dom";
import OrderProduct from "../../components/OrderProduct/OrderProduct.jsx";
import './Order.css';
import useFetch from "../../hooks/useFetch.jsx";
import {formatDeliveryDate, PIZZA_API} from "../../constants.js";
import ProductButton from "../../components/Button/ProductButton.jsx";

const Order = () => {
    const params = useParams();
    const {data: response, loading, error, refetch} = useFetch(`${PIZZA_API}/order/${params.id}`);
    const [isPrioritizing, setIsPrioritizing] = useState(false);
    const [priorityFeedback, setPriorityFeedback] = useState(null);

    const handlePrioritize = async () => {
        if (!response?.data || isPrioritizing) return;
        const order = response.data;
        setIsPrioritizing(true);
        setPriorityFeedback(null);
        try {
            const res = await fetch(`${PIZZA_API}/order/${params.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ priority: !order.priority }),
            });
            const json = await res.json();
            if (json.status === "success") {
                await refetch();
                setPriorityFeedback({ type: "success", message: order.priority ? "Priority removed." : "Order set as priority." });
            } else {
                setPriorityFeedback({ type: "error", message: "Could not update priority. Try again." });
            }
        } catch (err) {
            setPriorityFeedback({ type: "error", message: "Something went wrong. Please try again." });
        } finally {
            setIsPrioritizing(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Something went wrong: {error.message}</div>;

    const order = response.data;
    const estimatedDelivery = new Date(order.estimatedDelivery);
    const waitTimeMinutes = (estimatedDelivery.getTime() - new Date().getTime()) / 60000;
    const products = order.cart;

    return (
        <div className="order__container">
            <div className="order-header">
                <h2 className={'order-title'}>Order {order.id} status: {order.status}</h2>
                <div className="order-status">
                    {order.priority && <span className="priority">PRIORITY</span>}
                    {order.status === "preparing" && <span className="preparing">PREPARING ORDER</span>}
                </div>
            </div>

            <div className="order-timer order-accent-container">
                <span className={"order-timer__minutes-left"}>Only {waitTimeMinutes.toFixed()} minutes left 😮</span>
                <span className={"order-timer__estimated"}>(Estimated delivery: {formatDeliveryDate(estimatedDelivery)})</span>
            </div>

            <div className="order-products">
                {products.map((product, index) => (
                    <OrderProduct key={index} {...product} />
                ))}
            </div>
            <div className="order-summary order-accent-container">
                <p>Price pizza: €{order.orderPrice.toFixed(2)}</p>
                <p>Price priority: €{order.priorityPrice.toFixed(2)}</p>
                <p className={"order-summary__final-price"}>To pay on delivery: €{(order.orderPrice + order.priorityPrice).toFixed(2)}</p>
            </div>
            {!order.priority && (
                <div className={"prioritize__container"}>
                    <div className="prioritize__feedback">
                        {priorityFeedback && (
                            <span className={priorityFeedback.type === "success" ? "prioritize__success" : "prioritize__error"}>
                                {priorityFeedback.message}
                            </span>
                        )}
                    </div>
                    <ProductButton
                        text={isPrioritizing ? "Updating…" : "PRIORITIZE"}
                        onClick={handlePrioritize}
                        disabled={isPrioritizing}
                    />
                </div>
            )}
        </div>
    );
};


export default Order;