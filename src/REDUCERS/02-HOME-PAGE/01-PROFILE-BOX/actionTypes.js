import axios from "axios";

// Create db connection
const faunadb = require("faunadb"),
  q = faunadb.query;
const client = new faunadb.Client({
  secret: "fnADpXV26AACAF7vvX31-YMZ70yB_K2fhYxFLdYS",
});

const actionTypes = {
  // Uploading the loacl picked image to the firebase bucket
  renderProfileImage: (storeInputPick, refDoc) => {
    var newImgUrl;
    return (dispatch) => {
      const fd = new FormData();
      fd.append("image", storeInputPick, storeInputPick.name);
      axios
        .post(
          "https://us-central1-sted-7c8ac.cloudfunctions.net/uploadFile",
          fd
        )
        .then((res) => {
          // Establish the new url of the profile image
          newImgUrl = `https://firebasestorage.googleapis.com/v0/b/sted-7c8ac.appspot.com/o/renamed-${storeInputPick.name}?alt=media`;
          // Update the database with the new Url
          client.query(
            q.Update(q.Ref(q.Collection("Users"), refDoc), {
              data: { profileImg: newImgUrl },
            })
          );
          // Change the state with the reducer
          dispatch(actionTypes.changeImageState(newImgUrl));
        });
    };
  },
  // Rendering the image to the screen
  changeImageState: (url) => {
    return {
      type: "changeProfileImage",
      url: url,
    };
  },
  // Retrive the data of the logging user
  retriveLoginData: () => {
    return (dispatch) => {
      var localS = localStorage.getItem("myData");
      var parseLocal = JSON.parse(localS);
      // Start fetching logging data
      client
        .query(q.Get(q.Match(q.Index("email_exists"), parseLocal.email)))
        .then((ret) => {
          var splitTime = ret.data.time.split(" ");
          var timeStamp = {
            year: splitTime[3],
            month: splitTime[1],
            day: splitTime[2],
          };
          dispatch(
            actionTypes.renLogingData(
              ret.data.fullName,
              ret.data.profileImg,
              parseLocal.ref,
              timeStamp
            )
          );
        });
    };
  },
  renLogingData: (fullName, imageUrl, refToProDoc, timeStamp) => {
    return {
      type: "renLogingData",
      fullName,
      imageUrl,
      refToProDoc,
      timeStamp,
    };
  },
};

export default actionTypes;
