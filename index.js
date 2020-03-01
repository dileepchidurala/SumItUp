function fill_grid(){
    nums = shuffleArray([1,2,3,4,5,6,7,8,9,10,11,12])
    for(var i=0; i<12; i++){
        if(nums[i] < 10){
            document.getElementById(""+i).innerHTML="0"+nums[i];
        }
        else{
            document.getElementById(""+i).innerHTML=nums[i];
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

var player_1 = true;
var player_2 = false;
count = 0

function game(){
    var value = parseInt(document.getElementById("temp").innerHTML)
    console.log(value)
    document.getElementById("temp").innerHTML = 0
    if(player_1){
        document.getElementById("score_1").innerHTML =  parseInt(document.getElementById("score_1").innerHTML) + value
        player_1=false
        player_2=true
        document.getElementById("player_turns").innerHTML = "Player'2 turn"
    }
    else{
        document.getElementById("score_2").innerHTML = parseInt(document.getElementById("score_2").innerHTML) + value
        player_2=false
        player_1=true
        document.getElementById("player_turns").innerHTML = "Player'1 turn"
    }
    count += 1
    if(count==6){
        judge_game()
    }
}

function judge_game(){
    sc1 = parseInt(document.getElementById("score_1").innerHTML)
    sc2 = parseInt(document.getElementById("score_2").innerHTML)
    trg = parseInt(document.getElementById("target_score").innerHTML)
    if(sc1==trg || sc2 > trg){
        console.log("Player 1 wins")
    }
    else if(sc2==trg || sc1 > trg){
        console.log("Player 2 wins")        
    }
    else{
        if(trg-sc1 < trg - sc2){
            console.log("Player 1 wins")
        }
        else{
            console.log("Player 2 wins") 
        }
    }
    clearInterval(intv)
    clearInterval(timmer_intv)
}

function click_btn(id){
    var button = document.getElementById(id)
    button.disabled = true;
    button.style.backgroundColor = "lightgrey"
    document.getElementById("temp").innerHTML = button.innerHTML
}

function timmer(){
    var secs = parseInt(document.getElementById("timer").innerHTML)
    if(secs == 0){
        secs = 5
    }
    document.getElementById("timer").innerHTML =  secs - 1
}

fill_grid()
const intv = setInterval(game, 5000)
const timmer_intv = setInterval(timmer, 1000)
