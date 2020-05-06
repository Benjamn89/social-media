// Create my DB connection
const faunadb = require("faunadb"),
  q = faunadb.query;
const client = new faunadb.Client({
  secret: "fnADpMLFl0ACAsnF_Eab0pOmjNt_eYUo0mHMA6O3",
});

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
  removeProfileStedAction: () => {
    var localS =
      typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("myData"));
    const ref = localS.ref;

    return (dispatch) => {
      client.query(q.Delete(q.Ref(q.Collection("Users"), ref))).then(() => {
        // Remove Spinner
        document
          .querySelector(".remove-inside-div")
          .classList.remove("createPostSpinner");
        dispatch(actionTypes.signOut());
      });
    };
  },
};

export default actionTypes;
