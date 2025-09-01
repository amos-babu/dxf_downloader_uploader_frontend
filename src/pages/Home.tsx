import { useEffect } from "react";
import MasonryLayout from "../components/MasonryLayout";
import { useInView } from "react-intersection-observer";
import { useFetchPaginatedFiles } from "../hooks/fetchFile";

export const Home = () => {
  const { ref, inView } = useInView();

  const { data: files, fetchNextPage, hasNextPage } = useFetchPaginatedFiles();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  console.log(files);

  return (
    <>
      <div className="row">
        {files?.pages.flatMap((page, index) => (
          <MasonryLayout key={index} files={page.data.files} />
        ))}
        {hasNextPage && (
          <div ref={ref} className="text-center mt-4">
            <span className="spinner-border"></span>
          </div>
        )}
      </div>
    </>
  );
};
