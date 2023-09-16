import GridComponent from "@utils/grid";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";

const AdminPage = () => {
  const boxInputs = useSelector((state: RootState) => state.boxData);

  // const firstBoxInput1 = boxInputs[0].input1;
  // const firstBoxInput2 = boxInputs[0].input2;
  // const secondBoxInput1 = boxInputs[1].input1;
  return (
    <div>
      <main className="my-10 text-white">
        <div className="flex mx-10 ">
          <div className="w-full">
            <div className="flex items-start justify-center h-[140vh]">
              <div className="w-[28%] h-2/3 bg-black border-gray-200 border-[6px] rounded-3xl relative">
                <div className="absolute inset-0 flex justify-center items-center z-10">
                  <div className="w-[90%] h-[100%] bg-black rounded-2xl relative">
                    <div className="flex justify-center">
                      <div className="w-24 h-24 bg-gray-200 rounded-full mt-14"></div>
                    </div>
                    <div className="text-center text-xl mt-2">
                      <p>name</p>
                      {/* <p> {firstBoxInput1}</p>
                      <p> {firstBoxInput2}</p>
                      <p>{secondBoxInput1}</p> */}
                    </div>
                    <GridComponent />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
