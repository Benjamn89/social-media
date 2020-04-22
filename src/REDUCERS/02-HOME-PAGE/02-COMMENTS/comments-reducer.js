const initialState = {
  getPost: false,
  postIndex: null,
};

const reducer = (state = initialState, action) => {
  if (action.type === "getPost") {
    return {
      ...state,
      getPost: !state.getPost,
      postIndex: action.val,
    };
  }
  return state;
};

export default reducer;
