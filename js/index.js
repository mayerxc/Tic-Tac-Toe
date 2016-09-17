//declare z and y for the computer, used as X or O depending on what you choose
var z;
var y;
var rand;
var total;
var me = true;
//will use userArray to determine what user has chosen on the board
var userArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var boardArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var compArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var won = 0;


function reset() {
  userArray =   [0, 0, 0, 0, 0, 0, 0, 0, 0];
  boardArray =  [0, 0, 0, 0, 0, 0, 0, 0, 0];
  compArray =   [0, 0, 0, 0, 0, 0, 0, 0, 0];
  //won = 0;
  counter = 0;
  
  //write if doesn't have class, then add it
  $("td").html("");
  
  if (me !== true) {
    console.log("set off the computer going first after reset")
    computerMove();
  } //end if
}

function ticButton() {
  //change board to X or O and get the ID of the TD played
  $(".tic").click(function() {
    console.log("This is the id of the tile: " + String($(this).attr('id')).charAt(1))
    
    won = 0;// so it doesn't do a move after I won
    
    //if the move is on the board, then do nothing
    if (boardArray[ String($(this).attr('id')).charAt(1) ] === 1) {
      //console.log( "This is the id of the div: " + $(this).attr('id') )
    } else if (won>0) {
      //already won
    } else {
      $(this).html(z); 

      //changes userArray and boardArray from 0 to 1 at the index chosen on board
      userArray[String($(this).attr('id')).charAt(1)] = 1;
      boardArray[String($(this).attr('id')).charAt(1)] = 1;
      console.log("User: " + userArray);
      checkUserWin();
      
      if (won>0){
        console.log("checking after user move of won")
        won=0;
      } else {
      //count total number of moves
        total = 0;
        for (var i in boardArray) {
          total += boardArray[i];
        }
        //if total is more than or equal to 9, then remove class so can't click
        if (total >= 9 || won===1) {
          //tell it not add more moves to the board

          console.log("Does Won === 1? " + won)
          console.log("no more moves on board or won")
        } else {

          //have the computer move then check for win   
          
          computerMove();
          checkCompWin();
          
        }
      }
    }

  }); //end of td.tic button
} //end ticButton function

function youWon() {
  won = 1;
  console.log("You won")
  alert("You won")
  reset();
}

function compWon() {
  // write computer won function for checkCompWin
  won = 1;
  alert("Computer won!!!")
  reset();
}//end compWon

function reload() {
  location.href = location.href;
}//end reload

function checkUserWin() {
  //write a function checking for user win
  if (userArray[0] === 1 && userArray[1] === 1 && userArray[2] === 1) {
    youWon();
  } else if (userArray[3] === 1 && userArray[4] === 1 && userArray[5] === 1) {
    youWon();
  } else if (userArray[6] === 1 && userArray[7] === 1 && userArray[8] === 1) {
    youWon();
  } else if (userArray[0] === 1 && userArray[3] === 1 && userArray[6] === 1) {
    youWon();
  } else if (userArray[1] === 1 && userArray[4] === 1 && userArray[7] === 1) {
    youWon();
  } else if (userArray[2] === 1 && userArray[5] === 1 && userArray[8] === 1) {
    youWon();
  } else if (userArray[0] === 1 && userArray[4] === 1 && userArray[8] === 1) {
    youWon();
  } else if (userArray[2] === 1 && userArray[4] === 1 && userArray[6] === 1) {
    youWon();
  }

} //end checkUserWin

function checkCompWin() {
  // check for win here
  if (compArray[0] === 1 && compArray[1] === 1 && compArray[2] === 1) {
    compWon();
  } else if (compArray[3] === 1 && compArray[4] === 1 && compArray[5] === 1) {
    compWon();
  } else if (compArray[6] === 1 && compArray[7] === 1 && compArray[8] === 1) {
    compWon();
  } else if (compArray[0] === 1 && compArray[3] === 1 && compArray[6] === 1) {
    compWon();
  } else if (compArray[1] === 1 && compArray[4] === 1 && compArray[7] === 1) {
    compWon();
  } else if (compArray[2] === 1 && compArray[5] === 1 && compArray[8] === 1) {
    compWon();
  } else if (compArray[0] === 1 && compArray[4] === 1 && compArray[8] === 1) {
    compWon();
  } else if (compArray[2] === 1 && compArray[4] === 1 && compArray[6] === 1) {
    compWon();
  }
} //end checkCompWin

