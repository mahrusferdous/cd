var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var tracker = 0;

// Press any key to start
$(document).keypress(function () {
    if (!started) {
        nextSequence();
        started = true;
        $("body").removeClass("game-over");
    }
});

// Play sounds
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// The random color
function nextSequence() {
    // Generates random color
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    level++;
    $("h1").text("Level " + level);

    // Makes color fade in and out
    function start(counter) {
        if (counter < gamePattern.length) {
            setTimeout(function () {
                $("." + gamePattern[counter++])
                    .fadeOut(100)
                    .fadeIn(100);
                start(counter);
            }, 500);
        }
    }
    start(0);

    function startS(counter) {
        if (counter < gamePattern.length) {
            setTimeout(function () {
                playSound(gamePattern[counter++]);
                startS(counter);
            }, 500);
        }
    }
    startS(0);
    userClickedPattern.length = 0;
}

// My Color
$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animateColor(userChosenColor);
    //runs after the entire game is played out
    if (userClickedPattern.length === level) {
        checkAnswer(level);
    }
});

// Individual color fade in fade out
function animateColor(currentColor) {
    var currentC = $("." + currentColor);
    currentC.addClass("pressed");
    setTimeout(function () {
        currentC.removeClass("pressed");
    }, 100);
}

//Game over
function gameOver() {
    $("h1").text("Game Over, Press Any Key To Restart");
    $("body").addClass("game-over");
    playSound("wrong");
}

//Start again
function startOver() {
    userClickedPattern.length = 0;
    gamePattern.length = 0;
    started = false;
    level = 0;
}

//Check answer
function checkAnswer(currentLevel) {
    var playing = true;
    for (var i = 0; i < currentLevel; i++) {
        if (userClickedPattern[i] !== gamePattern[i]) {
            playing = false;
            gameOver();
            startOver();
            break;
        }
    }
    if (playing) {
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }
}
