import React from "react";
import { InputEvent } from "../models";

interface Props {
  handleSearchFilter: (e: InputEvent) => void;
}

const SearchInput: React.FC<Props> = ({ handleSearchFilter }) => (
  <div className={`md:max-w-2xl mx-auto md:flex md:flex-row mb-8 md:flex-wrap`}>
    <input
      className="shadow shadow-inner appearance-none border rounded-full -ml-4 py-2 px-3 text-gray-700 focus:outline-none focus:border-teal-500 h-10 iphone:w-full bg-gray-100 focus:bg-white"
      id="search"
      data-cy="search-box"
      type="text"
      placeholder="Try this nifty search feature! ^_^"
      onChange={(e): void => handleSearchFilter(e)}
    />
  </div>
);

export default SearchInput;
