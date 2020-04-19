const initialState = {
  url: false,
  fullName: null,
  refToProDoc: null,
  timeStamp: null,
  location: "Edit",
  website: "Edit",
  email: null,
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
      url: action.dataObj.image,
      fullName: action.dataObj.fullName,
      refToProDoc: action.refToProDoc,
      timeStamp: action.timeStamp,
      location: action.dataObj.location,
      website: action.dataObj.web,
      email: action.dataObj.email,
    };
  }
  if (action.type === "renderProInfo") {
    return {
      ...state,
      location: action.val.location,
      website: action.val.web,
    };
  }
  return state;
};

export default reducer;
