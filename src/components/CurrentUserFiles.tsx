import { useParams } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useEffect } from "react";

export default function CurrentUserFiles() {
  // const { profileData } = useAuth();

  const { id } = useParams<{ id: string }>();
  const { setId, userData } = useAuth();
  const userfilesData = userData?.files;

  console.log(userfilesData);

  useEffect(() => {
    if (id) {
      setId(id); // Update the context with the `id` or null if not available
    }
  }, [id, setId]);
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
        {userfilesData?.map((file) => (
          <div key={file.id} className="col-md-4 mb-2">
            <img
              src={file.picture_path}
              alt="image 1"
              className="w-100 rounded-3 mx-1"
            />
          </div>
        ))}
      </div>
    </>
  );
}
