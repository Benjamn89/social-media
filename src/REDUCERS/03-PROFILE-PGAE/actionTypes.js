import boxActionTypes from "../02-HOME-PAGE/01-PROFILE-BOX/actionTypes";

// Create db connection
const faunadb = require("faunadb"),
  q = faunadb.query;
const client = new faunadb.Client({
  secret: "fnADpXV26AACAF7vvX31-YMZ70yB_K2fhYxFLdYS",
});

const actionTypes = {
  resetState: () => {
    return {
      type: "resetState",
    };
  },

  actionChangeMode: (pro) => {
    // Check if to fetch based on visitPost that got forward
    if (pro.visitPost) {
      // Remove Spinner
      document
        .querySelector(".my-pro-view-div")
        .classList.remove("showSpinner");
      return {
        type: "changeModeLess",
        val: pro.sectionName,
      };
    }
    return (dispatch) => {
      client
        .query(
          q.Map(
            q.Paginate(q.Match(q.Index("get_posts_byemail"), pro.email)),
            q.Lambda("e", q.Get(q.Var("e")))
          )
        )
        .then((ret) => {
          //Initial var to be saved as array from the map returning
          var initialArr = ret.data.map((el) => {
            var ref = el.ref.value.id;
            el.data.ref = ref;
            return el.data;
          });
          // Create obj to be passed to reducer
          var objPro = {
            initialArr,
            sectionName: pro.sectionName,
          };
          dispatch(actionTypes.changeMode(objPro));
        });
    };
  },
  changeMode: (pro) => {
    // Remove Spinner
    document.querySelector(".my-pro-view-div").classList.remove("showSpinner");
    return {
      type: "changeMode",
      val: pro,
    };
  },
  updateLikeAction: (pro) => {
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
          dispatch(actionTypes.updateLike(pro.posts));
        });
    };
  },
  updateLike: (pro) => {
    return {
      type: "updateLike",
      val: pro,
    };
  },

  deletePostAction: (pro) => {
    return (dispatch) => {
      client
        .query(q.Delete(q.Ref(q.Collection("posts"), pro.ref)))
        .then(() => dispatch(actionTypes.deletePostFromProfile(pro.posts)));
    };
  },
  deletePostFromProfile: (newPosts) => {
    // Remoe Spinner
    document
      .querySelectorAll(".delete-modal-inside-div")[1]
      .classList.remove("deleteCommentSpinner");
    // Exit delete modal
    document.querySelectorAll(".delete-modal-div")[1].style.display = "none";
    return {
      type: "deletePostFromProfile",
      val: newPosts,
    };
  },
  removeFriendsFromProfile: (pro) => {
    return (dispatch) => {
      client
        .query(
          q.Update(q.Ref(q.Collection("Users"), pro.loginRef), {
            data: {
              friends: pro.copyFriendsArr,
            },
          })
        )
        .then((ret) => {
          console.log(pro.index);
          document
            .querySelectorAll(".friends-inside-d")
            [pro.index].classList.add("remove-friends");
          document
            .querySelectorAll(".friends-x-btn-div")
            [pro.index].classList.remove("friendsSpinner");
          setTimeout(() => {
            document
              .querySelectorAll(".friends-inside-d")
              [pro.index].classList.remove("remove-friends");
            dispatch(
              boxActionTypes.updateFriendsBoxProfile(pro.copyFriendsArr)
            );
          }, 500);
        });
    };
  },
};

export default actionTypes;
