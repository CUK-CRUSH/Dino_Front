
import { useParams } from "react-router-dom";
import Progerss from "./Progress";

export const SetProfilePage = () => {
  const { step } = useParams<{ step?: string}>();
  const parsedStep = parseInt(step || "1", 10);

  return (

    <div className="w-full h-full relative bg-white flex flex-col align-middle items-center">
      <Progerss step={parsedStep} />

    </div>

  )
}