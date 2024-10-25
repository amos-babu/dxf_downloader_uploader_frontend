import { FaSearch } from "react-icons/fa";

const SearchFile = () => {
  return (
    <div className="input-group rounded">
      <input
        type="search"
        className="form-control rounded"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="search-addon"
      />
      <span className="input-group-text border-0" id="search-addon">
        <FaSearch />
      </span>
    </div>
  );
};

export default SearchFile;
