import boxActionTypes from "../02-HOME-PAGE/01-PROFILE-BOX/actionTypes";
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

  fetchUserData: (profileRef) => {
    // Load Spinner
    document.querySelector(".my-profile-div").classList.add("showSpinner");
    var localS =
      typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("myData"));
    var loginRef = localS.ref;
    var loginUser, profileUser;
    return (dispatch) => {
      Promise.all([
        client
          .query(q.Get(q.Ref(q.Collection("Users"), loginRef)))
          .then((ret) => {
            ret.data.ref = ret.ref.value.id;
            return (loginUser = ret.data);
          }),
        client
          .query(q.Get(q.Ref(q.Collection("Users"), profileRef)))
          .then((ret) => {
            ret.data.ref = ret.ref.value.id;
            return (profileUser = ret.data);
          }),
      ])
        .then((sucess) => {
          const obj = {
            profileUser,
            loginUser,
          };
          dispatch(actionTypes.renderUserData(obj));
        })
        .catch((err) => {
          // Remove spinner
          document
            .querySelector(".my-profile-div")
            .classList.remove("showSpinner");
          console.log(err);
        });
    };
  },

  fetchUserDirect: (profileRef) => {
    // Load Spinner
    document.querySelector(".my-profile-div").classList.add("showSpinner");
    var localS =
      typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("myData"));
    var loginRef = localS.ref;
    var profileUser, loginUser;
    return (dispatch) => {
      Promise.all([
        client
          .query(q.Get(q.Ref(q.Collection("Users"), profileRef)))
          .then((ret) => {
            ret.data.ref = ret.ref.value.id;
            return (profileUser = ret.data);
          }),
        client
          .query(q.Get(q.Ref(q.Collection("Users"), loginRef)))
          .then((ret) => {
            ret.data.ref = ret.ref.value.id;
            return (loginUser = ret.data);
          }),
      ]).then((sucess) => {
        const obj = {
          loginUser,
          profileUser,
        };
        dispatch(actionTypes.renderUserData(obj));
      });
    };
  },
  renderUserData: (obj) => {
    // Remove spinner
    document.querySelector(".my-profile-div").classList.remove("showSpinner");
    return {
      type: "renderUserData",
      val: obj,
      view: "Info",
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
            // Retrive the post ref
            var ref = el.ref.value.id;
            // Inject the post ref to the db
            el.data.ref = ref;
            return storeArr.push(el.data);
          });
          dispatch(actionTypes.renderPostsFromUsers(storeArr, pro));
        });
    };
  },
  renderPostsFromUsers: (posts, pro) => {
    // Remove Spinner
    document.querySelector(".my-pro-view-div").classList.remove("showSpinner");
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
  updateLikeUsersAction: (pro) => {
    return (dispatch) => {
      client
        .query(
          q.Update(q.Ref(q.Collection("posts"), pro.ref), {
            data: {
              likes: pro.posts[pro.index].likes,
            },
          })
        )
        .then((ret) => {
          dispatch(actionTypes.updateLikeUsers(pro.posts));
        });
    };
  },
  updateLikeUsers: (posts) => {
    return {
      type: "updateLikeUsers",
      val: posts,
    };
  },
  deletePostUsersAction: (pro) => {
    return (dispatch) => {
      client
        .query(q.Delete(q.Ref(q.Collection("posts"), pro.ref)))
        .then(() => dispatch(actionTypes.deletePostFromUsers(pro.posts)));
    };
  },
  deletePostFromUsers: (newPosts) => {
    // Remoe Spinner
    document
      .querySelectorAll(".delete-modal-inside-div")[1]
      .classList.remove("deleteCommentSpinner");
    // Exit delete modal
    document.querySelectorAll(".delete-modal-div")[1].style.display = "none";
    return {
      type: "deletePostFromUsers",
      val: newPosts,
    };
  },
  updateFriendsUserAction: (obj) => {
    return (dispatch) => {
      client
        .query(
          q.Update(q.Ref(q.Collection("Users"), obj.ref), {
            data: {
              friends: obj.friendsArr,
            },
          })
        )
        .then((ret) => {
          dispatch(actionTypes.updateFriendsUserRender(ret.data));
          dispatch(boxActionTypes.updateFriendsBoxProfile(ret.data.friends));
        });
    };
  },
  updateFriendsUserRender: (data) => {
    // Remove Spinner
    document.querySelector(".no-friends-div").classList.remove("showSpinner2");
    return {
      type: "updateFriendsUserRender",
      val: data,
    };
  },
};

export default actionTypes;
