import { useState, useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import "../App.css";

const SearchFile = () => {
  const [displaySearchBar, setDisplaySearchBar] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={containerRef} className="position-relative w-100">
      <div className="input-group rounded">
        <input
          onClick={() => setDisplaySearchBar(true)}
          type="search"
          className="form-control rounded-pill bg-secondary-subtle search-div"
          placeholder="  Search"
          aria-label="Search"
          aria-describedby="search-addon"
        />
        <span className="input-group-text border-0" id="search-addon">
          <FaSearch />
        </span>
      </div>
      {displaySearchBar && (
        <Card className="position-absolute w-100 shadow-lg mt-1">
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">
              Search results:
            </Card.Subtitle>
            <div className="row justify-content-start">
              <div className="col-md-6">
                <div className="card mb-3 shadow">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src="https://i.pinimg.com/236x/96/60/ec/9660ecb125c0aba21d8c308615b013c5.jpg"
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text"></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card mb-3 shadow">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src="https://i.pinimg.com/236x/96/60/ec/9660ecb125c0aba21d8c308615b013c5.jpg"
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default SearchFile;
