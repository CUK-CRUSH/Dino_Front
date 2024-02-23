import { AnyAction } from "@reduxjs/toolkit";

// actions
const UPDATE_LABELS = "labels/UPDATE_LABELS";

// action creators
export const updateLabels = (labels: { [key: string]: string }) => ({
  type: UPDATE_LABELS,
  payload: labels,
});

// initial state
const initialState = {
  title: "title",
  artist: "artist",
  URL: "URL",
};

// action type
interface LabelsAction extends AnyAction {
  payload?: { [key: string]: string };
}

// reducer
export default function labelsReducer(
  state = initialState,
  action: LabelsAction
) {
  switch (action.type) {
    case UPDATE_LABELS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
