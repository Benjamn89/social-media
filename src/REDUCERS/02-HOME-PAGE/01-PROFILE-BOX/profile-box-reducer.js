const initialState = {
  url: false,
  privateName: null,
  refToProDoc: null,
  timeStamp: null,
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
      url: action.imageUrl,
      privateName: action.fullName,
      refToProDoc: action.refToProDoc,
      timeStamp: action.timeStamp,
    };
  }
  return state;
};

export default reducer;
