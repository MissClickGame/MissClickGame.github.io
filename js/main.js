var score = 0;
var currentSelected = 0;

var isGameState = false;

var UP = 0; 
var RIGHT = 1;
var DOWN = 2;
var LEFT = 3;

var directions = ["up","right","down","left"];

var numDirections = 4;
var directionArr = new Array(numDirections);

function direction(){
    this.blink;//blink color
    this.blank;//blank color
    this.regular;//regular arrow
    this.opposite;//opposite arrow
}


//border arrow color
var colorArr = ["#ADFF49","pink","#CEC21E","#A5FFF4"];
var colorIdx = 0;

changeImgELE = document.getElementById("changeImg");
outputELE = document.getElementById("score");
butELE = document.getElementById("but");

//User input time
var timeOut;

function loadNextImg(){
    changeImgELE.setAttribute("class","loadIn");
    currentSelected = parseInt(Math.random()*(numDirections*2));
    console.log(currentSelected);
    if(currentSelected<numDirections)
        changeImgELE.src = directionArr[currentSelected].regular;
    else
        changeImgELE.src = directionArr[currentSelected%numDirections].opposite;
    setTimeout(function(){
        // timeout to lose
        timeOut = setTimeout(loseGame,1000);
        changeImgELE.setAttribute("class","fadeOut");
        outputELE.innerHTML = "Score: " + score; 
    },300);
}

function blink(which){
    clearTimeout(timeOut);
    changeImgELE.setAttribute("class","");
    var tempELE = document.getElementById(directions[which])
    tempELE.src = directionArr[which].blink;
    if(which == currentSelected%numDirections){
        setTimeout(function(){tempELE.src = directionArr[which].blank;loadNextImg();},500);
        score++;
    }
    else
        loseGame();
}

function loadGame(){
    score = 0;
    currentSelected = 0;
    isGameState = true;
    for(var i = 0;i<numDirections;i++){
        directionArr[i] = new direction();
        directionArr[i].blink = "images/blink"+directions[i]+".png";
        directionArr[i].blank = "images/"+directions[i]+".png";
        directionArr[i].regular = "images/regular"+directions[i]+".png";
        directionArr[i].opposite = "images/opposite"+directions[(i+2)%numDirections]+".png";
        document.getElementById(directions[i]).src = directionArr[i].blank;
    }
    butELE.style.visibility = "hidden";
    butELE.innerHTML = "Press Enter <br/> to Play Again";
    outputELE.innerHTML = "Score: " + score;
    setTimeout(function(){loadNextImg();},750);
}

function loseGame(){
    isGameState = false;   
    console.log("lost")
    outputELE.innerHTML = "Game Over <br/> Final Score: " + score;
    butELE.style.visibility = "visible";
}

window.onkeydown = function (e) {
    var code = e.which || e.keyCode;
    if(!isGameState){
        if(code == 13)
            loadGame();
        return
    }
    console.log(code);
    if(code == 119 || code == 87 || code == 38) //w W 
        blink(UP);
    else    
        if(code == 97 || code == 65 || code == 37) //a A  
            blink(LEFT);
        else    
            if(code == 115 || code == 83 || code == 40) //s S  
                blink(DOWN);
            else
                if(code == 100 || code == 68 || code == 39) //d D
                    blink(RIGHT);
                else
                    return
}