import {useContext, useState} from 'react';
import './Forms.css';
import {UserContext} from "../../context/UserInfoContext.jsx";

const MIN_NAME_LENGTH = 2;

const NameInputForm = () => {
    const [name, setName] = useContext(UserContext);
    const [inputValue, setInputValue] = useState(name || "");
    const [touched, setTouched] = useState(false);
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const trimmed = (inputValue || "").trim();
    const isEmpty = trimmed.length === 0;
    const tooShort = trimmed.length > 0 && trimmed.length < MIN_NAME_LENGTH;
    const isValid = trimmed.length >= MIN_NAME_LENGTH;
    const showError = (touched || submitAttempted) && !isValid;
    const errorMessage = isEmpty
        ? "Please enter your name."
        : tooShort
            ? `Name must be at least ${MIN_NAME_LENGTH} characters.`
            : null;

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleBlur = () => {
        setTouched(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitAttempted(true);
        if (!isValid) return;
        setName(trimmed);
        setShowSuccess(true);
    };

    if (showSuccess && name) {
        return (
            <div className="name-entry">
                <p className="name__input__success" role="status">
                    Thanks, {name}! Your name has been saved.
                </p>
            </div>
        );
    }

    return (
        <div className="name-entry">
            <form onSubmit={handleSubmit} className="name__input__form" noValidate>
                <input
                    type="text"
                    placeholder="Your full name"
                    value={inputValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={showError}
                    aria-describedby={showError ? "name-error" : undefined}
                />
                <input type="submit" value="Submit" />
                {showError && errorMessage && (
                    <p id="name-error" className="name__input__error" role="alert">
                        {errorMessage}
                    </p>
                )}
            </form>
        </div>
    );
};

export default NameInputForm;
