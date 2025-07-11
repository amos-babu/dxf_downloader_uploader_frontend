import axios from "axios";
import { useState } from "react";

type FileProps = {
  id: number;
  title: string;
  picture_path: string;
  user: {
    id: number;
    username: string;
    profile_pic_path: string;
  };
};

const useFetchSimilarFiles = () => {
  const [similarFiles, setSimilarFiles] = useState<FileProps[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMoreSimilar, setHasMoreSimilar] = useState<boolean>(true);
  const apiUrl: string = import.meta.env.VITE_API_URL;

  const fetchSimilarFiles = async (id: string) => {
    if (id) {
      try {
        const response = await axios.get(
          `${apiUrl}similar_files/${id}?page=${page}`
        );
        console.log(response.data.data.files);
        setSimilarFiles((prev) => [...prev, ...response.data.data.files]);
        setHasMoreSimilar(
          response.data.meta.current_page < response.data.meta.last_page
        );
        setPage((prev) => prev + 1);
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    }
  };

  return { similarFiles, hasMoreSimilar, fetchSimilarFiles };
};

export default useFetchSimilarFiles;
