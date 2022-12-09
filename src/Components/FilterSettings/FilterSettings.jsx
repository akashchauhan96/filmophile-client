import "./FilterSettings.scss";
import { useRef } from "react";

export default function FilterSettings() {
  const modalRef = useRef();

  const handleOnClick = () => {
    setMouseOut(true);
  };
  return (
    <>
      <div className="filter__background"></div>
      <div
        className="filter__modal"
        onClick={handleOnClick}
        ref={modalRef}
      ></div>
    </>
  );
}
