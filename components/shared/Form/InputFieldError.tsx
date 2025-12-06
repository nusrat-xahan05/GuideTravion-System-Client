import { FieldDescription } from "@/components/ui/field";
import { getInputFieldError } from "@/lib/getInputFieldError";
import { IInputErrorState } from "@/types/inputError.interface";

interface InputFieldErrorProps {
    field: string;
    state: IInputErrorState;
}

const InputFieldError = ({ field, state }: InputFieldErrorProps) => {
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