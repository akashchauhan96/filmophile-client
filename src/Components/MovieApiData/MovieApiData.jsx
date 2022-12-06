import axios from "axios";

export default function MovieApiData() {
  const getMovies = async () => {
    try {
      const resp = await axios.get("");
    } catch (err) {
      console.log(err);
    }
  };
  return <div>HELLOW</div>;
}
