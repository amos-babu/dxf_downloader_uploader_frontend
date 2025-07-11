import { createContext, ReactNode, useContext } from "react";
import useFetchAllFiles from "../hooks/useFetchAllFiles";
import useFetchSimilarFiles from "../hooks/useFetchSimilarFiles";

type FileContextProviderProps = {
  children: ReactNode;
};

type FileContextTypeProps = {
  files: FileProps[];
  similarFiles: FileProps[];
  fetchSimilarFiles: (id: string) => void;
  fetchFiles: () => void;
  hasMore: boolean;
  hasMoreSimilar: boolean;
};

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

const FileContext = createContext<FileContextTypeProps | undefined>(undefined);

export const FileContextProvider = ({
  children,
}: FileContextProviderProps): JSX.Element => {
  const { files, hasMore, fetchFiles } = useFetchAllFiles();
  const { similarFiles, hasMoreSimilar, fetchSimilarFiles } =
    useFetchSimilarFiles();

  return (
    <FileContext.Provider
      value={{
        files,
        fetchFiles,
        similarFiles,
        fetchSimilarFiles,
        hasMore,
        hasMoreSimilar,
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
