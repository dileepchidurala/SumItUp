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
    // button.disabled = true;
    // button.style.backgroundColor = "lightgrey"
    document.getElementById("temp").innerHTML = button.innerHTML
}

function disable_btn(num){
    var grid_elem = document.getElementById("game_id").children;
    for(var idx = 0; idx<grid_elem.length; idx++){
        if(grid_elem[idx].innerHTML == num){
            grid_elem[idx].disabled = true;
            grid_elem[idx].style.backgroundColor = "lightgrey"
        }
    }
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



class CreateLayout{
    constructor(target_score, target_time, player_1_name, player_2_name, player_timer, grid_rows, grid_cols){
        this.target_score = target_score
        this.target_time = target_time
        this.player_1_name = player_1_name.toUpperCase()
        this.player_2_name = player_2_name.toUpperCase()
        this.player_timmer = player_timer
        this.grid_rows = grid_rows
        this.grid_cols = grid_cols
    }

    create_layout(){
        this.create_score_and_timmer_section("target", this.target_score, this.target_time)
        this.create_player(1, this.player_1_name, 0, this.player_timmer)
        this.create_player(2, this.player_2_name, 0, this.player_timmer)
        this.create_grid(this.grid_rows, this.grid_cols)
    }

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


class Clock{
    constructor(element_id, secs){
        this.elem = document.getElementById(element_id + "_timmer")
        this.secs = secs
        this.set_timmer()
    }

    set_timmer(){
        this.elem.innerHTML = this.secs
    }

    run_down_clock(clock_obj){
        clock_obj.set_timmer();
        var intv = setInterval(clock_obj.dec_timmer, 1000, clock_obj.elem);
        setTimeout(() => {
            clearInterval(intv);
        }, clock_obj.secs*1000)
    }

    dec_timmer(elem){
        elem.innerHTML = parseInt(elem.innerHTML) - 1;
    }
}

class Player extends Clock{
    constructor(player_num, player_intv){
        super("player_" + player_num, player_intv)
        this.player = "player_" + player_num
        this.player_intv = player_intv
        this.player_score = document.getElementById(this.player + "_score")
        this.timmer = document.getElementById(this.player + "_timmer")
    }

    update_score(player_obj){
        var add_value = document.getElementById("temp").innerHTML
        disable_btn(add_value)
        player_obj.player_score.innerHTML =  parseInt(player_obj.player_score.innerHTML)+ parseInt(add_value)
        document.getElementById("temp").innerHTML = 0
    }
}

class Game{
    constructor(total_time, player_time, target_score){
        this.total_time = total_time
        this.player_time = player_time
        this.target_score = target_score
    }
    
    create_engine(){
        var ply_1_name = window.prompt("Enter player 1's name:") || "player_1"
        var ply_2_name = window.prompt("Enter player 2's name:") || "player_2"
        var create_layout_obj = new CreateLayout(this.target_score, this.total_time, ply_1_name, ply_2_name, this.player_time, 7, 7)
        create_layout_obj.create_layout()
        return this
    }

    start_game_loop(){
        var  player_queue = [new Player(1, this.player_time), new Player(2, this.player_time)]
        var target_clock = new Clock("target", this.total_time)
        target_clock.run_down_clock(target_clock)
        var player = player_queue.shift()
        player.run_down_clock(player)
        var intv_obj = setInterval(() => {
            player.update_score(player)
            player_queue.push(player)
            player = player_queue.shift()
            player.run_down_clock(player)
        }, this.player_time*1000)
        setTimeout(() =>{
            clearInterval(intv_obj)
            this.judge_game()
        }, this.total_time*1000)
    }

    judge_game(){
        var sc1 = parseInt(document.getElementById("player_1_score").innerHTML)
        var sc2 = parseInt(document.getElementById("player_2_score").innerHTML)
        var trg = parseInt(document.getElementById("target_score").innerHTML)
        var player_1 = document.getElementById("player_1").innerHTML
        var player_2 = document.getElementById("player_2").innerHTML
        if(sc1 > trg && sc2 > trg || sc1 == sc2){
            alert("No one Wins")
        }
        else if(sc1==trg || sc2 > trg){
            alert(player_1 + " wins")
        }
        else if(sc2==trg || sc1 > trg){
            alert(player_2 + " wins")        
        }
        else{
            if(trg-sc1 < trg - sc2){
                alert(player_1 + " wins")
            }
            else{
                alert(player_2 + " wins") 
            }
        }
        location.reload()
    }
}

game  = new Game(30, 5, 60)
game.create_engine().start_game_loop()
// clock = new Clock("target", 30)
// var test = document.createElement("button")
// test.innerHTML = "test"
// test.setAttribute("onClick", "clock.run_down_clock()")
// document.body.appendChild(test)

