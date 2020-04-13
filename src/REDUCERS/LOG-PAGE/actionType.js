// Create my DB connection
const faunadb = require("faunadb"),
  q = faunadb.query;
const client = new faunadb.Client({
  secret: "fnADpMLFl0ACAsnF_Eab0pOmjNt_eYUo0mHMA6O3",
});

// import bcryptjs
const bcrypt = require("bcryptjs");

const actionTypes = {
  // change signIn/ signUp mode and the register mode if the client allreay has been registered
  changeView: (viewMode, regMode) => {
    return {
      type: "changeview",
      view: viewMode,
      regMode,
    };
  },
  createUser: () => {
    // create the user in the database and dispatch reaction to the client
    document
      .querySelector(".welcome-part2-div")
      .classList.remove("showSpinner");
    return {
      type: "regChanged",
    };
  },

  sendCreateRequest: (fullName, email, password) => {
    return (dispatch) => {
      // find if email exists in the system
      client
        .query(q.Exists(q.Match(q.Index("email_exists"), email)))
        .then((ret) => {
          if (ret === true) {
            // if exists -> dispatch an exists msg
            dispatch(actionTypes.userExists());
          } else {
            // hash password and send the user to the db
            bcrypt.genSalt(6, function (err, salt) {
              bcrypt.hash(password, salt, function (err, hash) {
                // Store hash in your password DB.
                client
                  .query(
                    q.Create(q.Collection("Users"), {
                      credentials: { password: hash },
                      data: { fullName, email },
                    })
                  )
                  .then((ret) => {
                    // Notify the customer that the user has been successfully created
                    dispatch(actionTypes.createUser());
                  });
              });
            });
          }
        });
    };
  },
  userExists: () => {
    // remove spinner after fething
    document
      .querySelector(".welcome-part2-div")
      .classList.remove("showSpinner");
    // add warning to the client
    document.querySelector(".form-button").classList.add("email-warning");
    return {
      type: null,
    };
  },
  logIn: (email, pass) => {
    return (dispatch) => {
      client
        .query(
          q.Login(q.Match(q.Index("email_exists"), email), {
            password: pass,
          })
        )
        .then((ret) => {
          console.log(ret);
          dispatch(actionTypes.logInSuccess());
        });
    };
  },
  logInSuccess: () => {
    // log in the user to the profile
    return {
      type: "logInSuccess",
    };
  },
};

export default actionTypes;
