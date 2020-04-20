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
            const now = new Date();
            const time = now.getTime();
            var newTime = time - el.data.time;
            if (newTime < 59000) {
              el.data.timeNow = `Few sec ago`;
            }
            if (newTime > 59000 && newTime < 3540000) {
              el.data.timeNow = `Few min ago`;
            }
            if (newTime > 3540000 && newTime < 86400000) {
              el.data.timeNow = `Few hours ago`;
            }
            if (newTime > 86400000) {
              let timePast = Math.floor(newTime / 86400000);
              el.data.timeNow = `${timePast} days ago`;
            }
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
  createNewPost: (postProperties) => {
    return (dispatch) => {
      client
        .query(
          q.Create(q.Collection("posts"), {
            data: {
              fullName: postProperties.fullName,
              time: postProperties.time,
              timeNow: "Right now...",
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
};

export default actionTypes;
