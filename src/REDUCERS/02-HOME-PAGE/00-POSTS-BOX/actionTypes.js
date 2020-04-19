// Create db connection
const faunadb = require("faunadb"),
  q = faunadb.query;
const client = new faunadb.Client({
  secret: "fnADpXV26AACAF7vvX31-YMZ70yB_K2fhYxFLdYS",
});

const actionTypes = {
  // Retrive all stored posts from database
  loadPosts: () => {
    return (dispatch) => {
      var storeArr = [];
      client
        .query(
          q.Map(
            q.Paginate(q.Match(q.Index("get_posts"))),
            q.Lambda("X", q.Get(q.Var("X")))
          )
        )
        .then((ret) => {
          ret.data.map((el) => {
            return storeArr.push(el.data);
          });
          storeArr.reverse();
          dispatch(actionTypes.renderPosts(storeArr));
        });
    };
  },
  // Sending the loaded posts to the reducer for rendering on the screen
  renderPosts: (storeArr) => {
    return {
      type: "renderPosts",
      val: storeArr,
    };
  },
  createNewPost: (postProperties) => {
    return (dispatch) => {
      client
        .query(
          q.Create(q.Collection("posts"), {
            data: {
              name: postProperties.name,
              time: "now",
              text: postProperties.text,
              likes: 0,
              comments: 0,
              email: postProperties.email,
              imageUrl: postProperties.url,
            },
          })
        )
        .then((ret) => {
          postProperties.state.push(ret.data);
          dispatch(actionTypes.updatePost(postProperties.state));
        });
    };
  },
  updatePost: (data) => {
    return {
      type: "updatePost",
      val: data,
    };
  },
};

export default actionTypes;
