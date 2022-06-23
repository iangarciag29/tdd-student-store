import {useContext} from "react";
import {ErrorContext} from "../components/Context/ErrorProvider";

const useAppError = () => {
    const {errors, addError, removeError} = useContext(ErrorContext);
    return {errors, addError, removeError};
}

export default useAppError;