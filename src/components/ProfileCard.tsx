import CurrentUserFiles from "./CurrentUserFiles";
import ProfileDetails from "./ProfileDetails";

export const ProfileCard = () => {
  return (
    <div className="row">
      <div className="col">
        <div className="card shadow-sm">
          <div className="card-body p-4 text-black">
            <ProfileDetails />
            <CurrentUserFiles />
          </div>
        </div>
      </div>
    </div>
  );
};
