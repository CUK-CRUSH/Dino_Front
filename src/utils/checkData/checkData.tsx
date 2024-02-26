import { checkDataItem } from "types/SetProfile/setProfile";

export const checkData = (array: checkDataItem[], step: number): boolean => {
  // Check if the array and the specified index exist
  if (array && array.length >= step && array[step - 1]) {
    // Check if the 'value' property is undefined or an empty string
    if (array[step - 1].value === (undefined || null) || array[step - 1].value?.length === 0) {
      return false;
    } else {
      return true;
    }
  } else {
    // Handle the case where the array or the specified index doesn't exist
    return false;
  }
};