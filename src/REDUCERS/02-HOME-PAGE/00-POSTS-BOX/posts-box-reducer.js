const initialState = {
  posts: [],
  changePost: false,
};

const reducer = (state = initialState, action) => {
  if (action.type === "renderPosts") {
    return {
      ...state,
      changePost: !state.changePost,
      posts: action.val,
    };
  }
  if (action.type === "updatePost") {
    return {
      ...state,
      posts: action.val,
      changePost: !state.changePost,
    };
  }
  return state;
};

export default reducer;
