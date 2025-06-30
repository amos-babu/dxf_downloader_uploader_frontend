import MasonryLayout from "../components/MasonryLayout";
import { useFile } from "../utils/FileContext";

export const Home = () => {
  const { files } = useFile()
  
  return (
    <>
      <div className="row">
        <MasonryLayout files={files}/>
      </div>
    </>
  );
};
