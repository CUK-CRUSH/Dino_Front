import { atom } from "recoil";

export type TutorialStep =
  | "header"
  | "playlist"
  | "env"
  | "list1"
  | "list2"
  | "add1"
  | "add2"
  | "end"
  | null;

export const tutorialStepState = atom<TutorialStep>({
  key: "tutorialStepState",
  default: null, // 초기 상태값
});
