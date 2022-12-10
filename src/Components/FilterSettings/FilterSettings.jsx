import "./FilterSettings.scss";
import { useRef } from "react";

export default function FilterSettings() {
  const modalRef = useRef();

  return (
    <>
      <div className="filter__background"></div>
      <div className="filter__modal" ref={modalRef}></div>
    </>
  );
}
