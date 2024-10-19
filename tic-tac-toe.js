//Tic-Tac-Toe

// define the contestants
let contestant1 = "X";
let contestant2 = "O";

// variable to track the current contestant's turn
let currentContestant = "";

// tracking the number of rounds played
let round = 0;
let winner = false;

// hide alert messages at the beginning
$("#alertBegin").hide();
$("#alertWinner").hide();
$("#alertDraw").hide();

// winning combinations (rows, columns, and diagonals)
const winningCombinations = [
  ["box0", "box1", "box2"],
  ["box3", "box4", "box5"],
  ["box6", "box7", "box8"],
  ["box0", "box3", "box6"],
  ["box1", "box4", "box7"],
  ["box2", "box5", "box8"],
  ["box0", "box4", "box8"],
  ["box2", "box4", "box6"],
];

// checking if the current contestant is  winner
const isWinner = (currentContestant, a, b, c) => {
  if (
    a.text() === currentContestant &&
    b.text() === currentContestant &&
    c.text() === currentContestant
  ) {
    winner = true;

    const winnerName =
      currentContestant === "X" ? "Contestant 1" : "Contestant 2";

    // update and show the winner alert message
    $("#alertWinner").text(`THE END.. ${winnerName} WON!`);
    $("#alertWinner").show();
  }
};

// checking the game results after every move
const checkGameResults = () => {
  for (let combination of winningCombinations) {
    //checking all combinations
    const a = $("#" + combination[0]);
    const b = $("#" + combination[1]);
    const c = $("#" + combination[2]);

    // if one player has the same text, he is the winner
    if (
      a.text() === currentContestant &&
      b.text() === currentContestant &&
      c.text() === currentContestant
    ) {
      isWinner(currentContestant, a, b, c);
      return;
    }
  }
  // at the end, if the all boxes are full and there is no winner, it's a draw
  if (round === 9 && !winner) {
    $("#alertBegin").hide();
    $("#alertWinner").hide();
    $("#alertDraw").show();
  }
};

// start game function
const beginGame = () => {
  currentContestant = contestant1;
  //console.log(currentContestant);

  //start alert
  $("#alertBegin").show();

  $(".box")
    .off("click")
    .on("click", function () {
      if (!$(this).text()) {
        $("#alertBegin").hide(); // Hide start alert after the first move

        // Display "X" or "O" in the clicked box
        $(this).text(currentContestant);
        round++;

        updateTurnDisplay();

        checkGameResults();

        // Switch players
        currentContestant =
          currentContestant === contestant1 ? contestant2 : contestant1;
      }
    });
};

// function to update the display of whose turn it is
const updateTurnDisplay = () => {
  if (currentContestant === contestant1) {
    $("#cont1").addClass("bg-light border border-success");
    $("#cont2").removeClass("bg-light border border-success");
  } else {
    $("#cont2").addClass("bg-light border border-success");
    $("#cont1").removeClass("bg-light border border-success");
  }
};

// function for restart the game
const restartGame = () => {
  currentContestant = contestant1;
  round = 0;
  winner = false;

  $(".box").text("");
  $("#alertBegin").hide();
  $("#alertWinner").hide();
  $("#alertDraw").hide();

  $("#alertBegin").show();
};

// Attach the event listener
document.getElementById("beginBtn").addEventListener("click", beginGame);

document.getElementById("restartBtn").addEventListener("click", restartGame);
