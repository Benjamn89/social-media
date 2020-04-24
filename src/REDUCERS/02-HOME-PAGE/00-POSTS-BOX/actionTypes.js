// Create db connection
const faunadb = require("faunadb"),
  q = faunadb.query;
const client = new faunadb.Client({
  secret: "fnADpXV26AACAF7vvX31-YMZ70yB_K2fhYxFLdYS",
});

const actionTypes = {
  setCommentRef: (id) => {
    return {
      type: "setCommentRef",
      val: id,
    };
  },

  // Retrive all stored posts from database
  loadPosts: () => {
    return (dispatch) => {
      var storeArr = [];
      var localS = JSON.parse(localStorage.getItem("myData"));
      var email = localS.email;
      client
        .query(
          q.Map(
            q.Paginate(q.Match(q.Index("get_posts"))),
            q.Lambda("X", q.Get(q.Var("X")))
          )
        )
        .then((ret) => {
          if (ret.data.length > 0) {
            ret.data.map((el) => {
              // Enter the ref inside my array storing data
              el.data.ref = el.ref.value.id;
              const now = new Date();
              const time = now.getTime();
              var newTime = time - el.data.postedTime;
              if (newTime < 59000) {
                el.data.displayTime = `Few sec ago`;
              }
              if (newTime > 59000 && newTime < 3540000) {
                el.data.displayTime = `Few min ago`;
              }
              if (newTime > 3540000 && newTime < 86400000) {
                el.data.displayTime = `Few hours ago`;
              }
              if (newTime > 86400000) {
                let timePast = Math.floor(newTime / 86400000);
                el.data.displayTime = `${timePast} days ago`;
              }
              return storeArr.push(el.data);
            });
            dispatch(actionTypes.renderPosts(storeArr, email));
          }
        });
    };
  },
  // Sending the loaded posts to the reducer for rendering on the screen
  renderPosts: (storeArr, email) => {
    return {
      type: "renderPosts",
      val: storeArr,
      email,
    };
  },
  createNewPost: (postProperties) => {
    return (dispatch) => {
      client
        .query(
          q.Create(q.Collection("posts"), {
            data: {
              fullName: postProperties.fullName,
              postedTime: postProperties.postedTime,
              displayTime: "Right now...",
              text: postProperties.text,
              likes: [],
              comments: [],
              email: postProperties.email,
              imageUrl: postProperties.url,
              uniqeId: postProperties.uniqeId,
              ref: "",
            },
          })
        )
        .then((ret) => {
          ret.data.ref = ret.ref.value.id;
          postProperties.state.push(ret.data);
          dispatch(actionTypes.updatePost(postProperties.state));
          // Remove Spinner
          document
            .querySelector(".posts-boxes-wrapper")
            .classList.remove("showSpinner");
        });
    };
  },
  updatePost: (data) => {
    return {
      type: "updatePost",
      val: data,
    };
  },
  likeOnPost: (properties) => {
    return (dispatch) => {
      client
        .query(
          q.Update(q.Ref(q.Collection("posts"), properties.ref), {
            data: {
              likes: properties.updatedLike,
            },
          })
        )
        .then((ret) => {
          dispatch(actionTypes.addLike(properties.copyPosts));
        });
    };
  },
  addLike: (newLikesArr) => {
    return {
      type: "addLike",
      val: newLikesArr,
    };
  },
  displayBtn: () => {
    return {
      type: "displayBtn",
    };
  },
  deletePost: (pro) => {
    return (dispatch) => {
      client
        .query(q.Delete(q.Ref(q.Collection("posts"), pro.ref)))
        .then((ret) => dispatch(actionTypes.deletingPost(pro)));
    };
  },
  deletingPost: (pro) => {
    return {
      type: "deletePost",
      val: pro.copyPost,
    };
  },
};

export default actionTypes;
