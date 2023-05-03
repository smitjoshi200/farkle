var diceArr = [];
let points = 0;
let playerOneId;
let playerTwoId;
let curPlayer;


function setPlayer() {
	if (curPlayer == "1") {
		curPlayer = playerTwoId.dataset.player;
		playerTwoId.classList.add("active");
		playerOneId.classList.remove("active");
	}
	else {
		curPlayer = playerOneId.dataset.player;
		playerOneId.classList.add("active");
		playerTwoId.classList.remove("active");
	}
}

function initializeDice() {
	playerOneId = document.getElementById("playerOne");
	playerTwoId = document.getElementById("playerTwo");
	curPlayer = playerOneId.dataset.player;
	for (i = 0; i < 6; i++) {
		diceArr[i] = {};
		diceArr[i].id = "die" + (i + 1);
		diceArr[i].value = i + 1;
		diceArr[i].clicked = 0;
	}
	setPlayer();
}

/*Rolling dice values*/
function rollDice() {
	for (var i = 0; i < 6; i++) {
		if (diceArr[i].clicked === 0) {
			diceArr[i].value = Math.floor((Math.random() * 6) + 1);
			console.log(diceArr[i].value);
		}
	}
	checkForPoints(diceArr);
	updateDiceImg();
}

/*Updating images of dice given values of rollDice*/
function updateDiceImg() {
	var diceImage;
	for (var i = 0; i < 6; i++) {
		diceImage = "images/" + (i + 1) + ".png";
		document.getElementById(diceArr[i].id).setAttribute("src", diceImage);
	}
}

function diceClick(img) {
	var i = img.getAttribute("data-number");

	img.classList.toggle("transparent");
	if (diceArr[i].clicked === 0) {
		diceArr[i].clicked == 1;
	}
	else {
		diceArr[i].clicked == 0;
	}

}

function checkForPoints(diceObj) {
	oneCount = 0;
	twoCount = 0;
	threeCount = 0;
	fourCount = 0;
	fiveCount = 0;
	sixCount = 0;
	hasThreeOfAKind = false;
	//Loop through diceObj and check for points
	for (value in diceObj) {
		switch (diceObj[value].value) {
			// check for 1
			case 1:
				oneCount++;
				if (oneCount === 3) {
					hasThreeOfAKind = true;
					points += 1000;
					oneCount = 0;
					break;
				}
				else {
					points += 100;
					break;
				}
			// check for 2
			case 2:
				twoCount++;
				if (twoCount === 3) {
					hasThreeOfAKind = true;
					points += 200;
					twoCount = 0;
					break;
				}
				else {
					points += 0;
					break;
				}
			// check for 3
			case 3:
				threeCount++;
				if (threeCount === 3) {
					hasThreeOfAKind = true;
					points += 300;
					threeCount = 0;
					break;
				}
				else {
					points += 0;
					break;
				}
			// check for 4
			case 4:
				fourCount++;
				if (fourCount === 3) {
					hasThreeOfAKind = true;
					points += 400;
					break;
				}
				else {
					points += 0;
					break;
				}
			// check for 5
			case 5:
				fiveCount++;
				if (fiveCount === 3) {
					hasThreeOfAKind = true;
					points += 500;
					fiveCount = 0;
					break;
				}
				else {
					points += 50;
					break;
				}
			// check for 6
			case 6:
				sixCount++;
				if (sixCount === 3) {
					hasThreeOfAKind = true;
					points += 600;
					break;
				}
				else {
					points += 0;
					break;
				}
		}
		scoreDiv = document.getElementById("scoreboard");
		scoreDiv.innerHTML = points;
	}

}

function bankScore() {
	if (curPlayer == "1") {
		let playerOneScore = document.getElementById("playerOneScore");
		playerOneScore.innerHTML = parseInt(playerOneScore.innerHTML) + points;
	}
	else {
		let playerTwoScore = document.getElementById("playerTwoScore");
		playerTwoScore.innerHTML = parseInt(playerTwoScore.innerHTML) + points;
	}
	points = 0;
	scoreDiv = document.getElementById("scoreboard");
	scoreDiv.innerHTML = points;
	setPlayer();
}