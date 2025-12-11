// "use client";

// import { useEffect, useState } from "react";
// import { Check, ChevronDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { TTourType } from "@/types/tour.interface";

// interface Props {
//     value: string[];
//     onChange: (v: string[]) => void;
// }

// const TourTypeMultiSelect = ({ value, onChange }: Props) => {
//     const [selected, setSelected] = useState<string[]>(value || []);

//     const allTypes = Object.values(TTourType);

//     const toggle = (item: string) => {
//         const updated = selected.includes(item)
//             ? selected.filter((v) => v !== item)
//             : [...selected, item];

//         setSelected(updated);
//         onChange(updated); // send back to form
//     };

//     useEffect(() => {
//         setSelected(value || []);
//     }, [value]);

//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//                 <Button
//                     variant="outline"
//                     className="w-full justify-between"
//                 >
//                     {selected.length > 0
//                         ? `${selected.length} Selected`
//                         : "Select Tour Types"}
//                     <ChevronDown size={16} />
//                 </Button>
//             </DropdownMenuTrigger>

//             <DropdownMenuContent className="w-56">
//                 {allTypes.map((type) => (
//                     <DropdownMenuItem
//                         key={type}
//                         onClick={() => toggle(type)}
//                         className="flex items-center gap-2 cursor-pointer"
//                     >
//                         <div
//                             className={`h-4 w-4 border rounded-sm flex items-center justify-center ${selected.includes(type)
//                                     ? "bg-primary text-white"
//                                     : "bg-white"
//                                 }`}
//                         >
//                             {selected.includes(type) && <Check size={12} />}
//                         </div>
//                         <span>{type}</span>
//                     </DropdownMenuItem>
//                 ))}
//             </DropdownMenuContent>
//         </DropdownMenu>
//     );
// };

// export default TourTypeMultiSelect;



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
