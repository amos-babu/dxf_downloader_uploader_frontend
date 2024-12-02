import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { IoPersonCircle } from "react-icons/io5";
import { Link } from "react-router-dom";

interface UserProps {
  id: number;
  username: string;
  profile_pic_path: string;
}

interface File {
  id: number;
  title: string;
  picture_path: string;
  dxf_path: string;
  description: string;
  user: UserProps;
}
export const Home = () => {
  const [files, setFiles] = useState<File[]>([]);

  const fetchFiles = async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/retrieve_files"
    );
    console.log(response.data.data);
    setFiles(response.data.data);
  };

  useEffect(() => {
    fetchFiles();
  }, []);
  return (
    <>
      <div className="row">
        {files ? (
          files.map((file: File) => (
            <div key={file.id} className="col-md-3 mb-4">
              <Link
                to={`/show/${file.id}`}
                className="card shadow align-items-start text-decoration-none"
              >
                <Card.Img variant="top" src={file.picture_path} />
                <Card.Body>
                  <Card.Title>{file.title}</Card.Title>
                  <Link
                    to={`/profile/${file?.user.id}`}
                    className="text-decoration-none"
                  >
                    <div className="d-flex mt-3">
                      {file?.user.profile_pic_path ? (
                        <img
                          src={file?.user.profile_pic_path}
                          className="rounded-circle"
                          style={{ width: "40px", cursor: "pointer" }}
                          alt="Avatar"
                        />
                      ) : (
                        <IoPersonCircle
                          className="rounded-circle"
                          style={{ cursor: "pointer" }}
                          size={40}
                        />
                      )}
                      <div className="mt-1 mx-3 fw-bolder font-monospace text-muted fs-6">
                        {file.user.username}
                      </div>
                    </div>
                  </Link>
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
    </>
  );
};
