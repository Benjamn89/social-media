const initialState = {
  getPost: false,
  postIndex: null,
  copyPost: null,
  updatedPost: false,
};

const reducer = (state = initialState, action) => {
  if (action.type === "getPost") {
    return {
      ...state,
      getPost: !state.getPost,
      postIndex: action.index,
      copyPost: action.copyPost,
    };
  }
  if (action.type === "updateComment") {
    return {
      ...state,
      updatedPost: !state.updatedPost,
      copyPost: action.updatedPost,
    };
  }
  return state;
};

export default reducer;
