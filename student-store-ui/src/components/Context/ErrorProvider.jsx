import {createContext, useCallback, useState} from "react";
import {v4 as uuidv4} from "uuid";

export const ErrorContext = createContext({
    errors: [], addError: () => {
    }, removeError: () => {
    }
});

export const ErrorProvider = ({children}) => {
    const [errors, setErrors] = useState([]);

    const removeError = id => setErrors(errors => errors.filter(error => error.id !== id));
    const addError = (code, status, message, fatal) => {
        const date = new Date(), id = uuidv4();
        setErrors(errors => [...errors, {id, code, status, message, fatal, date}]);
        setTimeout(() => removeError(id), 1000 * 30);
    };

    const contextValue = {
        errors,
        addError: useCallback((code, status, message, fatal = false) => addError(code, status, message, fatal), []),
        removeError: useCallback(id => removeError(id), [])
    };

    return <ErrorContext.Provider value={contextValue}>
        {children}
    </ErrorContext.Provider>
}