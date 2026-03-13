import {createContext, useCallback, useState} from "react";
import PropTypes from "prop-types";

const STORAGE_KEY = "pizza-day-user-name";

const getStoredName = () => {
    if (typeof window === "undefined") return "";
    return window.localStorage.getItem(STORAGE_KEY) || "";
};

export const UserContext = createContext(null);
UserContext.displayName = "UserContext";

const UserInfoContext = ({children}) => {

    const [name, setNameState] = useState(getStoredName);

    const setName = useCallback((value) => {
        setNameState((prev) => {
            const next = typeof value === "function" ? value(prev) : value;
            if (typeof window !== "undefined") {
                if (next && next.trim()) {
                    window.localStorage.setItem(STORAGE_KEY, next);
                } else {
                    window.localStorage.removeItem(STORAGE_KEY);
                }
            }
            return next;
        });
    }, []);

    return (
        <UserContext.Provider value={[name, setName]}>
            {children}
        </UserContext.Provider>

    )
}

UserInfoContext.propTypes = {
    children: PropTypes.node.isRequired
}

export default UserInfoContext