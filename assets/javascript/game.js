$(document).ready(function() {
    /*declare our variables*/
    var kids = ["bart", "jimbo", "milhouse", "nelson"] //names of the players
    var healthArr = [120,150,100,180]; // health of the players must be in same order as names
    var attackArr = [8,12,10,9]; // attack of the players must be in same order as names
    var counterAttackArr = [11,15,8,20]; // counter attack of the players must be in same order as names
    var classStr = "";
    var defeated = false;
    /*objbect of the fight, holds an array of player objects*/
    var fight ={
        fighter: [],
        init:function(){
            for(var i=0; i< kids.length; i++){
                var characters = {
                    //character objects
                    name: kids[i],
                    selected: false, //true when selected as players character
                    health: healthArr[i],
                    attacks: 0,
                    counterAttack: counterAttackArr[i],
                    fighting: false, //set to true when choosen as current counter attacker
                    defeated: false, //used when fighter is done
                    done: false, //used when fighter has lost
                };
                /*characters.name = kids[i];*/
                //set up the array in the fight object
                fight.fighter.push(characters);
                
                //display the kids current health value
                var tag = "#"+kids[i]+"Health";
                var str = this.fighter[i].health; 
                this.display(tag, str);
                /*$().text(this.fighter[i].health);*/
            }
        },
        //function to return truen when a fighter is selected
        selectedChosen:function(){
            var chosen = false;
            for(i=0; i<kids.length; i++){
                chosen = chosen || fight.fighter[i].selected;
            }
            return chosen;
        },

        //function returns true when an enemy is choosen
        fighterChosen:function(){
            var bool = false;
            for(i=0; i<kids.length; i++){
                bool = bool || fight.fighter[i].fighting;    
            }
            return bool;
        },

        //returns the index value of the selected kid
        //if no kid is slected return null
        getSelected:function(){
            for(var i=0; i<fight.fighter.length; i++){
                if(fight.fighter[i].selected){
                    return(fight.fighter[i].name);
                }else{
                    return("");
                }
            }
        },

        //returns the index value of the kid currently fighting
        //if no kid is slected return null        
        getFighter:function(){
            for(var i=0; i<fight.fighter.length; i++){
                if(fight.fighter[i].fighting){
                    return(fight.fighter[i].name);
                }else{
                    return("");
                }
            }
        },

        //function to carry out the battle when attck is clicked
        attack:function(){
            var selectedPosi = 0;
            var fighterPosi = 0;
            var damage = 0;
            for(var i=0; i<kids.length; i++){
                //find selected kid index
                if(this.fighter[i].selected){
                    selectedPosi = i;
                }
                //find fighter kid index
                if(this.fighter[i].fighting){
                    fighterPosi = i;
                }
            }
            /*attack the defender taks attacks * power and subtract from health*/
            this.fighter[selectedPosi].attacks++;
            damage =  (this.fighter[selectedPosi].attacks * attackArr[selectedPosi]);
            this.fighter[fighterPosi].health = this.fighter[fighterPosi].health - damage;
            //check for a win
            if(this.fighter[fighterPosi].health <= 0){
                this.fighter[fighterPosi].done = true;
                this.winner(fighterPosi, selectedPosi);
            }else{
                /* Counter attack*/
                this.fighter[selectedPosi].health = this.fighter[selectedPosi].health - this.fighter[fighterPosi].counterAttack;
                this.displayResults(damage, selectedPosi, fighterPosi);
                //check for a loss
                if(this.fighter[selectedPosi].health <=0){
                    
                    /*if(this.fightDone(selectedPosi)){*/
                        this.loser();
                    /*}*/
                }
            }
        },
        //displays results of the fight by update player card health values
        displayResults:function(damage, selectedPosi, fighterPosi){
            var displayTag = "";
            var displayStr = "";

            //update fighter kid's health
            displayTag = "#" + kids[fighterPosi] + "Health";
            this.display(displayTag,this.fighter[fighterPosi].health);

            //update selected kid headlines
            displayTag = "#" + kids[selectedPosi] + "Health";
            this.display(displayTag,this.fighter[selectedPosi].health);

            //display the results of the attack
            displayTag = "#result1";
            displayStr = "You attacked " + capitalize(kids[fighterPosi]) + " for " + damage + " damage";
            this.display(displayTag, displayStr); 

            displayTag = "#result2";
            displayStr = capitalize(kids[fighterPosi]) + " attacked you back for " + counterAttackArr[fighterPosi] + " damage";
            this.display(displayTag, displayStr); 
        },
        //generic function to update text on the screen
        display:function(tag, str){
            $(tag).text(str);
        },
        //function to update screen when the player looses
        loser:function(){
            defeated = true;
            //display reset button
            $("#reset").addClass("resetOn"); 
            $("#reset").removeClass("reset");
            //inform user of the loss
            this.display("#result1", "You have been defeated!!! Game Over.");
            this.display("#result2", "");
            //display loser pop-up
            $("#loser").removeClass("reset");
        },

        //function to update screen when the player wins
        winner:function(fighterPosi, selectedPosi){
            //tell user current enemy has been defeated
            this.display("#result1", "You have defeated " + capitalize(kids[fighterPosi]) + " you can choose to fight another enemy");
            this.display("#result2", "")
            /*$("." + kids[fighterPosi]).remove();*/

            //call function to handle the player card that has been defeated by the player
            this.resetFighter(kids[fighterPosi]);
            //turn off fighter flag
            this.fighter[fighterPosi].fighting = false;

            //check to see if player has won the fight
            if(this.fightDone(selectedPosi)){
                //inform player of the win
                this.display("#result1","You Won!!! Game Over")
                //turn on reset button
                $("#reset").addClass("resetOn");
                $("#reset").removeClass("reset");    
                //display the winner splash screen
                $("#winner").removeClass("reset");
            }
        },
        //for the fight to be done all the non selected players shouls be defeated
        fightDone:function(selectedPosi){
            var bool = true;
            for(var i=0; i<this.fighter.length;i++){
                if(i != selectedPosi){
                    bool = bool && this.fighter[i].done;
                }
            }
            return bool;
        },
        //reset the player cards after the game
        resetFighter(name){
            var tag = "." + name;
            //turn player card back into the beginging formatting
            $(tag).removeClass("fighter");
            $(tag).removeClass("notSelected");
            //put all the player cards in the invisible defeated tag so we know where they are
            $(".defeated").append($(tag));
            
            //get rid of the splash screen
            $("#winner").addClass("reset")
            $("#loser").addClass("reset");
        }
    }

    //remove all the character objects from the aarray in the fight object
    //only call when resetting the game
    function clearFighter(){
        for(var i=0; i<kids.length; i++){
            fight.fighter.pop();
        }
    };

    //reset the player cards on the screen to the opening state to restart the game
    function resetImages(){
        var tag = "";
        //put player cards in the starting spot
        for(var i=0; i<kids.length; i++){
            fight.resetFighter(kids[i]);
            tag = "." + kids[i];
            $(".fighters").append($(tag));
        }
        //format screen to opening state
        $(".fighters").css("Height","132");
        $("#enemy").removeClass("enemyLarge").addClass("enemy");
        $("#defender").removeClass("defenderLarge");
        
    };

    //function that will capitalize the first character in a string
    function capitalize(text){
        return(text.charAt(0).toUpperCase() + text.slice(1));
    }

    //attack button listener
    $("#attack").on("click", function(){
        //when i do an active fight attack
        if(!defeated){
            //check for an enemy before attacking
            if(fight.fighterChosen()){
                fight.attack();
            }
            //display message if there is no enemy to fight
            else{
                fight.display("#result1", "No enemy here. Pick a new enemy.");    
            }
        }
    });

    //listner for rest button
    $(".reset").on("click", function(){
        //reset the game
        clearFighter(); //remove all the character objects from the fight object array
        fight.init(); //initialize the game
        resetImages(); // set up the images on the screen
        defeated=false; // turn flag to say we are ready to play
        fight.display("#result1",""); //clear display

        //turn off reset button
        $(".resetOn").addClass("reset");
        $(".resetOn").removeClass("resetOn");
    });

    //event handler for when a player ic clicked
    $(".picHolder").on("click", function(){
        var clicked = $(this).attr("value");
        
        if(!fight.selectedChosen()){
            //the player choose their character
            for(var i=0; i < kids.length; i++){
                if(clicked != kids[i]){
                    classStr = "."+ kids[i];
                    //format and move non selected characters to enemy section
                    $("#enemy").removeClass("enemy");
                    $("#enemy").addClass("enemyLarge");    
                    $(classStr).addClass("notSelected");
                    $("#enemyHolder").append($(classStr));
                    $(".fighters").css("height","0px");
                }else{
                    //set selected flag
                    fight.fighter[i].selected = true;
                }
            }
            //format selected character
            classStr = "."+ clicked;
            $(classStr).addClass("selected")
            $("#selectedHolder").append($(classStr));
        }else if(!fight.fighterChosen()){
            //if a click happens and we already have selected a character
            //then we are selecting an enemy to fight
            if(fight.getSelected() != clicked){
                classStr = "." + clicked;
                //format and move enemy
                $("#defender").addClass("defenderLarge");
                $(classStr).removeClass("notSelected");
                $(classStr).addClass("fighter");
                $("#defender").append($(classStr));
                if($("#enemyHolder").is(":empty")){
                    $("#enemy").removeClass("enemyLarge");
                    $("#enemy").addClass("enemy");
                }
                //set active fighter flag
                for(var i=0; i<fight.fighter.length;i++){
                    if(fight.fighter[i].name == clicked){
                    fight.fighter[i].fighting = true;
                    }
                }
            }
        }
   });
   //start the game
    fight.init();
});