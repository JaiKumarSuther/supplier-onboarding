import React, { useState } from "react";
import { countryList } from "../utils/countries"; // adjust path accordingly

interface PhoneInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  value,
  onChange,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(countryList[80]);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="form-group relative">
      <label className="text-[#283456] text-[17px] font-semibold mt-[17px]">
        {label}
      </label>

      <div className="relative w-full">
        {/* Country selector */}
        <div
          className="absolute left-[13px] top-[26px] -translate-y-1/2 flex items-center bg-gray-100 rounded px-2 py-1 gap-1 cursor-pointer z-10"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <img
            src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
            alt={selectedCountry.code}
            className="w-5 h-3 object-cover rounded-sm"
          />
          <span className="text-sm text-gray-600">{selectedCountry.dialCode}</span>
          <svg
            className="w-3 h-3 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute left-[13px] top-[56px] bg-white border rounded shadow z-20 w-[240px] max-h-[200px] overflow-y-auto">
            {countryList.map((country) => (
              <div
                key={country.code}
                className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedCountry(country);
                  setShowDropdown(false);
                }}
              >
                <img
                  src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                  alt={country.code}
                  className="w-5 h-3 object-cover rounded-sm"
                />
                <span className="text-sm">{country.dialCode}</span>
                <span className="text-xs text-gray-500">({country.name})</span>
              </div>
            ))}
          </div>
        )}

        {/* Phone input */}
        <input
          type="tel"
          className="w-full border focus:border-[#5461FD] border-[#e2e2e2] rounded-[5px] px-[15px] py-[10px] pl-[100px] mt-[3px] mb-[17px] text-[17px] font-medium text-[#283456] font-[URW Geometric] focus:outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PhoneInput;
