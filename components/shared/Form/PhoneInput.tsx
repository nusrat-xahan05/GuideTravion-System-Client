/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */


"use client";

import { useEffect, useState } from "react";
import { countries } from "@/constants/countries";

interface PhoneInputProps {
    value: string;
    onChange: (value: string) => void;
}

export default function PhoneInput({ value, onChange }: PhoneInputProps) {
    const [countryCode, setCountryCode] = useState("+880"); // default BD
    const [localNumber, setLocalNumber] = useState("");

    // Sync parent with full number
    useEffect(() => {
        onChange(countryCode + localNumber);
    }, [countryCode, localNumber]);

    // When user selects country → change ONLY countryCode
    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCode = e.target.value;
        setCountryCode(newCode);

        // If user previously typed code manually, remove duplicates
        const cleanLocal = localNumber.replace(/^0+/, "");
        setLocalNumber(cleanLocal);
    };

    // User typing local number
    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Allow only digits
        const digits = e.target.value.replace(/\D/g, "");

        // Limit digits to prevent long invalid numbers
        // Example: Bangladesh local numbers = 10 digits max
        if (digits.length <= 12) {
            setLocalNumber(digits);
        }
    };

    return (
        <div className="flex items-center gap-2 w-full">
            {/* Country selector */}
            <select
                className="border rounded p-2 min-w-[40]"
                value={countryCode}
                onChange={handleCountryChange}
            >
                {countries.map(c => (
                    <option key={c.code} value={c.dial_code}>
                        {c.name} ({c.dial_code})
                    </option>
                ))}
            </select>

            {/* Local number input */}
            <input
                type="tel"
                className="border rounded p-2 flex-1"
                value={localNumber}
                onChange={handleNumberChange}
                placeholder="Enter phone number"
            />
        </div>
    );
}
