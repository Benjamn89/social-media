const initialState = {
  getPost: false,
  postIndex: null,
};

const reducer = (state = initialState, action) => {
  if (action.type === "getPost") {
    return {
      ...state,
      getPost: !state.getPost,
      postIndex: action.index,
      commentsArray: action.arr,
    };
  }
  if (action.type === "updateComment") {
    return {
      ...state,
      getPost: !state.getPost,
      commentsArray: action.updatedComments,
    };
  }
  return state;
};

export default reducer;
