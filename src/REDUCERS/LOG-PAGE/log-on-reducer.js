const initialState = {
  currentMode: "signIn",
  regMode: "registering",
  logIn: false,
};

const reducer = (state = initialState, action) => {
  if (action.type === "changeview") {
    return {
      ...state,
      currentMode: action.view,
      regMode: action.regMode,
    };
  }
  if (action.type === "regChanged") {
    return {
      ...state,
      regMode: action.type,
    };
  }
  if (action.type === "logInSuccess") {
    console.log("chaging the state");
    return {
      ...state,
      logIn: !state.logIn,
    };
  }
  return state;
};

export default reducer;
