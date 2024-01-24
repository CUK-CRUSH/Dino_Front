import React from 'react';
import { ProgressDTO } from "types/SetProfile/setProfile";
import fill_1 from "@assets/SetProfile/fill_1.svg";
import fill_2 from "@assets/SetProfile/fill_2.svg";
import fill_3 from "@assets/SetProfile/fill_3.svg";
import unfill_2 from "@assets/SetProfile/unfill_2.svg";
import unfill_3 from "@assets/SetProfile/unfill_3.svg";
import check from "@assets/SetProfile/check.svg";
import dot from "@assets/SetProfile/dot.svg";

const Progerss = ({ step }: ProgressDTO) => {

  return (
    <div className="absolute top-24 p-4 ">
      {step === 1 && (
        <div className={"flex"}>
          <img src={fill_1} alt={`x`} />
          <img className={"mx-2"} src={dot} alt={'x'} />
          <img src={unfill_2} alt='x' />
          <img className={"mx-2"} src={dot} alt={'x'} />

          <img src={unfill_3} alt='x' />
        </div>
      )}

      {step === 2 && (
        <div className={"flex"}>
          <img src={check} alt={`x`} />
          <img className={"mx-2"} src={dot} alt={'x'} />
          <img src={fill_2} alt='x' />
          <img className={"mx-2"} src={dot} alt={'x'} />

          <img src={unfill_3} alt='x' />
        </div>
      )}

      {step === 3 && (
        <div className={"flex"}>
          <img src={check} alt={`x`} />
          <img className={"mx-2"} src={dot} alt={'x'} />

          <img src={check} alt='x' />
          <img className={"mx-2"} src={dot} alt={'x'} />

          <img src={fill_3} alt='x' />
        </div>
      )}
    </div>
  );
};

export default Progerss;