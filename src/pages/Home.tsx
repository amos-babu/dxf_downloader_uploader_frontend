import { useEffect } from "react";
import MasonryLayout from "../components/MasonryLayout";
import { useFile } from "../utils/FileContext";
import { useInView } from "react-intersection-observer";
import { useFetchFiles, useFetchPaginatedFiles } from "../hooks/fetchFile";

export const Home = () => {
  // const { files, fetchFiles, hasMore } = useFile();
  const { ref, inView } = useInView();

  // useEffect(() => {
  //   fetchFiles();
  // }, []);

  // useEffect(() => {
  //   if (inView) {
  //     fetchFiles();
  //   }
  // }, [inView]);

  const { data: files2, fetchNextPage, hasNextPage } = useFetchPaginatedFiles();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  // console.log(status, error, isFetching, isFetchingNextPage);
  return (
    <>
      <div className="row">
        {files2?.pages.flatMap((page) => (
          <MasonryLayout files={page.data.files} />
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
