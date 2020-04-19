const initialState = {
  posts: [],
};

const reducer = (state = initialState, action) => {
  if (action.type === "renderPosts") {
    return {
      ...state,
      posts: action.val,
    };
  }
  if (action.type === "updatePost") {
    console.log(action.val);
    return {
      ...state,
      ...state.posts,
      posts: action.val,
    };
  }
  return state;
};

export default reducer;
