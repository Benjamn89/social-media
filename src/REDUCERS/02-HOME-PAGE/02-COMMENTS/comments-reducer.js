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
  if (action.type === "addLikeComment") {
    // Copy the copyPost for changing only the likes array
    var newCopyPost = JSON.parse(JSON.stringify(state.copyPost));
    // Changing the likes array
    newCopyPost.likes = action.val;

    return {
      ...state,
      updatedPost: !state.updatedPost,
      copyPost: newCopyPost,
    };
  }
  if (action.type === "deleteComment") {
    // Copy the post that need to be changed
    var copyPost = JSON.parse(JSON.stringify(state.copyPost));
    // Changing the comments array
    copyPost.comments = action.val;
    return {
      ...state,
      updatedPost: !state.updatedPost,
      copyPost: copyPost,
    };
  }
  return state;
};

export default reducer;
