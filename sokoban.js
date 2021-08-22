"use strict"

// Array of arrays that contains the level every element represent a tile of the game.
var firstLevel = [
    ['x','x','x','x','x','x','x','x','x','x'],
    ['x','&','o','o','x','o','o','o','o','x'],
    ['x','o','o','o','x','o','o','*','*','x'],
    ['x','#','o','o','x','o','o','o','o','x'],
    ['x','o','o','o','x','x','o','o','o','x'],
    ['x','o','o','o','o','x','o','o','o','x'],
    ['x','o','#','o','o','x','o','o','#','x'],
    ['x','o','o','o','o','o','o','*','o','x'],
    ['x','o','o','o','o','o','o','o','o','x'],
    ['x','x','x','x','x','x','x','x','x','x']
];
//the initial position of the player
var playerPosI = 1;
var playerPosJ = 1;
//the position of the goal 1
var goal1PosI = 3;
var goal1PosJ = 1;
//the position of the goal 2
var goal2PosI = 6;
var goal2PosJ = 2;
//the position of the goal 3
var goal3PosI = 6;
var goal3PosJ = 8;


//ask to use to enter her name
function enterName() {
    //connect the java script file with the input in the html
    var enterUsName = document.getElementById("userName").value;
    //welcome the player to the game by using the entered name
    alert("Hello " + enterUsName + " Enjoy your game!");
}

// creating a board game
function printArrayHTML(anArray) {
    //connecting the java script file with the html div element
    let container = document.getElementById("container");
    //print the content without inverted commas
    container.innerHTML = "";
//create a table tag in html
    let table = document.createElement("table");
//iterate through an array with the table to create a cell
    for (let i = 0; i < anArray.length; i++) {
        //creating a row in html
        let tRow = document.createElement("tr");
//iterating through each cell to create a cell
        for (let j = 0; j < anArray[i].length; j++) {
            //create a cell in html
            let tData = document.createElement("td");
//replace each symbol with an image within the array of arrays
            //x means a wall
            if(anArray[i][j] === "x") {
               // create a variable to create an img tag in HTML
                let myImg = document.createElement("img");
                // indicate the source of the imgae starting from its root
                myImg.src = "sokobanPack/wall.png";
                //attach the image into the cell
                tData.appendChild(myImg);
            }
            //o means floor
            if(anArray[i][j] === "o") {
                let myImg = document.createElement("img");
                myImg.src = "sokobanPack/floor.png";
                tData.appendChild(myImg);
            }
            //# means goal
            if(anArray[i][j] === "#") {
                let myImg = document.createElement("img");
                myImg.src = "sokobanPack/goal.png";
                tData.appendChild(myImg);
            }
            //* means boc
            if(anArray[i][j] === "*") {
                let myImg = document.createElement("img");
                myImg.src = "sokobanPack/box.png";
                tData.appendChild(myImg);
            }
            //& means player
            if (anArray[i][j] === "&"){
                let myImg = document.createElement("img");
                myImg.src = "sokobanPack/player.png";
                tData.appendChild(myImg);
            }
            //Append the table cell to the table row
            tRow.appendChild(tData);
        }
        //append table row to the table
        table.appendChild(tRow);
    }

    // append the table to the container
    container.appendChild(table);
}
//indicate winning position
function playerWin(){
    //if player or goal symbol on goal1
    if (firstLevel[goal1PosI][goal1PosJ] == "#" || firstLevel[goal1PosI][goal1PosJ] == "&"){
        //no action
        return false;
        //if player or goal symbol on goal2
    } else if (firstLevel[goal2PosI][goal2PosJ] == "#" || firstLevel[goal2PosI][goal2PosJ] == "&") {
        //no action
        return false;
        //if player or goal symbol on goal3
    } else if (firstLevel[goal3PosI][goal3PosJ] == "#" || firstLevel[goal3PosI][goal3PosJ] == "&") {
        //no action
        return false;
        //if non of the above
    } else {
        //valid action
        return true;
    }
}

