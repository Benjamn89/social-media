const initialState = {
  currentSection: "Info",
  userPosts: [],
  updatedLikes: 0,
  wasFetched: false,
};

const reducer = (state = initialState, action) => {
  if (action.type === "resetState") {
    return initialState;
  }
  if (action.type === "changeMode") {
    return {
      ...state,
      userPosts: action.val.initialArr,
      currentSection: action.val.sectionName,
      wasFetched: true,
    };
  }
  if (action.type === "changeModeLess") {
    return {
      ...state,
      currentSection: action.val,
    };
  }
  if (action.type === "updateLike") {
    return {
      ...state,
      userPosts: action.val,
      updatedLikes: state.updatedLikes + 1,
    };
  }
  if (action.type === "deletePostFromProfile") {
    return {
      ...state,
      userPosts: action.val,
      updatedLikes: state.updatedLikes + 1,
    };
  }
  return state;
};

export default reducer;
