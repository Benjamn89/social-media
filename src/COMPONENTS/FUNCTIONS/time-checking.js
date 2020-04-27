var timeChecking = (postedTime, displayTime) => {
  const now = new Date();
  const time = now.getTime();
  var newTime = time - postedTime;

  if (newTime < 5000) {
    newTime = "Right now...";
  }
  if (newTime < 59000) {
    displayTime = `Few sec ago`;
  }
  if (newTime > 59000 && newTime < 3540000) {
    displayTime = `Few min ago`;
  }
  if (newTime > 3540000 && newTime < 86400000) {
    displayTime = `Few hours ago`;
  }
  if (newTime > 86400000) {
    let timePast = Math.floor(newTime / 86400000);
    displayTime = `${timePast} days ago`;
  }
  return displayTime;
};

export default timeChecking;
