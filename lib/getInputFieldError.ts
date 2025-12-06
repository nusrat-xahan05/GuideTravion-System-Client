import { IInputErrorState } from "@/types/inputError.interface";


export const getInputFieldError = (fieldName: string, state: IInputErrorState) => {
    if (state && state.errors) {
        const error = state.errors.find((err) => err.field === fieldName);
        return error ? error.message : null;
    } else {
        return null;
    }
};
