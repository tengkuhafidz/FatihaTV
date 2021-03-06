import React, { useState } from "react";
import { InputEvent } from "../models";
import { FaAngleDown, FaCheck } from "react-icons/fa";

export const Languages = {
  all: "All",
  english: "English",
  malay: "Malay",
  tamil: "Tamil",
  mandarin: "Mandarin",
};

export type LanguageCode = keyof typeof Languages;

interface Props {
  showLanguageSelector?: boolean;
  selectedLanguage?: LanguageCode;
  handleSearchFilter: (e: InputEvent) => void;
  handleLanguageSelected?: (code: LanguageCode) => void;
}

const SearchInput: React.FC<Props> = ({
  handleSearchFilter,
  showLanguageSelector = false,
  selectedLanguage = "all",
  handleLanguageSelected,
}) => (
  <div
    className={`md:max-w-2xl mx-auto ${
      showLanguageSelector ? "pr-8" : ""
    } md:flex md:flex-row mb-8 md:flex-wrap`}
  >
    <input
      className="shadow appearance-none border rounded md:rounded-r-none flex-1 py-2 px-3 text-gray-700 focus:outline-none focus:border-teal-500 h-10 iphone:w-full"
      id="search"
      data-cy="search-box"
      type="text"
      placeholder="Try this shiny new search feature! ^_^"
      onChange={(e): void => handleSearchFilter(e)}
    />
    {showLanguageSelector ? (
      <LanguageSelector
        selectedLanguage={selectedLanguage}
        handleLanguageSelected={handleLanguageSelected}
        className="md:inline-block"
      />
    ) : null}
  </div>
);

interface LanguageSelectorProps
  extends Pick<Props, "selectedLanguage" | "handleLanguageSelected"> {
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage = "all",
  handleLanguageSelected,
  className = "",
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div className={`language-dropdown relative ${className}`}>
      <button
        className="flex bg-gray-300 text-gray-700 py-2 px-3 rounded md:rounded-l-none shadow appearance-none inline-flex items-center h-10 iphone:w-full"
        data-cy="language-selector"
        onClick={(): void => setMenuVisible(!menuVisible)}
      >
        <span className="mr-1 font-semibold">Language: </span>
        <span>{Languages[selectedLanguage]}</span>
        <span className="flex-grow">&nbsp;</span>
        <FaAngleDown size={16} className="ml-1" />
      </button>
      <ul
        className={`language-dropdown-menu absolute hidden text-gray-700 pt-1 w-full ${
          menuVisible ? "visible" : ""
        }`}
        style={{ zIndex: 1001 }}
      >
        {Object.keys(Languages).map(code => (
          <li key={code}>
            <button
              data-cy="language-selector-choice"
              className="flex justify-between bg-gray-100 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap w-full shadow"
              onClick={(): void => {
                setMenuVisible(false);
                handleLanguageSelected?.(code as LanguageCode);
              }}
            >
              {Languages[code as LanguageCode]}
              {selectedLanguage === code ? (
                <FaCheck size={14} className="mt-1" />
              ) : null}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchInput;
