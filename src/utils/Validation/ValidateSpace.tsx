export const ValidateSpace = (text: string): boolean => {
    if (text.trim() === '') {
      console.log('Spaces cannot be entered.');
      return true; 
    } 
    else if (text.includes(' ')){
      console.log('Spaces cannot be entered.');
      return true;
    }
    
    else {
      return false; 
    }
  };