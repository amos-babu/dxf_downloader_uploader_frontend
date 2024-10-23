import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";

interface FileProps {
  created_at: string;
  description: string;
  dxf_path: string;
  id: number;
  picture_path: string;
  title: string;
}
export const DxfPage = () => {
  const [file, setFile] = useState<FileProps | null>(null);
  const { id } = useParams();

  const fetchFile = async () => {
    if (id) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/file_display/${id}`
        );
        // console.log(response.data.file);
        setFile(response.data.file);
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    }
  };

  useEffect(() => {
    fetchFile();
  }, [id]);
  return (
    <>
      <div className="card mb-3 shadow">
        {file ? (
          <div className="row g-0">
            <div className="col-md-4">
              <Image
                src={file.picture_path}
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{file.title}</h5>
                <p className="card-text">{file.description}</p>
                <div className="d-flex justify-content-between">
                  <Button>Download Image file</Button>
                  <Button className="mx-3">Download DXF file</Button>
                </div>
                <p className="card-text mt-3">
                  <small className="text-body-secondary">
                    {file.created_at}
                  </small>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};
