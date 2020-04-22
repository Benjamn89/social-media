const initialState = {
  posts: [],
  changePost: false,
  addLike: false,
  email: null,
  commentsModal: false,
  commentsRef: null,
};

const reducer = (state = initialState, action) => {
  if (action.type === "setCommentRef") {
    return {
      ...state,
      commentsRef: action.val,
    };
  }
  if (action.type === "renderPosts") {
    return {
      ...state,
      changePost: !state.changePost,
      posts: action.val,
      email: action.email,
    };
  }
  if (action.type === "updatePost") {
    return {
      ...state,
      posts: action.val,
      changePost: !state.changePost,
    };
  }
  if (action.type === "addLike") {
    return {
      ...state,
      posts: action.val,
      addLike: !state.addLike,
    };
  }
  if (action.type === "displayBtn") {
    return {
      ...state,
      commentsModal: !state.commentsModal,
    };
  }
  return state;
};

export default reducer;