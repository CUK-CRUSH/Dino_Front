import { useSelector } from "react-redux"; 
import { RootState } from "@store/index";

const AdminBackground = () => {
    
    const selectedImage = useSelector((state: RootState) => state.image.selectedImage);

    return(
        
        <div
          className="h-1/4 bg-white"
        >
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected"
              className="h-full w-full flex justify-center items-center"
            />
          ) : (
            <>
            </>
          )}
        </div>
    )
}

export default AdminBackground