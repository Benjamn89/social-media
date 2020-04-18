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
  return state;
};

export default reducer;
