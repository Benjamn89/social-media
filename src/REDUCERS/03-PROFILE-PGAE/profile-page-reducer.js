const initialState = {
  currentSection: "Info",
  userPosts: [],
};

const reducer = (state = initialState, action) => {
  if (action.type === "changeMode") {
    return {
      ...state,
      userPosts: action.val.initialArr,
      currentSection: action.val.sectionName,
    };
  }
  if (action.type === "changeModeLess") {
    return {
      ...state,
      currentSection: action.val,
    };
  }
  return state;
};

export default reducer;
