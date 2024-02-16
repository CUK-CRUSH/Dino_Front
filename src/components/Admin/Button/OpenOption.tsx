import { OpenOptionDTO } from "types/Admin"
import setting from "@assets/Header/setting.svg";
import { Img } from "react-image";

const OpenOption = ({calculateOptionsModalPosition} : OpenOptionDTO) => {
    return(
        <div className={"w-[22px] h-[40px] right-[20px] top-[20px] absolute"}>
            <button
              className=" text-white text-3xl font-bold tracking-wider "
              onClick={(e) => calculateOptionsModalPosition(e)}
            >
              <Img src={setting} alt='setting' />
            </button>
          </div>
    )
}

export default OpenOption