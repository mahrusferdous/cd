var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

//pushes into an array
$(".btn").on("click", function(){
  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length);
});

$(document).keypress(function() {
    if(!started) {
      nextSequence();
      started = true;
    }
});

//selectes random colors and pushes into an array
function nextSequence() {
  var randomNumber = Math.round((Math.random())*3);
  var randomChosenColor = buttonColors[randomNumber];
  $("."+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  gamePattern.push(randomChosenColor);
  level++;
  $('h1').text("Level " + level);
}

//plays sounds
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  var currentC = $("." + currentColor);
  currentC.addClass("pressed");
  setTimeout(function() {
    currentC.removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
// THE IF STATEMENT DOES NOT WORK
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    gameOver();
    startOver();
  }
}

function gameOver() {
  $('h1').text("Game Over, Press Any Key to Restart")
  var currentC = $("body");
  currentC.addClass("game-over");
  setTimeout(function() {
    currentC.removeClass("game-over");
  }, 200);
  playSound("wrong");
}

function startOver() {
  level = 0;
  gamePattern.length = 0;
  started = false;
}
