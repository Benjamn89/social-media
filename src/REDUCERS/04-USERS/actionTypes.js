// Create db connection
const faunadb = require("faunadb"),
  q = faunadb.query;
const client = new faunadb.Client({
  secret: "fnADpXV26AACAF7vvX31-YMZ70yB_K2fhYxFLdYS",
});

const actionTypes = {
  resetStateUsers: () => {
    return {
      type: "resetStateUsers",
    };
  },

  fetchUserData: (userRef) => {
    // Save the loged user inside the UserReducer state
    const localS = JSON.parse(
      typeof window !== "undefined" && localStorage.getItem("myData")
    );
    const email = localS.email;

    return (dispatch) => {
      client.query(q.Get(q.Ref(q.Collection("Users"), userRef))).then((ret) => {
        // Call the reducer for changing the state
        dispatch(actionTypes.renderUserData(ret.data, email));
      });
    };
  },
  renderUserData: (obj, email) => {
    // Remove spinner
    document.querySelector(".my-profile-div").classList.remove("showSpinner");
    return {
      type: "renderUserData",
      val: obj,
      view: "Info",
      email,
    };
  },
  fetchPostsFromUsers: (pro) => {
    // Initital arr to push into the results
    var storeArr = [];
    return (dispatch) => {
      client
        .query(
          q.Map(
            q.Paginate(q.Match(q.Index("get_posts_byemail"), pro.email)),
            q.Lambda("e", q.Get(q.Var("e")))
          )
        )
        .then((ret) => {
          ret.data.map((el) => {
            return storeArr.push(el.data);
          });
          console.log(storeArr);
          dispatch(actionTypes.renderPostsFromUsers(storeArr, pro));
        });
    };
  },
  renderPostsFromUsers: (posts, pro) => {
    return {
      type: "renderPostsFromUsers",
      val: posts,
      section: pro.title,
    };
  },
  changeSecWithNoFetch: (title) => {
    return {
      type: "changeSecWithNoFetch",
      val: title,
    };
  },
};

export default actionTypes;
