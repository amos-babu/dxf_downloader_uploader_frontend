import axios from "axios";
import { useState } from "react";

export type FileProps = {
  id: number;
  title: string;
  picture_path: string;
  user: {
    id: number;
    username: string;
    profile_pic_path: string;
  };
};

export type DataProps = {
  data: {
    per_page: number;
    current_page: number;
    total_files: number;
    last_page: number;
    files: FileProps[];
  };
  links: {
    next: string | null;
  };
};

const useFetchAllFiles = () => {
  const [files, setFiles] = useState<FileProps[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const apiUrl: string = import.meta.env.VITE_API_URL;

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${apiUrl}retrieve_files?page=${page}`);
      setFiles((prev) => [...prev, ...response.data.data.files]);
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
