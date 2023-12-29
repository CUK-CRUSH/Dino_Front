import { AdminBackgroundImageDTO } from "types/Admin"

const AdminBackground = ({adminBackgroundImage} : AdminBackgroundImageDTO) => {
    
    return(
        
        <div
          className="h-1/4 bg-white"
        >
          {adminBackgroundImage ? (
            <img
              src={adminBackgroundImage}
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