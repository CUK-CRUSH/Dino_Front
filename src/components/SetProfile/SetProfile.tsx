
import { useParams } from "react-router-dom";
import Progerss from "./Progress";
import Skip from "./Skip";

export const SetProfilePage = () => {
  // 프로필 설정 단계
  const { step } = useParams<{ step?: string}>();
  const parsedStep = parseInt(step || "1", 10);

  return (

    <div className="w-full h-full relative bg-white flex flex-col align-middle items-center">
      <Skip />
      <Progerss step={parsedStep} />

    </div>

  )
}