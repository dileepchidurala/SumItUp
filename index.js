// function fill_grid(){
//     nums = shuffleArray([1,2,3,4,5,6,7,8,9,10,11,12])
//     for(var i=0; i<12; i++){
//         if(nums[i] < 10){
//             document.getElementById(""+i).innerHTML="0"+nums[i];
//         }
//         else{
//             document.getElementById(""+i).innerHTML=nums[i];
//         }
//     }
// }

// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array
// }

// var player_1 = true;
// var player_2 = false;
// count = 0

// function game(){
//     var value = parseInt(document.getElementById("temp").innerHTML)
//     console.log(value)
//     document.getElementById("temp").innerHTML = 0
//     if(player_1){
//         document.getElementById("score_1").innerHTML =  parseInt(document.getElementById("score_1").innerHTML) + value
//         player_1=false
//         player_2=true
//         document.getElementById("player_turns").innerHTML = "Player'2 turn"
//     }
//     else{
//         document.getElementById("score_2").innerHTML = parseInt(document.getElementById("score_2").innerHTML) + value
//         player_2=false
//         player_1=true
//         document.getElementById("player_turns").innerHTML = "Player'1 turn"
//     }
//     count += 1
//     if(count==6){
//         judge_game()
//     }
// }

// function judge_game(){
//     sc1 = parseInt(document.getElementById("score_1").innerHTML)
//     sc2 = parseInt(document.getElementById("score_2").innerHTML)
//     trg = parseInt(document.getElementById("target_score").innerHTML)
//     if(sc1==trg || sc2 > trg){
//         console.log("Player 1 wins")
//     }
//     else if(sc2==trg || sc1 > trg){
//         console.log("Player 2 wins")        
//     }
//     else{
//         if(trg-sc1 < trg - sc2){
//             console.log("Player 1 wins")
//         }
//         else{
//             console.log("Player 2 wins") 
//         }
//     }
//     clearInterval(intv)
//     clearInterval(timmer_intv)
// }

function click_btn(id){
    var button = document.getElementById(id)
    button.disabled = true;
    button.style.backgroundColor = "lightgrey"
    document.getElementById("temp").innerHTML = button.innerHTML
}

// function timmer(){
//     var secs = parseInt(document.getElementById("timer").innerHTML)
//     if(secs == 0){
//         secs = 5
//     }
//     document.getElementById("timer").innerHTML =  secs - 1
// }

// fill_grid()
// const intv = setInterval(game, 5000)
// const timmer_intv = setInterval(timmer, 1000)



class Game{
    constructor(player_1_name, player_2_name){
        this.player_1 = player_1_name
        this.player_2 = player_2_name
    }
    create_grid(){

    }

    create_target(){

    }

    fill_players(){

    }

    start_game(){

    }

    judge_game(){

    }
}

class CreateLayout{

    create_score_and_timmer_section(section, score, timmer_value){
        document.getElementById(section + "_score").innerHTML = score
        document.getElementById(section + "_timmer").innerHTML = timmer_value
        return this
    }

    create_player(player_num, player_name, player_score, timmer_value){
        document.getElementById("player_"+player_num).innerHTML = player_name
        return this.create_score_and_timmer_section("player_"+player_num, player_score, timmer_value)
    }

    shuffle_array(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    create_grid(rows, cols){
        var grid_values = this.shuffle_array([ ...Array(rows*cols).keys() ].map( i => i+1));
        for(var i = 0; i< rows*cols; i++){
                var button = document.createElement("button")
                button.id = ""+i
                button.innerHTML = grid_values[i]
                button.className = "grid_item"
                button.setAttribute("onClick", "click_btn(this.id)")
                document.getElementById("game_id").appendChild(button)
        }
    }
}

create_layout = new CreateLayout()
create_layout.create_score_and_timmer_section("target", 30, 60).create_player(1, "dileep", 0, 5).create_player(2, "manikath", 0, 5).create_grid(7, 7)

class Clock{
    constructor(element_id, secs){
        this.elem = document.getElementById(element_id + "_timmer")
        this.secs = secs
        this.intv = none
        this.set_timmer()
    }

    set_timmer(){
        this.elem.innerHTML = this.secs
    }

    run_down_clock(){
        this.intv = setInterval(this.dec_timmer, 1000);
    }

    dec_timmer(intv_obj){
        if (this.elem.innerHTML == 0){
            clearInterval(this.intv_obj)
            this.intv = none
        }
        else{
            this.elem.innerHTML = parseInt(this.elem.innerHTML) - 1
        }
    }
}

class Player extends Clock{
    constructor(player_id, name){
        this.player_id = player_id
        this.name = name
        this.score = document.getElementById(this.player_id + "_score")
        this.timmer = document.getElementById(this.player_id + "_timmer")
        this.set_name()
    }

    set_name(){
        document.getElementById(this.player_id).innerHTML = this.name
    }

    set_score(scored){
        this.score.innerHTML = parseInt(this.score.innerHTML) + scored
    }
}