import { ProfileCard } from "../components/ProfileCard";

export const Profile = () => {
  return (
    <section className="h-100 gradient-custom-2">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center">
          <div className="col  col-xl-8">
            <ProfileCard />
          </div>
        </div>
      </div>
    </section>
  );
};
