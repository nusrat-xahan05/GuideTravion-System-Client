import { FieldDescription } from "@/components/ui/field";
import { getInputFieldError } from "@/lib/getInputFieldError";
import { IInputErrorState } from "@/types/inputError.interface";

interface InputFieldErrorProps {
    field: string;
    state: IInputErrorState | null;
}

const InputFieldError = ({ field, state }: InputFieldErrorProps) => {
    if (!state || !state.errors) return null;
    
    if (getInputFieldError(field, state)) {
        return (
            <FieldDescription className="text-red-600">
                {getInputFieldError(field, state)}
            </FieldDescription>
        );
    }
    return null;
};

export default InputFieldError;