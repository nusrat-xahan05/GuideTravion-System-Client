/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { countries } from "@/constants/countries";

export default function PhoneInput({ value, onChange }: any) {
    const [countryCode, setCountryCode] = useState("+880");
    const [localNumber, setLocalNumber] = useState("");

    // Update full phone every time country code or number changes
    useEffect(() => {
        onChange(countryCode + localNumber);
    }, [countryCode, localNumber]);

    // When country changes → update phone field instantly
    const handleCountryChange = (e: any) => {
        const newCode = e.target.value;
        setCountryCode(newCode);
    };

    // User typing phone number
    const handleNumberChange = (e: any) => {
        // Only allow digits
        const clean = e.target.value.replace(/\D/g, "");
        setLocalNumber(clean);
    };

    return (
        <div className="flex items-center gap-2">
            {/* Country Selector */}
            <select
                className="border rounded p-2"
                value={countryCode}
                onChange={handleCountryChange}
            >
                {countries.map((c: any) => (
                    <option key={c.code} value={c.dial_code}>
                        {c.name} ({c.dial_code})
                    </option>
                ))}
            </select>

            {/* Phone Number Field */}
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
