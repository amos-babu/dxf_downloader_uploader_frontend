import { useState, useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

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
        <Card className="position-absolute w-100 shadow-lg mt-1 overflow-auto">
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted mx-2">
              Search results:
            </Card.Subtitle>
            <div className="row justify-content-start">
              <div className="col-md-12 d-flex">
                <div className="card mb-3 shadow mx-2">
                  <div className="row g-0">
                    <div className="col-md-3">
                      <img
                        src="http://127.0.0.1:8000/storage/image_files/P5FYuBufzrIqEIDW1BkOOPptR4H8KmM2KIsLQ2w9.jpg"
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-9">
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text"></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card mb-3 shadow mx-2">
                  <div className="row g-0">
                    <div className="col-md-5">
                      <img
                        src="	http://127.0.0.1:8000/storage/image_files/zSgM8McIyCfjgbmyIo7RJ617ofAMD0J3Xb0nEPxa.jpg"
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-7">
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text"></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card mb-3 shadow mx-2">
                  <div className="row g-0">
                    <div className="col-md-5">
                      <img
                        src="	http://127.0.0.1:8000/storage/image_files/zSgM8McIyCfjgbmyIo7RJ617ofAMD0J3Xb0nEPxa.jpg"
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-7">
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
