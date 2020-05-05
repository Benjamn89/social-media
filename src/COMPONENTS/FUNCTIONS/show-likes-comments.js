const exitLikeBox = (e) => {
  if (
    e.target.className !== "com-in-likes-box com-in-likes-box-show" &&
    e.target.className !== "likes-comment-p"
  ) {
    if (document.querySelector(".com-in-likes-box")) {
      // Remove the likes box
      document
        .querySelector(".com-in-likes-box")
        .classList.remove("com-in-likes-box-show");
      // Remove the doc event listener
      document.removeEventListener("click", exitLikeBox);
    }
  }
};

var ShowLikes = (e) => {
  // toggle the class
  document
    .querySelector(".com-in-likes-box")
    .classList.toggle("com-in-likes-box-show");
  // Add event listener to the document for quick exit
  document.addEventListener("click", exitLikeBox);
};

export default ShowLikes;