document.onkeydown = function (event) {
    //moving the player using the keyboard arrows
    if (event.keyCode == 39) {  // right arrow
        moveRight();
    }
    if (event.keyCode == 37) {  // left arrow
        moveLeft();
    }
    if (event.keyCode == 38) {  // up arrow
        moveUp();
    }
    if (event.keyCode == 40) {  // down arrow
        moveDown();
    }
    //call the function to indicate valid and non valid goal
    if (playerWin()) {
        playerPosI = 1;
        playerPosJ = 1;
        // setting a function to wait a second before informing that the player won!
        setTimeout(function () {7
            //congratulate the player using his name entered in the html
            var enterUsName = document.getElementById("userName").value;
            alert("Congratulation " + enterUsName + "! You won!");
            //reloading the page once the player won the game
            location.reload();
        }, 1000);
    }
}
//indicate that the player is on the goal
function isOverGoal(pI, pJ){
    //define player position on goal1
    if (goal1PosI == pI && goal1PosJ == pJ){
        return true;
        // define player position on goal2
    } else if (goal2PosI == pI && goal2PosJ == pJ){
        return true;
      //  define player position on goal 3
    } else if (goal3PosI == pI && goal3PosJ == pJ){
        return true;
        // if not than do not consider other option
    } else {
        return false;
    }
}
//navigaqting the player/boxes on the board when the player is moving right
function moveRight() {
    //if the player moves from the initial position horizontally and faces a wall
    if (firstLevel[playerPosI][playerPosJ + 1] == "x") {
        //prevent the player from moving; retutn the player
        return;
    }
    //if the player moves from the initial position horizontally and faces a box
    if (firstLevel[playerPosI][playerPosJ + 1] == "*") {
        //when moving a box and the second consecutive position after the player moves the box
        //when the position is not the wall and not a box
        if (firstLevel[playerPosI][playerPosJ + 2] != "x" && firstLevel[playerPosI][playerPosJ + 2] != "*") {
            //when on the goal position
            if (isOverGoal(playerPosI, playerPosJ) == true) {
                //update to goal point symbol
                firstLevel[playerPosI][playerPosJ] = "#";
            } else {
                //update to floor symbol
                firstLevel[playerPosI][playerPosJ] = "o";
            }
            //vertical position of the player remains the same
            playerPosI = playerPosI;
            //horizonatl chaqnges one step at the time
            playerPosJ = playerPosJ + 1;
            //position of the player
            firstLevel[playerPosI][playerPosJ] = "&";
            // player moves together with box
            firstLevel[playerPosI][playerPosJ + 1] = "*";
        }
    } else {
        //if player is on the goal position changed the symbol to player
        if (isOverGoal(playerPosI, playerPosJ) == true){
            firstLevel[playerPosI][playerPosJ] = "#";
        } else {
            //if not a player change to floor symbol
            firstLevel[playerPosI][playerPosJ] = "o";
        }
        //when the player is moving right
        //vertical position remain the same
        playerPosI = playerPosI;
        // when moving horizontally add one to indicate that
        playerPosJ = playerPosJ + 1;
        //assign the symbol for the player
        firstLevel[playerPosI][playerPosJ] = "&";
    }
    printArrayHTML(firstLevel);
}
//navigaqting the player/boxes on the board when the player is moving to the left
function moveLeft() {
    ////if the player moves from the initial position horizontally to the left and faces a wall
    if (firstLevel[playerPosI][playerPosJ - 1] == "x") {
        //do not let the player to do so
        return;
    }
    //if the player moves from the initial position horizontally to the left and faces a box
    if (firstLevel[playerPosI][playerPosJ - 1] == "*") {
        //when moving a box and the second consecutive position after the player moves the box
        //when the position is not the wall and not a box
        if (firstLevel[playerPosI][playerPosJ - 2] != "x" && firstLevel[playerPosI][playerPosJ - 2] != "*") {
            //when on the goal
            if (isOverGoal(playerPosI, playerPosJ) == true) {
                //update to player point symbol
                firstLevel[playerPosI][playerPosJ] = "#";
            } else {
                //update to floor symbol
                firstLevel[playerPosI][playerPosJ] = "o";
            }
            //vertical position of the player remains the same
            playerPosI = playerPosI;
            //horizontal goes back one step -> meaning to the left
            playerPosJ = playerPosJ - 1;
            //player
            firstLevel[playerPosI][playerPosJ] = "&";
            //the box moves with the player
            firstLevel[playerPosI][playerPosJ - 1] = "*";
        }
    } else {
        //if player is on the goal position
        if(isOverGoal(playerPosI, playerPosJ) == true) {
            //change the symbol to player
            firstLevel[playerPosI][playerPosJ] = "#";
        } else {
            //update to floor
            firstLevel[playerPosI][playerPosJ] = "o";
        }
        //player moves to the left
        //vertical position remains the same
        playerPosI = playerPosI;
        //horizontal position is signified by extracting one to indicate moving to the left
        playerPosJ = playerPosJ - 1;
        //indicate the moving symbol
        firstLevel[playerPosI][playerPosJ] = "&";
    }
    printArrayHTML(firstLevel);
}
//navigaqting the player/boxes on the board when the player is moving up
function moveUp(){
    //the vertical position of the player changes by extracting 1 position
    //what happens when moving up and the player faces the wall
    if (firstLevel[playerPosI - 1][playerPosJ] == "x") {
        //do not allow this movement
        return;
    }
    //if the player moves up and faces the box
    if (firstLevel[playerPosI - 1][playerPosJ] == "*") {
        //when moving a box and the second consecutive position after the player moves the box
        //when the position is not the wall and not a box
        if (firstLevel[playerPosI - 2][playerPosJ] != "x" && firstLevel[playerPosI - 2][playerPosJ] != "*") {
            //allow movement
            if (isOverGoal(playerPosI, playerPosJ) == true) {
                //update to player symbol
                firstLevel[playerPosI][playerPosJ] = "#";
            } else {
                //update to floor symbol
                firstLevel[playerPosI][playerPosJ] = "o";
            }
            //player moves up -> horizontal position is changing -> moving up with the box
            playerPosI = playerPosI -1;
            //vertical remains the same
            playerPosJ = playerPosJ;
            //player
            firstLevel[playerPosI][playerPosJ] = "&";
            //the box is above the player
            firstLevel[playerPosI - 1][playerPosJ] = "*";
        }
    } else {
        //if player is on the goal position
        if (isOverGoal(playerPosI, playerPosJ) == true) {
            //update the symbol to player
            firstLevel[playerPosI][playerPosJ] = "#";
        } else {
            //update the symbol to floor
            firstLevel[playerPosI][playerPosJ] = "o";
        }
        //player movement when moving up
        //change horizontal position
        playerPosI = playerPosI -1;
        //vertical position remains the same
        playerPosJ = playerPosJ;
        //indicate the symbol of the player
        firstLevel[playerPosI][playerPosJ] = "&";
    }
    printArrayHTML(firstLevel);
}
//navigaqting the player/boxes on the board when the player is moving down
function moveDown(){
    //the vertical position of the player changes by adding 1 position
    //what happens when moving up and the player faces the wall
    if (firstLevel[playerPosI + 1][playerPosJ] == "x") {
        //do not allow to go down
        return;
    }
    //if the player moves up and faces the box
    if (firstLevel[playerPosI + 1][playerPosJ] == "*") {
        //when moving a box and the second consecutive position after the player moves the box
        //when the position is not the wall and not a box
        if (firstLevel[playerPosI + 2][playerPosJ] != "x" && firstLevel[playerPosI + 2][playerPosJ] != "*") {
            //allow movement
            if (isOverGoal(playerPosI, playerPosJ) == true) {
                //update to player symbol
                firstLevel[playerPosI][playerPosJ] = "#";
            } else {
                //update to floor symbol
                firstLevel[playerPosI][playerPosJ] = "o";
            }
            //player moves down -> horizontal position is changing -> moving up with the box
            playerPosI = playerPosI + 1;
            //no chane in vertical position
            playerPosJ = playerPosJ;
            //indicate the player symbol
            firstLevel[playerPosI][playerPosJ] = "&";
            //and the box position above the player
            firstLevel[playerPosI + 1][playerPosJ] = "*";
        }
    } else {
        //if player is on the goal position
        if (isOverGoal(playerPosI, playerPosJ) == true) {
            //update to player symbol
            firstLevel[playerPosI][playerPosJ] = "#";
        } else {
            //update to floor symbol
            firstLevel[playerPosI][playerPosJ] = "o";
        }
        //position of the player when moving down
        playerPosI = playerPosI + 1;
        playerPosJ = playerPosJ;
        //indicate player symbol
        firstLevel[playerPosI][playerPosJ] = "&";
    }
    printArrayHTML(firstLevel);
}

printArrayHTML(firstLevel);
