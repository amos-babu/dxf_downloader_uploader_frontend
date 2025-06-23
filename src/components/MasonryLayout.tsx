import { Card } from "react-bootstrap";
import Masonry from "react-masonry-css"
import { useFile } from "../utils/FileContext";

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
        breakpointCols={4}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid">
          {files.map((file: File) => (
            <div key={file.id} className="md-4">
              <div className="card">
                <Card.Img
                  variant="top"
                  className="img-fluid img-thumbnail mx-auto d-block"
                  src={file.picture_path}
                />
              </div>
            </div>
          ))}
      </Masonry>
  )
}

export default MasonryLayout