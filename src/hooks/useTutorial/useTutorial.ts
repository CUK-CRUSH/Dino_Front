import { useRecoilState } from "recoil";
import { TutorialStep, tutorialStepState } from "@atoms/Tutorial/TutorialStep";

export function useTutorial() {
  const [tutorialStep, setTutorialStep] =
    useRecoilState<TutorialStep>(tutorialStepState);

  const toggleTutorialMode = () => {
    const stepOrder: TutorialStep[] = [
      "header",
      "playlist",
      "env",
      "list1",
      "list2",
      "add1",
      "add2",
      "end",
      null,
    ];
    const currentStepIndex = stepOrder.indexOf(tutorialStep);
    const nextStep = stepOrder[(currentStepIndex + 1) % stepOrder.length];
    setTutorialStep(nextStep);
  };

  return { tutorialStep, toggleTutorialMode, setTutorialStep };
}
