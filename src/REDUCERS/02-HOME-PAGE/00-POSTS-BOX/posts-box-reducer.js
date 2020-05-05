const initialState = {
  posts: [],
  secondArr: [],
  changePost: false,
  addLike: false,
  email: null,
  commentsModal: false,
  commentsRef: null,
  ref: null,
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
      ref: action.ref,
      secondArr: action.secondArr,
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
  if (action.type === "deletePost") {
    return {
      ...state,
      posts: action.val,
      changePost: !state.changePost,
    };
  }
  if (action.type === "loadSecondArr") {
    return {
      ...state,
      changePost: !state.changePost,
      posts: action.val,
      secondArr: false,
    };
  }
  return state;
};

export default reducer;
