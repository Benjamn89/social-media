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
          // Remove Spinner
          document
            .querySelector(".my-pro-view-div")
            .classList.remove("showSpinner");
        });
    };
  },
  changeMode: (pro) => {
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
};

export default actionTypes;
