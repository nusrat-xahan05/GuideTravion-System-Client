interface MultiSelectProps<T extends string> {
    label: string;
    name: string;
    options: T[];
    value: T[];                     // selected values
    onChange: (value: T[]) => void; // updates the parent formData
    error?: string;
}

export function MultiSelect<T extends string>({
    label,
    name,
    options,
    value,
    onChange,
    error,
}: MultiSelectProps<T>) {

    const toggleSelection = (option: T) => {
        if (value.includes(option)) {
            onChange(value.filter((item) => item !== option));
        } else {
            onChange([...value, option]);
        }
    };

    return (
        <div className="flex flex-col gap-1">
            <label className="font-medium">{label}</label>

            <div className="border rounded p-2 flex flex-wrap gap-2">
                {options.map((option) => (
                    <button
                        key={option}
                        type="button"
                        className={`px-2 py-1 rounded border ${value.includes(option)
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100"
                            }`}
                        onClick={() => toggleSelection(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}
