$(document).ready(function() {
    var kids = ["bart", "jimbo", "milhouse", "nelson"]
    var classStr = "";
    var fight ={
        fighter: [],
        init:function(){
            for(var i=0; i< kids.length; i++){
                var characters = {
                    name: "",
                    selected: false,
                    health: 0,
                    attack: 0,
                    counterAttack: 0,
                    fighting: false,
                };
                characters.name = kids[i];
                fight.fighter.push(characters);
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
        }
    }
    $(".picHolder").on("click", function(){
        var clicked = $(this).attr("value");
        
        if(!fight.selectedChosen()){
            for(var i=0; i < kids.length; i++){
                if(clicked != kids[i]){
                    classStr = "."+ kids[i];
                    $(classStr).addClass("notSelected");
                    $("#enemyHolder").append($(classStr));
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
                $(classStr).removeClass("notSelected");
                $(classStr).addClass("fighter");
                $("#defender").append($(classStr));
                for(var i=0; i<fight.fighter.length;i++){
                    if(fight.fighter[i].name == clicked){
                    fight.fighter[i].fighting = true;
                    }
                }
            }
        } /** Hey set the fighter attr here! */
   });
    fight.init();
});