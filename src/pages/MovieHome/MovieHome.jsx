import Hero from "../../Components/Hero/Hero";
import MovieApiData from "../../Components/MovieApiData/MovieApiData";
import FilterSettings from "../../Components/FilterSettings/FilterSettings";
import { useState } from "react";

export default function MovieHome() {
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <>
      <Hero />
      <MovieApiData setOpenFilter={setOpenFilter} />
      {openFilter && <FilterSettings />}
    </>
  );
}
