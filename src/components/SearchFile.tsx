import { useState } from "react";
import { Card } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const SearchFile = () => {
  const [displaSearchBar, setDisplaySearchBar] = useState<boolean>(false);

  return (
    <div className="position-relative w-100">
      <div className="input-group rounded">
        <input
          onClick={() => setDisplaySearchBar(true)}
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
      {displaSearchBar && (
        <Card className="position-absolute shadow-lg mt-1">
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default SearchFile;
