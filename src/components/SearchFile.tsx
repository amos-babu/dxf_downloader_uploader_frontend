import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import debounce from "lodash.debounce";

type SearchFileProps = {
  description: string;
  dxf_path: string;
  id: number;
  picture_path: string;
  title: string;
  user_id: number;
};

const SearchFile = () => {
  const [results, setResults] = useState<SearchFileProps[]>([]);
  const [query, setQuery] = useState<string>("");
  const [displaySearchBar, setDisplaySearchBar] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleSearch = debounce(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    console.log(results);

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/search", {
        params: { query: searchQuery },
      });
      setResults(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching for the data!", error);
    }
  }, 300);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setDisplaySearchBar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  return (
    <div ref={containerRef} className="position-relative w-100">
      <div className="input-group rounded">
        <input
          onClick={() => setDisplaySearchBar(true)}
          onChange={handleInputChange}
          value={query}
          type="search"
          className="form-control rounded-pill bg-secondary-subtle search-div"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
        />
        <span className="input-group-text border-0" id="search-addon">
          <FaSearch />
        </span>
      </div>
      {displaySearchBar && (
        <Card className="position-absolute w-100 shadow-lg mt-1 overflow-auto">
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted mx-2">
              Search results:
            </Card.Subtitle>
            <div className="row justify-content-start">
              <div className="col-md-12 d-flex">
                <div
                  className="card mb-3 shadow mx-2"
                  style={{ width: "100%" }}
                >
                  <div className="row g-0">
                    <div className="col-md-6">
                      <img
                        src="https://media.istockphoto.com/id/825383494/photo/business-man-pushing-large-stone-up-to-hill-business-heavy-tasks-and-problems-concept.jpg?s=1024x1024&w=is&k=20&c=bA5Epw0vCEHPyOGHYzgcdg9gnhHHI4LsiJwHkPBbTRY="
                        className="img-fluid rounded"
                      />
                    </div>
                    <div className="col-md-9">
                      <div className="card-body">
                        <h5 className="card-title">Title 1</h5>
                        <p className="card-text">Description 1</p>
                      </div>
                    </div>
                  </div>
                </div>
                {results.length > 0 ? (
                  results.map((result) => (
                    <div
                      key={result.id}
                      className="card mb-3 shadow mx-2"
                      style={{ width: "100%" }}
                    >
                      <div className="row g-0">
                        <div className="col-md-3">
                          <img
                            src={result.picture_path}
                            className="img-fluid rounded-start"
                            alt={result.title || "File Image"}
                          />
                        </div>
                        <div className="col-md-9">
                          <div className="card-body">
                            <h5 className="card-title">{result.title}</h5>
                            <p className="card-text">{result.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted mx-3">No results found.</p>
                )}
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default SearchFile;
