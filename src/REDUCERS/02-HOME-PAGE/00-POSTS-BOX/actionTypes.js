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
};

export default actionTypes;
