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

  sendCreateRequest: (obj) => {
    return (dispatch) => {
      // find if email exists in the system
      client
        .query(q.Exists(q.Match(q.Index("email_exists"), obj.email)))
        .then((ret) => {
          if (ret === true) {
            // if exists -> dispatch an exists msg
            dispatch(actionTypes.userExists());
          } else {
            // hash password and send the user to the db
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(obj.password, salt);
            // Create time stamp
            var time = new Date().toString();
            client
              .query(
                q.Create(q.Collection("Users"), {
                  credentials: { password: hash },
                  data: {
                    fullName: obj.fullName,
                    email: obj.email,
                    password: hash,
                    profileImg: obj.defaultImgUrl,
                    time,
                    location: "EDIT",
                    website: "EDIT",
                  },
                })
              )
              .then((ret) => {
                // Notify the customer that the user has been successfully created
                dispatch(actionTypes.createUser());
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
        .query(q.Exists(q.Match(q.Index("email_exists"), email)))
        .then((ret) => {
          if (ret) {
            client
              .query(q.Get(q.Match(q.Index("email_exists"), email)))
              .then((ret) => {
                // Check the password
                var check = bcrypt.compareSync(pass, ret.data.password);
                // Save the correct hashed password at the login box
                var generatePass = ret.data.password;
                // Save the reference id database
                var ref = ret.ref.value.id;
                if (check === true) {
                  var now = new Date();
                  var storeKey = {
                    key: true,
                    time: now.getTime() + 3600000,
                    email,
                    ref,
                  };
                  localStorage.setItem("myData", JSON.stringify(storeKey));
                  // Passord ok -> procceed for rciving a token
                  client
                    .query(
                      q.Login(q.Match(q.Index("email_exists"), email), {
                        password: generatePass,
                      })
                    )
                    .then((ret) => {
                      // didpatch the login sucees for showing the profile

                      dispatch(actionTypes.logInSuccess(email));
                    });
                } else {
                  // Remove spinner
                  document
                    .querySelector(".log-in-div")
                    .classList.remove("showSpinner2");
                  // clear pass field
                  document.querySelector(".clear-password").value = "";
                  // show invalid msg
                  document
                    .querySelector(".text-for-warning")
                    .classList.add("invalid-msg");
                }
              });
          } else {
            // Remove spinner
            document
              .querySelector(".log-in-div")
              .classList.remove("showSpinner2");
            // clear pass field
            document.querySelector(".clear-password").value = "";
            // show invalid msg
            document
              .querySelector(".text-for-warning")
              .classList.add("invalid-msg");
          }
        });
    };
  },
  logInSuccess: (email) => {
    // log in the user to the profile
    return {
      type: "logInSuccess",
      email,
    };
  },
};

export default actionTypes;
