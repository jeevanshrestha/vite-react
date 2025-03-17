import React, { useMemo, useState } from "react";
import data from "../../data/data.json"; // Import your JSON data
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const SearchableDropdown = () => {
  const [selectedValue, setSelectedValue] = useState(""); // Store selected value
  const [searchText, setSearchText] = useState(""); // Store input text
  const [dropdownOpen, setDropdownOpen] = useState(false); // Control dropdown visibility

  const options = useMemo(() => {
    return data.map((item) => ({
      name: item.name, // Display name
      value: item.id, // Unique value
    }));
  }, [data]);

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, options]);

  const handleSelect = (value) => {
    setSelectedValue(value);
    const selectedOption = options.find((option) => option.value === value);
    setSearchText(selectedOption ? selectedOption.name : ""); // Update input text
    setDropdownOpen(false);
  };

  return (
    <div className="w-1/3 mx-auto relative mb-3">
      <input type="hidden" name="selectedOption" value={selectedValue} />

      <div className="relative">
        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setDropdownOpen(true);
          }}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => {
            if (!selectedValue) setSearchText(""); // Reset to empty if no selection
          }}
          placeholder="Select an option"
          className="w-full px-3 py-2 pr-10 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <FontAwesomeIcon
          icon={faChevronDown}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
        />
      </div>

      {dropdownOpen && filteredOptions.length > 0 && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md max-h-48 overflow-y-auto z-10">
          {filteredOptions.map((option) => (
            <li key={option.value}>
              <button
                onClick={() => handleSelect(option.value)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                {option.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;
