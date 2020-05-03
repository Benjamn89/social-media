const exitLikeBox = (e) => {
  // Shortcut event.target.className
  const eClass = e.target.className;
  // Exit from the likes box if the user click outside the box
  if (
    eClass !== "in-likes-box in-likes-box-show" &&
    eClass !== "i-f-p-l-s" &&
    document.querySelector(".in-likes-box-show")
  ) {
    // Remove the like box
    document
      .querySelector(".in-likes-box-show")
      .classList.remove("in-likes-box-show");
    // Remove the body click listener
    document.removeEventListener("click", exitLikeBox);
  }
};

var ShowLikes = (e) => {
  // Make sure the function run when he click on the EXACT el
  if (e.target.className === "i-f-p-l-s") {
    // Save the document
    const doc = e.target.parentNode.parentNode.children[0].children[1];
    // Save the previous like box doc (if exists)
    var lastDoc = document.querySelector(".in-likes-box-show");
    // Check and remove the previous likes box (if he exists)
    if (lastDoc && lastDoc !== doc) {
      lastDoc.classList.remove("in-likes-box-show");
    }
    // Toggle the like box
    doc.classList.toggle("in-likes-box-show");
    // Add evnet listener to the body of exit the like box
    document.addEventListener("click", exitLikeBox);
  }
  // Remove the body event listener if there is no like box opened
  if (!document.querySelector(".in-likes-box-show")) {
    document.removeEventListener("click", exitLikeBox);
  }
};

export default ShowLikes;
