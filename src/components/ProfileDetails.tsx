import { IoPersonCircle } from "react-icons/io5";
import { useAuth } from "../utils/AuthContext";

export default function ProfileDetails() {
  const { profileData } = useAuth();
  return (
    <>
      <div
        className="rounded-top text-white d-flex flex-row"
        style={{ backgroundColor: "#000", height: "200px" }}
      >
        <div
          className="ms-4 mt-5 d-flex flex-column"
          style={{ width: "150px" }}
        >
          <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            alt="Generic placeholder image"
            className="img-fluid img-thumbnail mt-4 mb-2"
            style={{ width: "150px", zIndex: "1" }}
          />
          <IoPersonCircle
            className="img-fluid mt-4 mb-2"
            style={{
              cursor: "pointer",
              width: "150px",
              zIndex: "1",
              position: "absolute",
            }}
          />
          <button
            type="button"
            data-mdb-button-init
            data-mdb-ripple-init
            className="btn btn-outline-dark"
            data-mdb-ripple-color="dark"
            style={{ zIndex: "1" }}
          >
            Edit profile
          </button>
        </div>
        <div className="ms-3" style={{ marginTop: "130px" }}>
          <h5>{profileData?.name}</h5>
          <p>New York</p>
        </div>
      </div>
      <div className="mb-5  text-body" style={{ marginTop: "130px" }}>
        <p className="lead fw-normal mx-3 mb-1">About</p>
        <div className="p-4 bg-body-tertiary">
          <p className="font-italic mb-1">{profileData?.bio}</p>
        </div>
      </div>
    </>
  );
}
