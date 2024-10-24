import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

interface File {
  id: number;
  title: string;
  picture_path: string;
  dxf_path: string;
  description: string;
}
export const Home = () => {
  const [files, setFiles] = useState<File[]>([]);

  const fetchFiles = async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/retrieve_files"
    );
    setFiles(response.data.file);
  };

  useEffect(() => {
    fetchFiles();
  }, []);
  return (
    <div className="row">
      {files ? (
        files.map((file: File) => (
          <div key={file.id} className="col-md-3 mb-4">
            <Link
              to={`/show/${file.id}`}
              className="card align-items-start text-decoration-none"
            >
              <Card.Img variant="top" src={file.picture_path} />
              <Card.Body>
                <Card.Title>{file.title}</Card.Title>
              </Card.Body>
            </Link>
          </div>
        ))
      ) : (
        <div className="d-flex z-1 justify-content-center">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
    </div>
  );
};
