import { Card } from "react-bootstrap";
import Masonry from "react-masonry-css";
import { Link } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import useWindowWidth from "../hooks/useWidthHook";

type UserProps = {
  id: number;
  username: string;
  profile_pic_path: string;
};

type File = {
  id: number;
  title: string;
  picture_path: string;
  user: UserProps;
};

type MasonryLayoutProps = {
  files: File[];
};

const MasonryLayout = ({ files }: MasonryLayoutProps) => {
  const [breakpointColNums, setBreakpointColNums] = useState(3);
  const containerRef = useRef(null);

  const width = useWindowWidth();

  //Removing Duplicate keys before mapping
  const uniqueFiles = files.filter(
    (file, index, self) => index === self.findIndex((f) => f.id === file.id)
  );

  useEffect(() => {
    if (width < 640) {
      setBreakpointColNums(1);
    } else if (width < 768) {
      setBreakpointColNums(2);
    } else if (width < 1024) {
      setBreakpointColNums(3);
    } else {
      setBreakpointColNums(4);
    }
  }, [width]);

  return (
    <Masonry
      breakpointCols={breakpointColNums}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {uniqueFiles &&
        uniqueFiles.length > 0 &&
        uniqueFiles.map((file: File) => (
          <div ref={containerRef} key={file.id} className="md-4">
            <div className="card shadow align-items-start border-0">
              <Link to={`/show/${file.id}`} className="text-decoration-none">
                <Card.Img
                  variant="top"
                  className="img-fluid rounded mx-auto d-block"
                  src={file.picture_path}
                />
                <h3 className="mx-2 mt-2 rounded text-dark">
                  <Card.Title className="text-wrap">{file.title}</Card.Title>
                </h3>
              </Link>
              <div className="mx-2 mb-2 rounded text-dark">
                {file.user ? (
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
                    <div className="mt-1 mx-3 fw-bolder font-monospace text-wrap fs-6">
                      {file.user.username}
                    </div>
                  </Link>
                ) : (
                  <div className="text-muted mx-2">Unknown user</div>
                )}
              </div>
            </div>
          </div>
        ))}
    </Masonry>
  );
};

export default MasonryLayout;
