import {useContext} from "react";
import {ErrorContext} from "../context/ErrorProvider";

const useAppError = () => {
    const {errors, addError, removeError} = useContext(ErrorContext);
    return {errors, addError, removeError};
}

export default useAppError;