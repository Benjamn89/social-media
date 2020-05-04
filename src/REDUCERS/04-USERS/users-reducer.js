const initialState = {
  allowR: false,
  currentView: "",
  updatedLike: false,
  watched: false,
};

const reducer = (state = initialState, action) => {
  if (action.type === "renderUserData") {
    return {
      ...state,
      loginUser: action.val.loginUser,
      profileUser: action.val.profileUser,
      currentView: action.view,
      allowR: !state.allowR,
      watched: false,
    };
  }
  if (action.type === "renderPostsFromUsers") {
    return {
      ...state,
      Posts: action.val,
      currentView: action.section,
      allowR: !state.allowR,
      watched: true,
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
      ...state.allowR,
      currentView: "",
      Posts: null,
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
  if (action.type === "updateFriendsUserRender") {
    return {
      ...state,
      allowR: !state.allowR,
      loginUser: action.val,
    };
  }
  return state;
};

export default reducer;
