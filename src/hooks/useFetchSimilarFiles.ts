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
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchSimilarFiles = async (id: string) => {
    if (id) {
      try {
        const response = await axios.get(`${apiUrl}similar_files/${id}`);
        setSimilarFiles(response.data.data);
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    }
  };

  return { similarFiles, fetchSimilarFiles };
};

export default useFetchSimilarFiles;
