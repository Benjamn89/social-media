const initialState = {
  url: false,
};

const reducer = (state = initialState, action) => {
  if (action.type === "changeProfileImage") {
    return {
      ...state,
      url: action.url,
    };
  }
  if (action.type === "renLogingData") {
    return {
      ...state,
      ...action.dataObj,
    };
  }
  if (action.type === "renderProInfo") {
    return {
      ...state,
      location: action.val.location,
      website: action.val.web,
    };
  }
  if (action.type === "updateFriendsBoxProfile") {
    return {
      ...state,
      friends: action.val,
    };
  }
  return state;
};

export default reducer;
