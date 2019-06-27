# unit-4-game
jQuery game
Written by Greg Lanter

**Bart's Battle RPG**
This is a jQuery game it pits one of 4 springfield boys agains the other three.
It can be run on index.html start by choosing your character then by choosing for first opponent.
You can lower you opponents health by attacking but this gives them an opportunity to counter-attack.
The good news is you attack gets stronger every time you use it while there counter attack stays at the same strength. Defeat the other all three other boys and you will winn Bart's Battle RPG.

**Design Notes**
We used jQuesey to interact with the DOM. We have 2 objects one for the fight that is an overall container and one that is for the player and contains the data for the players in the game. The fight object contains an array of character objects. We use the fact that we have a set number of charcters to choose from. Since we only have 4 characters we have a set of arrays used to store the starting health, attack, counter attack for each character and they are arranged so that the information for each boy can be found at the same index in each array. In thi program we are using the addClass and removeClass methods of jQuery to change formating of our elements as well as appendTo Method to move elements around the screen. 

https://gregorylanter.github.io/unit-4-game/
