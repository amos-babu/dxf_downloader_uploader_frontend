export default function CurrentUserFiles() {
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
      <div className="row g-2">
        <div className="col mb-2">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
            alt="image 1"
            className="w-100 rounded-3"
          />
        </div>
        <div className="col mb-2">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
            alt="image 1"
            className="w-100 rounded-3"
          />
        </div>
      </div>
      <div className="row g-2">
        <div className="col">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
            alt="image 1"
            className="w-100 rounded-3"
          />
        </div>
        <div className="col">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
            alt="image 1"
            className="w-100 rounded-3"
          />
        </div>
      </div>
    </>
  );
}
