$(document).ready(function() {
    var kids = ["bart", "jimbo", "milhouse", "nelson"]
    var healthArr = [120,150,100,180];
    var attackArr = [8,12,15,9];
    var counterAttackArr = [9,18,8,13];
    var classStr = "";
    var defeated = false;
    var fight ={
        fighter: [],
        init:function(){
            for(var i=0; i< kids.length; i++){
                var characters = {
                    name: kids[i],
                    selected: false,
                    health: healthArr[i],
                    attacks: 0,
                    counterAttack: counterAttackArr[i],
                    fighting: false,
                };
                /*characters.name = kids[i];*/
                fight.fighter.push(characters);
                var tag = "#"+kids[i]+"Health";
                var str = this.fighter[i].health; 
                this.display(tag, str);
                /*$().text(this.fighter[i].health);*/
            }
        },
        selectedChosen:function(){
            var chosen = false;
            for(i=0; i<kids.length; i++){
                chosen = chosen || fight.fighter[i].selected;
            }
            return chosen;
        },
        fighterChosen:function(){
            var bool = false;
            for(i=0; i<kids.length; i++){
                bool = bool || fight.fighter[i].fighting;    
            }
            return bool;
        },
        getSelected:function(){
            for(var i=0; i<fight.fighter.length; i++){
                if(fight.fighter[i].selected){
                    return(fight.fighter[i].name);
                }else{
                    return("");
                }
            }
        },
        getFighter:function(){
            for(var i=0; i<fight.fighter.length; i++){
                if(fight.fighter[i].fighting){
                    return(fight.fighter[i].name);
                }else{
                    return("");
                }
            }
        },
        attack:function(){
            var selectedPosi = 0;
            var fighterPosi = 0;
            var damage = 0;
            for(var i=0; i<kids.length; i++){
                if(this.fighter[i].selected){
                    selectedPosi = i;
                }
                if(this.fighter[i].fighting){
                    fighterPosi = i;
                }
            }
            /*attack the defender taks attacks * power and subtract from health*/
            this.fighter[selectedPosi].attacks++;
            damage =  (this.fighter[selectedPosi].attacks * attackArr[selectedPosi]);
            this.fighter[fighterPosi].health = this.fighter[fighterPosi].health - damage;
            /* Counter attack*/
            this.fighter[selectedPosi].health = this.fighter[selectedPosi].health - this.fighter[fighterPosi].counterAttack;
            this.displayResults(damage, selectedPosi, fighterPosi);
            if(this.fighter[fighterPosi].health <= 0){
                this.winner(fighterPosi);
            }

            if(this.fighter[selectedPosi].health <=0){
                if($("#enemy").is(":empty")){
                    this.loser();
                }
                /*this.resetFighter(kids[fighterPosi]);*/
            }
        },
        displayResults:function(damage, selectedPosi, fighterPosi){
            var displayTag = "";
            var displayStr = "";

            displayTag = "#" + kids[fighterPosi] + "Health";
            this.display(displayTag,this.fighter[fighterPosi].health);

            displayTag = "#" + kids[selectedPosi] + "Health";
            this.display(displayTag,this.fighter[selectedPosi].health);

            displayTag = "#result1";
            displayStr = "You attacked " + kids[fighterPosi] + " for " + damage + " damage";
            this.display(displayTag, displayStr); 

            displayTag = "#result2";
            displayStr = kids[fighterPosi] + " attacked you back for " + counterAttackArr[fighterPosi] + " damage";
            this.display(displayTag, displayStr); 
        },
        display:function(tag, str){
            $(tag).text(str);
        },
        loser:function(){
            defeated = true;
            $(".reset").addClass("resetOn");
            $(".reset").removeClass("reset");
            this.display("#result1", "You have been defeated!!! Game Over.");
            this.display("#result2", "");
        },
        winner:function(fighterPosi){
            this.display("#result1", "You have defeated " + kids[fighterPosi] + " you can choose to fight another enemy");
            this.display("#result2", "")
            /*$("." + kids[fighterPosi]).remove();*/
            this.resetFighter(kids[fighterPosi]);
            this.fighter[fighterPosi].fighting = false;
            if($("#enemyHolder").is(":empty")){
                this.display("#result1","You Won!!! Game Over")
                $(".reset").addClass("resetOn");
                $(".reset").removeClass("reset");    
            }
        },
        resetFighter(name){
            var tag = "." + name;
            $(tag).removeClass("fighter");
            $(tag).removeClass("notSelected");
            $(".defeated").append($(tag));
        }
    }
    function clearFighter(){
        for(var i=0; i<kids.length; i++){
            fight.fighter.pop();
        }
    };
    function resetImages(){
        var tag = "";
        for(var i=0; i<kids.length; i++){
            fight.resetFighter(kids[i]);
            tag = "." + kids[i];
            $(".fighters").append($(tag));
        }
        $(".fighters").css("Height","132");
        $("#enemy").removeClass("enemyLarge").addClass("enemy");
        $("#defender").removeClass("defenderLarge");
        
    };
    $("#attack").on("click", function(){
        if(!defeated){
            if(fight.fighterChosen()){
                fight.attack();
            }
            else{
                fight.display("#result1", "No enemy here. Pick a new enemy.");    
            }
        }
    });
    $(".reset").on("click", function(){
        clearFighter();
        fight.init();
        resetImages();
        defeated=false;
        fight.display("#result1","");
        $(".resetOn").addClass("reset");
        $(".resetOn").removeClass("resetOn");
    });
    $(".picHolder").on("click", function(){
        var clicked = $(this).attr("value");
        
        if(!fight.selectedChosen()){
            for(var i=0; i < kids.length; i++){
                if(clicked != kids[i]){
                    classStr = "."+ kids[i];
                    $("#enemy").removeClass("enemy");
                    $("#enemy").addClass("enemyLarge");    
                    $(classStr).addClass("notSelected");
                    $("#enemyHolder").append($(classStr));
                    $(".fighters").css("height","0px");
                }else{
                    fight.fighter[i].selected = true;
                }
            }
            classStr = "."+ clicked;
            $(classStr).addClass("selected")
            $("#selectedHolder").append($(classStr));
        }else if(!fight.fighterChosen()){
            if(fight.getSelected() != clicked){
                classStr = "." + clicked;
                $("#defender").addClass("defenderLarge");
                $(classStr).removeClass("notSelected");
                $(classStr).addClass("fighter");
                $("#defender").append($(classStr));
                if($("#enemyHolder").is(":empty")){
                    $("#enemy").removeClass("enemyLarge");
                    $("#enemy").addClass("enemy");
                }
                for(var i=0; i<fight.fighter.length;i++){
                    if(fight.fighter[i].name == clicked){
                    fight.fighter[i].fighting = true;
                    }
                }
            }
        }
   });
    fight.init();
});