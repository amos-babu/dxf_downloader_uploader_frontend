import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";

type FileContextProviderProps = {
  children: ReactNode;
};

type FileContextTypeProps = {
  files: File[];
  similarFiles: File[];
  fetchSimilarFiles: (id: string) => void;
  fetchFiles: () => void;
  hasMore: boolean;
};

type UserProps = {
  id: number;
  username: string;
  profile_pic_path: string;
};

type File = {
  id: number;
  title: string;
  picture_path: string;
  user: UserProps;
};

const FileContext = createContext<FileContextTypeProps | undefined>(undefined);

export const FileContextProvider = ({
  children,
}: FileContextProviderProps): JSX.Element => {
  const [files, setFiles] = useState<File[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [similarFiles, setSimilarFiles] = useState<File[]>([]);
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

  return (
    <FileContext.Provider
      value={{
        files,
        similarFiles,
        fetchSimilarFiles,
        fetchFiles,
        hasMore,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFile = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFile must be within an FileContextProvider");
  }
  return context;
};
