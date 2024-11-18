import { useAuth } from "../utils/AuthContext";

export default function CurrentUserFiles() {
  const { profileData } = useAuth();
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4 text-body">
        <p className="lead fw-normal mb-0">Recent photos</p>
        <p className="mb-0">
          <a href="#!" className="text-muted">
            Show all
          </a>
        </p>
      </div>
      <div className="row">
        {profileData?.files.map((file) => (
          <div className="col-md-6 mb-2">
            <img
              src={file.picture_path}
              alt="image 1"
              className="w-100 rounded-3 mx-1"
            />
          </div>
        ))}

        <div className="col-md-6 mb-2">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
            alt="image 1"
            className="w-100 rounded-3 mx-1"
          />
        </div>
      </div>
    </>
  );
}
