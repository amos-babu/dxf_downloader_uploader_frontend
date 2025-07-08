import { useEffect } from "react";
import MasonryLayout from "../components/MasonryLayout";
import { useFile } from "../utils/FileContext";
import { useInView } from "react-intersection-observer";

export const Home = () => {
  const { files, fetchFiles, hasMore } = useFile();
  const { ref, inView } = useInView();

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    if (inView) {
      fetchFiles();
    }
  }, [inView]);

  return (
    <>
      <div className="row">
        <MasonryLayout files={files} />
        {hasMore && (
          <div ref={ref} className="text-center mt-4">
            <span className="spinner-border"></span>
          </div>
        )}
      </div>
    </>
  );
};
