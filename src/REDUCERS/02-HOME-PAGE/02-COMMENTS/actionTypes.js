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
      arr: properties.commentsArray,
    };
  },
  postComment: (properties) => {
    return (dispatch) => {
      client
        .query(
          q.Update(q.Ref(q.Collection("posts"), properties.postRef), {
            data: {
              comments: properties.copyComments,
            },
          })
        )
        .then((ret) => {
          dispatch(actionTypes.updateComment(properties.copyComments));
          document.querySelector("#outlined-basic").value = "";
        });
    };
  },
  updateComment: (updatedComments) => {
    return {
      type: "updateComment",
      updatedComments,
    };
  },
};

export default actionTypes;
