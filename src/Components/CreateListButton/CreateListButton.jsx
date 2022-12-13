import "./CreateListButton.scss";
import { Link } from "react-router-dom";

export default function CreateListButton() {
  return (
    <Link to="/movie-lists/add" className="create-list">
      Create a New List
    </Link>
  );
}
