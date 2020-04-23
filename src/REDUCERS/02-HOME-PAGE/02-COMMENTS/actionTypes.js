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
        });
    };
  },
  updateComment: (updatedPost) => {
    return {
      type: "updateComment",
      updatedPost,
    };
  },
};

export default actionTypes;
