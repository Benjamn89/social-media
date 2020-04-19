const initialState = {
  url: false,
  privateName: null,
  refToProDoc: null,
  timeStamp: null,
  location: "Edit",
  website: "Edit",
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
      privateName: action.dataObj.name,
      refToProDoc: action.refToProDoc,
      timeStamp: action.timeStamp,
      location: action.dataObj.location,
      website: action.dataObj.web,
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
