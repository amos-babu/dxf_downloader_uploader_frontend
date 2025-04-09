import { IoPersonCircle } from "react-icons/io5";
import { useAuth } from "../utils/AuthContext";
import UpdateProfile from "./UpdateProfile";

export default function ProfileDetails() {
  const { userData, canEdit, handleShow } = useAuth();

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
          {userData?.profile_pic_path ? (
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              alt="Generic placeholder image"
              className="img-fluid img-thumbnail mt-4 mb-2"
              style={{ width: "150px", zIndex: "1" }}
            />
          ) : (
            <div className="">
              <IoPersonCircle
                className="img-fluid  mt-2 mb-2"
                style={{
                  cursor: "pointer",
                  width: "150px",
                  zIndex: "1",
                }}
              />
            </div>
          )}

          {canEdit && (
            <button
              type="button"
              onClick={handleShow}
              className="btn btn-outline-dark"
            >
              Edit profile
            </button>
          )}

          <UpdateProfile />
        </div>
        <div className="ms-3" style={{ marginTop: "110px" }}>
          <h5>{userData?.name}</h5>
          <h6>@{userData?.username}</h6>
        </div>
      </div>
      <div className="mb-5  text-body" style={{ marginTop: "130px" }}>
        <p className="lead fw-normal mx-3 mb-1">About</p>
        <div className="p-4 bg-body-tertiary">
          <p className="font-italic mb-1">{userData?.bio}</p>
        </div>
      </div>
    </>
  );
}
