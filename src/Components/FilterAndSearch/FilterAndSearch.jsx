import "./FilterAndSearch.scss";
import addIcon from "../../assets/icons/add-icon.svg";
import searchIcon from "../../assets/icons/search-icon.svg";
import { useState } from "react";

export default function FilterAndSearch({ setOpenFilter }) {
  const [value, setValue] = useState("");

  const handleOnChange = (event) => {
    setValue(event.target.value);
  };

  const handleOnClick = (e) => {
    setOpenFilter(true);
  };

  return (
    <div className="filter">
      <button className="filter__button" onClick={handleOnClick}>
        <img
          src={addIcon}
          alt="Add or Plus Icon"
          className="filter__add-icon"
        />
        <span className="filter__add-text">Add Filter</span>
      </button>
      <div className="filter__search-box">
        <img
          className="filter__search-icon"
          src={searchIcon}
          alt="Magnifying glass icon representing search feature"
        />
        <input
          className="filter__search-input"
          type="text"
          value={value}
          onChange={handleOnChange}
          placeholder="Search..."
        />
      </div>
    </div>
  );
}
