import {Controller, useForm} from "react-hook-form";
import {useContext, useState} from "react";
import {UserContext} from "../../context/UserInfoContext.jsx";
import {yupResolver} from "@hookform/resolvers/yup";
import {validationSchema} from "../../validationSchema.js";
import TextInput from "../../components/Input/TextInput.jsx";
import CheckboxInput from "../../components/Input/CheckboxInput.jsx";
import ProductButton from "../../components/Button/ProductButton.jsx";
import {useDispatch, useSelector} from "react-redux";
import './NewOrder.css';
import {useNavigate} from "react-router-dom";
import {PIZZA_API} from "../../constants.js";
import {clearCart} from "../../redux/slices/cartSlice.jsx";

const NewOrder = () => {
    const name = useContext(UserContext)[0]
    const {totalPrice, items} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [postError, setPostError] = useState(false);


    const {
        register,
        handleSubmit,
        control,
        watch
    } = useForm({
        defaultValues: {
            name: name,
            phone: '',
            address: '',
            withPriority: false,
        },
        resolver: yupResolver(validationSchema),
        mode: 'onBlur'
    });

    const withPriority = watch('withPriority');
    const totalOrderPrice = withPriority ? totalPrice + 8 : totalPrice;

    const onSubmit = async (data) => {

        try{
            const response = await fetch(`${PIZZA_API}/order`, {
                method: "POST",
                body: JSON.stringify(
                    {
                        customer: data.name,
                        phone: data.phone,
                        address: data.address,
                        cart: items,
                        position: "",
                        priority: data.withPriority,
                    }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const res = await response.json();
            if  (res.status === 'success') {
                // Clear cart after successful order placement
                dispatch(clearCart());
                navigate(`/order/${res.data.id}`)
            } else {
                setPostError(true);
            }
        } catch (error) {
            setPostError(true);
        }


    }

    return (
        <div className={'new_order__container'}>
            <h2 className={'new_order__title'}>{"Ready to order? Let's go!"}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name='name'
                    control={control}
                    render={
                        (
                            {
                                field: {value, onChange, onBlur, name},
                                fieldState: {error}
                            }
                        ) => <TextInput {...{value, onChange, onBlur, name, error}}
                                        label={"First Name"}/>
                    }/>

                <Controller
                    name='phone'
                    control={control}
                    render={
                        (
                            {
                                field: {value, onChange, onBlur, name},
                                fieldState: {error}
                            }
                        ) => <TextInput {...{value, onChange, onBlur, name, error}}
                                        label={"Phone number"}/>
                    }/>

                <Controller
                    name='address'
                    control={control}
                    render={
                        (
                            {
                                field: {value, onChange, onBlur, name},
                                fieldState: {error}
                            }
                        ) => <TextInput {...{value, onChange, onBlur, name, error}}
                                        label={"Address"}/>
                    }/>

                <Controller
                    name='withPriority'
                    control={control}
                    render={
                        (
                            {
                                field: {value, onChange, onBlur, name},
                            }
                        ) => <CheckboxInput {...{value, onChange, onBlur, name}}
                                            label={"Do you want to give your order priority?"}/>
                    }/>

                <input type="hidden" {...register('totalPrice')} value={totalOrderPrice}/>

                <ProductButton type="submit" text={`ORDER NOW FOR €${totalOrderPrice.toFixed(2)}`}/>
                {postError && <p className={'error-message'}>Something went wrong. Please try again later.</p>}
            </form>
        </div>
    );
};

export default NewOrder;