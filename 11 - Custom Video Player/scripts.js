const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll("input[type='range']");

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updatePlay() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

function skip() {
  const skipTime = this.dataset.skip;
  video.currentTime += +skipTime;
}
function handleRanges() {
  video[this.name] = this.value;
}
function progressBarUpdate() {
  const videoProgress = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${videoProgress}%`;
}
function scrub(e) {
  const progressVideo = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = progressVideo;
}
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);
video.addEventListener("play", updatePlay);
video.addEventListener("pause", updatePlay);
skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRanges));
ranges.forEach((range) => range.addEventListener("mousemove", handleRanges));
video.addEventListener("timeupdate", progressBarUpdate);
let mouseDown = false;
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));
progress.addEventListener("mousemove", (e) => mouseDown && scrub(e));
video.addEventListener("dblclick", (e) => e.target.requestFullscreen());
