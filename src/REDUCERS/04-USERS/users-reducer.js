const initialState = {
  allowR: false,
  currentView: "",
  Info: {},
  Posts: [],
  email: "",
};

const reducer = (state = initialState, action) => {
  if (action.type === "renderUserData") {
    return {
      ...state,
      Info: action.val,
      allowR: !state.allowR,
      currentView: action.view,
      email: action.email,
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
  return state;
};

export default reducer;
