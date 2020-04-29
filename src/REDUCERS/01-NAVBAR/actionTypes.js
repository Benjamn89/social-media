const actionTypes = {
  signOut: () => {
    var localS = {
      key: false,
      time: null,
    };
    typeof window !== "undefined" &&
      localStorage.setItem("myData", JSON.stringify(localS));
    return {
      type: "signOut",
    };
  },
};

export default actionTypes;
