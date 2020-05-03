const initialState = {
  allowR: false,
  currentView: "",
  Info: {},
  Posts: [],
  email: "",
  updatedLike: false,
};

const reducer = (state = initialState, action) => {
  if (action.type === "renderUserData") {
    return {
      ...state,
      Info: action.val,
      allowR: !state.allowR,
      currentView: action.view,
      email: action.email,
      Posts: [],
    };
  }
  if (action.type === "renderPostsFromUsers") {
    return {
      ...state,
      Posts: action.val,
      currentView: action.section,
      allowR: !state.allowR,
    };
  }
  if (action.type === "changeSecWithNoFetch") {
    return {
      ...state,
      currentView: action.val,
      allowR: !state.allowR,
    };
  }
  if (action.type === "resetStateUsers") {
    return {
      ...state,
      Info: {},
      Posts: [],
      currentView: "",
    };
  }
  if (action.type === "updateLikeUsers") {
    return {
      ...state,
      Posts: action.val,
      allowR: !state.allowR,
      updatedLike: !state.updatedLike,
    };
  }
  if (action.type === "deletePostFromUsers") {
    return {
      ...state,
      Posts: action.val,
      updatedLike: !state.updatedLike,
      allowR: !state.allowR,
    };
  }
  return state;
};

export default reducer;
