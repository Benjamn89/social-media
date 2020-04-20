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
          // Remove the spinner
          document
            .querySelector(".posts-sec-wrapper")
            .classList.remove("showSpinner");
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
          var dataObj = {
            fullName: ret.data.fullName,
            image: ret.data.profileImg,
            location: ret.data.location,
            web: ret.data.website,
            email: ret.data.email,
          };
          dispatch(
            actionTypes.renLogingData(dataObj, parseLocal.ref, timeStamp)
          );
        });
    };
  },
  renLogingData: (dataObj, refToProDoc, timeStamp) => {
    return {
      type: "renLogingData",
      dataObj,
      refToProDoc,
      timeStamp,
    };
  },
  establishFetch: (ref, location, website) => {
    return (dispatch) => {
      client
        .query(
          q.Update(q.Ref(q.Collection("Users"), ref), {
            data: { location, website },
          })
        )
        .then((ret) => {
          // Remove Spinner
          document
            .querySelector(".posts-sec-wrapper")
            .classList.remove("showSpinner");
          dispatch(actionTypes.renderProInfo(location, website));
        });
    };
  },
  renderProInfo: (location, web) => {
    return {
      type: "renderProInfo",
      val: {
        location,
        web,
      },
    };
  },
};

export default actionTypes;
