import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

type UserFileProps = {
  id: number;
  profile_pic_path: string;
  username: string;
};

type FileProps = {
  created_at: string;
  description: string;
  dxf_path: string;
  id: number;
  picture_path: string;
  title: string;
  user: UserFileProps;
};

export const DxfPage = () => {
  const [file, setFile] = useState<FileProps | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);

  console.log(isDownloading);

  const fetchFile = async () => {
    if (id) {
      try {
        const response = await axios.get(
          `
          ${apiUrl}file_display/${id}`
        );
        setFile(response.data.data);
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    }
  };

  const handleDownloadImage = async (e: React.FormEvent) => {
    setIsDownloading(true);
    e.preventDefault();
    if (id) {
      try {
        const response = await axios.get(`${apiUrl}download_image/${id}`, {
          responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;

        link.setAttribute("download", "file.jpg");

        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading file:", error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const handleDownloadDxf = async (e: React.FormEvent) => {
    setIsDownloading(true);
    e.preventDefault();

    if (id) {
      try {
        const response = await axios.get(`${apiUrl}download_dxf/${id}`, {
          responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;

        link.setAttribute("download", "file.dxf");
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading file:", error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  useEffect(() => {
    fetchFile();
  }, [id]);
  return (
    <>
      <button
        onClick={() => navigate(-1)}
        type="button"
        style={{
          width: "41.2px",
          height: "41.2px",
          top: "100px",
          left: "10px",
        }}
        className="btn btn-dark rounded-circle z-1 top-20 position-fixed btn-floating"
        data-mdb-ripple-init
      >
        <IoMdArrowRoundBack className="mb-1" />
      </button>
      {file ? (
        <div className="card mb-3 shadow">
          <div className="row g-0">
            <div className="col-md-6 position-relative">
              <Image
                src={file.picture_path}
                className="img-fluid rounded-start img-thumbnail mx-auto d-block"
                alt="..."
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <div className="d-flex me-auto">
                  <h4 className="card-title">@{file.user.username}</h4>
                </div>
                <h5 className="card-title">{file.title}</h5>
                <p className="card-text">{file.description}</p>
                <div className="d-flex justify-content-between">
                  <Button variant="dark" onClick={handleDownloadImage}>
                    Download Image file
                  </Button>
                  <Button
                    variant="dark"
                    onClick={handleDownloadDxf}
                    className="mx-3"
                  >
                    Download DXF file
                  </Button>
                </div>
                <p className="card-text mt-3">
                  <small className="text-body-secondary">
                    {file.created_at}
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex z-1 justify-content-center">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
    </>
  );
};
