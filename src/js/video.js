
let video = document.getElementById('myVideo')
video.src = '../video1.mp4';
video.load(); video.play();
const unmute = document.getElementById('vol');

// Event listener for button click
unmute.addEventListener('click', function () {
    video.muted = false;
});
document.addEventListener('DOMContentLoaded', function () {
const video = document.getElementById('myVideo');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');

let isDragging = false;

function updateProgressBar() {
  const progressPercentage = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

video.addEventListener('timeupdate', updateProgressBar);

function handleDown(event) {
  isDragging = true;
  handleDrag(event);
}

function handleMove(event) {
  if (isDragging) {
    handleDrag(event);
  }
}

function handleUp() {
  isDragging = false;
}

function handleDrag(event) {
  const clientX = event.type.includes('touch') ? event.touches[0].clientX : event.clientX;
  const clickedPosition = clientX - progressContainer.getBoundingClientRect().left;
  const progressBarWidth = progressContainer.offsetWidth;
  const clickedPercentage = (clickedPosition / progressBarWidth) * 100;

  const newTime = (clickedPercentage / 100) * video.duration;
  video.currentTime = newTime;
  updateProgressBar();
}

progressContainer.addEventListener('mousedown', handleDown);
progressContainer.addEventListener('touchstart', handleDown);

window.addEventListener('mousemove', handleMove);
window.addEventListener('touchmove', handleMove);

window.addEventListener('mouseup', handleUp);
window.addEventListener('touchend', handleUp);

// Smooth transition for the progress bar width
progressBar.style.transition = 'width 0.3s ease-in-out';
});

function handleContainerClick(event) {
const progressBar = document.getElementById('progressBar');
const progressBarWidth = event.clientX - event.currentTarget.getBoundingClientRect().left;
const containerWidth = event.currentTarget.offsetWidth;

progressBar.style.width = `${(progressBarWidth / containerWidth) * 100}%`;

// Update video time based on the clicked position
const newTime = (progressBarWidth / containerWidth) * video.duration;
video.currentTime = newTime;
}