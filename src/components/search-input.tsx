import React from "react";
import { InputEvent } from "../models";

interface Props {
  handleSearchFilter: (e: InputEvent) => void;
}

const SearchInput: React.FC<Props> = ({ handleSearchFilter }) => (
  <div className="md:max-w-2xl mx-auto">
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-teal-500 mb-8"
      id="search"
      data-cy="search-box"
      type="text"
      placeholder="Try this shiny new search feature! ^_^"
      onChange={(e): void => handleSearchFilter(e)}
    />
  </div>
);

export default SearchInput;
