import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type FileContextProviderProps = {
    children: ReactNode
}

type FileContextTypeProps = {
    files: File[]
}

type UserProps = {
  id: number;
  username: string;
  profile_pic_path: string;
};

type File = {
  id: number;
  title: string;
  picture_path: string;
  dxf_path: string;
  description: string;
  user: UserProps;
};

const FileContext = createContext<FileContextTypeProps | undefined>(undefined)

export const FileContextProvider = ({children}: FileContextProviderProps): JSX.Element => {
    const [files, setFiles] = useState<File[]>([]);
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchFiles = async () => {
    const response = await axios.get(`${apiUrl}retrieve_files`);
    console.log(response.data.data)
    setFiles(response.data.data);
    };

    useEffect(() => {
    fetchFiles();
    }, []);
return (
    <FileContext.Provider value={{files}}>{children}</FileContext.Provider>
)
}

export const useFile = () => {
    const context = useContext(FileContext)
    if(!context){
        throw new Error("useFile must be within an FileContextProvider"); 
    }
    return context
}