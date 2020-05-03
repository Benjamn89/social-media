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
    // Load Spinner
    document.querySelector(".my-profile-div").classList.add("showSpinner");
    // Remove the active class from the last btn
    document
      .querySelector(".active-btn-span")
      .classList.remove("active-btn-span");
    // Set the activeBtn to the info section
    document.querySelectorAll(".m-p-b-s")[0].classList.add("active-btn-span");

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
};

export default actionTypes;
