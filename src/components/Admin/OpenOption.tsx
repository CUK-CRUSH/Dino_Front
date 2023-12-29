import { OpenOptionDTO } from "types/Admin"

const OpenOption = ({calculateOptionsModalPosition} : OpenOptionDTO) => {
    return(
        <div className={"w-[22px] right-[20px] top-[0px] absolute "}>
            <button
              className=" text-white text-3xl font-bold tracking-wider "
              onClick={(e) => calculateOptionsModalPosition(e)}
            >...
            </button>
          </div>
    )
}

export default OpenOption