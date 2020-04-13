const actionTypes = {
  signOut: () => {
    var localS = {
      key: false,
      time: null,
    };
    localStorage.setItem("myData", JSON.stringify(localS));
    return {
      type: "signOut",
    };
  },
};

export default actionTypes;
