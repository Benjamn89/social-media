// Create db connection
const faunadb = require("faunadb"),
  q = faunadb.query;
const client = new faunadb.Client({
  secret: "fnADpXV26AACAF7vvX31-YMZ70yB_K2fhYxFLdYS",
});

const actionTypes = {
  getPost: (properties) => {
    return {
      type: "getPost",
      index: properties.postIndex,
      copyPost: properties.copyPost,
    };
  },
  postComment: (properties) => {
    return (dispatch) => {
      client
        .query(
          q.Update(q.Ref(q.Collection("posts"), properties.postRef), {
            data: {
              comments: properties.copyPost.comments,
            },
          })
        )
        .then((ret) => {
          dispatch(actionTypes.updateComment(properties.copyPost));
          document.querySelector("#outlined-basic").value = "";
          // Remove Spinner
          document
            .querySelector(".com-ins3-btn")
            .classList.remove("showSpinner");
        });
    };
  },
  updateComment: (updatedPost) => {
    return {
      type: "updateComment",
      updatedPost,
    };
  },
  likeClick: (properties) => {
    return (dispatch) => {
      client
        .query(
          q.Update(q.Ref(q.Collection("posts"), properties.ref), {
            data: {
              likes: properties.likesArray,
            },
          })
        )
        .then((ret) => {
          dispatch(actionTypes.addLike(properties.likesArray));
        });
    };
  },

  addLike: (likesArray) => {
    return {
      type: "addLikeComment",
      val: likesArray,
    };
  },
  deleteCommentRequest: (properties) => {
    return (dispatch) => {
      client
        .query(
          q.Update(q.Ref(q.Collection("posts"), properties.ref), {
            data: {
              comments: properties.commentsArray,
            },
          })
        )
        .then((ret) => {
          // Remove spinner
          document
            .querySelector(".comments-inside4-div")
            .classList.remove("deleteCommentSpinner");
          dispatch(actionTypes.deleteComment(properties.commentsArray));
        });
    };
  },
  deleteComment: (commentsArray) => {
    return {
      type: "deleteComment",
      val: commentsArray,
    };
  },
};

export default actionTypes;
