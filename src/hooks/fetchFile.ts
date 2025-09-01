import {
  QueryFunctionContext,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { DataProps, FileProps } from "./useFetchAllFiles";
import axios from "axios";

const fetchFiles = async (): Promise<FileProps[]> => {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  try {
    const response = await axios.get(`${apiUrl}retrieve_files`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching files");
  }
};

export const useFetchFiles = () => {
  return useQuery<FileProps[]>({
    queryKey: ["files"],
    queryFn: fetchFiles,
  });
};

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

const fetchPaginatedFiles = async ({
  pageParam = 1,
}: QueryFunctionContext): Promise<DataProps> => {
  const apiUrl: string = import.meta.env.VITE_API_URL;

  try {
    const response = await axios.get(
      `${apiUrl}retrieve_files?page=${pageParam}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching files");
  }
};

export const useFetchPaginatedFiles = () => {
  return useInfiniteQuery<DataProps>({
    queryKey: ["files"],
    queryFn: fetchPaginatedFiles,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.links.next) {
        return lastPage.data.current_page + 1;
      }

      return undefined;
    },
  });
};