function computerMove() {
  //if there are two user moves, try to block
  var counter = 0;
  console.log(won)
  
  //shouldn't go twice
  
  if (won > 0) {
    console.log("Won was triggered")
      //alert('won was triggered')
    won=0;
    reset();
    

  } else {

    //check if row has two user plays and block
    for (var i = 0; i < 9; i = i + 3) {

      if (userArray[i + 0] + userArray[i + 1] + userArray[i + 2] === 2 && compArray[i + 0] + compArray[i + 1] + compArray[i + 2] < 1) {
        counter = 0;
        do {
          rand = Math.floor(Math.random() * 3) + i;
        }
        while (boardArray[rand] === 1);
        counter = counter + 1;
        console.log("should block 2 for row");
        console.log("Row rand is: " + rand)
        break;
      }
    } //end for

    //check if row has two user columns played and block
    for (var i = 0; i < 3; i++) {

      if (userArray[i + 0] + userArray[i + 3] + userArray[i + 6] === 2 && compArray[i + 0] + compArray[i + 3] + compArray[i + 6] < 1) {
        counter = 0;
        do {
          rand = (Math.floor(Math.random() * 3) * 3) + i;
        }
        while (boardArray[rand] === 1);
        counter = counter + 1;
        console.log("should block 2 for column");
        console.log("this is for column what rand is: " + rand);
        break; //break out of for loop early
      } //end if
    } //end for

    //check for diagonal to block
    if (userArray[0] + userArray[4] + userArray[8] === 2 && compArray[0] + compArray[4] + compArray[8] < 1) {
      counter = 0;
      do {
        rand = Math.floor(Math.random() * 3) * 4;
      }
      while (boardArray[rand] === 1);
      counter = counter + 1;
      console.log("should block 2 for first diagonal");
      console.log("Diagonal rand is: " + rand)
    } //end if diagonal

    //check for other diagonal to block
    if (userArray[2] + userArray[4] + userArray[6] === 2 && compArray[2] + compArray[4] + compArray[6] < 1) {
      counter = 0;
      do {
        rand = (Math.floor(Math.random() * 3) * 2) + 2;
      }
      while (userArray[rand] === 1);
      counter = counter + 1;
      console.log("should block 2 for 2nd diagonal");
      console.log("Diagonal rand is: " + rand)
    } //end if other diagonal

    //check if row has a win and play that win
    for (var i = 0; i < 9; i = i + 3) {

      if (compArray[i + 0] + compArray[i + 1] + compArray[i + 2] === 2 && userArray[i + 0] + userArray[i + 1] + userArray[i + 2] < 1) {
        counter = 0;
        do {
          rand = Math.floor(Math.random() * 3) + i;
        }
        while (compArray[rand] === 1);
        counter = counter + 1;
        console.log("should win for 2... row");
        console.log("Row rand is: " + rand)
        break;
      }
    } //end for

    //check for column win and play that spot to win
    for (var i = 0; i < 3; i++) {

      if (compArray[i + 0] + compArray[i + 3] + compArray[i + 6] === 2 && userArray[i + 0] + userArray[i + 3] + userArray[i + 6] < 1) {
        counter = 0;
        do {
          rand = (Math.floor(Math.random() * 3) * 3) + i;
        }
        while (compArray[rand] === 1);
        counter = counter + 1;
        console.log("should win for column");
        console.log("this is win for column. rand is: " + rand);
        break; //break out of for loop early
      } //end if
    } //end for

    //check for win 1st diagonal
    if (compArray[0] + compArray[4] + compArray[8] === 2 && userArray[0] + userArray[4] + userArray[8] < 1) {
      counter = 0;
      do {
        rand = Math.floor(Math.random() * 3) * 4;
      }
      while (compArray[rand] === 1);
      counter = counter + 1;
      console.log("should win for first diagonal");
      console.log("Diagonal win rand is: " + rand)
    } //end if diagonal win

    //check for win 2nd diagonal
    if (compArray[2] + compArray[4] + compArray[6] === 2 && userArray[2] + userArray[4] + userArray[6] < 1) {
      counter = 0;
      do {
        rand = (Math.floor(Math.random() * 3) * 2) + 2;
      }
      while (compArray[rand] === 1);
      counter = counter + 1;
      console.log("should win for 2nd diagonal");
      console.log("2nd diagonal win rand is: " + rand)
    }

    //if no moves above, do random move
    if (counter < 1) {
      do {
        rand = Math.floor(Math.random() * 9);
      }
      while (boardArray[rand] === 1 || total >= 9);
      console.log("didn't block anything, random move");
    } //end if

    //one of the ifs above created a number "rand" and should be played 
    boardArray[rand] = 1;
    compArray[rand] = 1;

    rand = "#A" + rand;
    console.log("board " + boardArray);
    console.log("Computer: " + compArray);

    //computer chose a spot to play, then make it so computer can't play that spot again
    $(rand).html(y);  //$(rand).off('click');
    computer=1;
      //$(rand).removeClass('tic');
  } //end else
}; //end computerMove()

function start() {
  //Is the user X or O
  var userX = document.getElementById("x").checked;

  //Who goes first, me or the computer
  me = document.getElementById("me").checked;
  console.log("X is used if true: " + userX);
  console.log("Me takes the first turn: " + me);

  //z is either X or O, and y is either X or O
  if (userX === true) {
    z = "X";
    y = "O"
  } else {
    z = "O";
    y = "X"
  }

  //hide modal after clicking start
  $("#myModal").modal('hide');

  // if computer goes first
  if (me === false) {
    
    computerMove();
  } //end if

  ticButton();

}; //end start button

$(document).ready(function() {
  //show modal 
  $("#myModal").modal('show');
  //when click start button see if x is checked and return true or false to value "x"

  $("#start").click(function() {
    start();
  });

  //reset board 
  $('#reset').click(function() {
    reset();
  }); //end of reset button 

  //reload the whole page
  $('#restart').click(function() {
    reload();
  }); //end restart button

}); //end of document ready