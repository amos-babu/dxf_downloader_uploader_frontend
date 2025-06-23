import { Card } from "react-bootstrap";
import Masonry from "react-masonry-css"
import { useFile } from "../utils/FileContext";
import { Link } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";

type UserProps = {
  id: number;
  username: string;
  profile_pic_path: string;
};

type File = {
  id: number;
  title: string;
  picture_path: string;
  dxf_path: string;
  description: string;
  user: UserProps;
};

const MasonryLayout = () => {
  const { files } = useFile()
  return (
      <Masonry
        breakpointCols={3}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
          {files ?
          (
            files.map((file: File) => (
            <div key={file.id} className="md-4">
              <div className="card shadow align-items-start">
                <Link to={`/show/${file.id}`} className="text-decoration-none">
                  <Card.Img
                    variant="top"
                    className="img-fluid img-thumbnail mx-auto d-block"
                    src={file.picture_path}
                  />
                  <h3 className="mx-2 mt-2 rounded text-dark">
                    <Card.Title>{file.title}</Card.Title>
                  </h3>
                </Link>
                <div className="mx-2 mb-2 rounded text-dark">
                  <Link
                    to={`/profile/${file?.user.id}`}
                    className="text-decoration-none d-flex"
                  >
                    {file?.user.profile_pic_path ? (
                      <img
                        src={file?.user.profile_pic_path}
                        className="rounded-circle"
                        style={{ width: "40px", cursor: "pointer" }}
                        alt="Avatar"
                      />
                    ) : (
                      <IoPersonCircle
                        className="rounded-circle text-dark"
                        style={{ cursor: "pointer" }}
                        size={40}
                      />
                    )}
                    <div className="mt-1 mx-3 fw-bolder font-monospace text-muted fs-6">
                      {file.user.username}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ):(
          <div className="d-flex z-1 justify-content-center">
            <div className="spinner-border" role="status"></div>
          </div>
        )}
      </Masonry>
  )
}

export default MasonryLayout