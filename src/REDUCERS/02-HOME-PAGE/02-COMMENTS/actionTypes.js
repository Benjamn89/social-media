// Create db connection
const faunadb = require("faunadb"),
  q = faunadb.query;
const client = new faunadb.Client({
  secret: "fnADpXV26AACAF7vvX31-YMZ70yB_K2fhYxFLdYS",
});

const actionTypes = {
  getPost: (id) => {
    return {
      type: "getPost",
      val: id,
    };
  },
};

export default actionTypes;
