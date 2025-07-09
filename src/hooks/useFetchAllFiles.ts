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

const useFetchAllFiles = () => {
  const [files, setFiles] = useState<FileProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${apiUrl}retrieve_files?page=${page}`);
      setFiles((prev) => [...prev, ...response.data.data]);
      setHasMore(
        response.data.meta.current_page < response.data.meta.last_page
      );
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  return { files, hasMore, fetchFiles };
};

export default useFetchAllFiles;
