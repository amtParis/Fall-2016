var canvas  = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var ctx = canvas.getContext("2d");

var allFood = [];  			// memory of all food available in your app (doesn't appear on screen)
var allFoodOnStage = []; 	// actual food created and that must appear on screen
var foodNbr = 100;			// maximum food that you will be able to create

var allInsect = [];
var insectNbr = 10;

function setup() {
    // store it in a memory (allfood)
    for(var i =0; i < foodNbr; i++){
        var food = new Food(ctx,0,0);
        food.ID = i;
        allFood.push(food);
    }
    
    //insect
    //for(i = 0; i > insectNbr; i++) {  if you set i> insect it won't work. it always has to be <
    for(var i = 0;i < insectNbr;i++){
    	var insect = new Insect(ctx,Math.random()*window.innerWidth,Math.random()*window.innerHeight); //--> if you set all insects @ 0,0 they are gonna start all together on top of each other
        allInsect.push(insect);
    }
    
    //food interval setting time
    //setInterval(randomize,2000); ----> you need to remove that if you don't have any randomize function to call each 2 sec
    
    //---> you need to add a eventListener to interact with your finger
    window.addEventListener("touchstart",ontouchstart);
    draw();
}

function ontouchstart(event) {
    
//    for(var i =0; i<allFood.length; i++){
//        allFood[i].checkTouch(event.touches);
//    }
	//--> you don't check any distance with food. Just just add one more food in the array allFoodOnStage, set its position based on the finger

    
    //check all fingers to create the food
    for(var i = 0;i<event.touches.length;i++){
        //if you still have food in your global memory
    	 if(allFood.length>0){
             //you get the first food element from your memory, and remove it . (the shift() function)
             //it will give you an element, and reduce the memory
             var food = allFood.shift();
             //you set its position base on your finger position
             food.x = event.touches[i].pageX;
             food.y = event.touches[i].pageY;
             //you add it to the array that collect all food that should be visible on screen
             allFoodOnStage.push(food);
         }
    }

}


// GOD LIKE function that checks all food with all insects
// if anyinsect catch a food, it grabs the food color AND erase the food

function overAllCheck(insects,foods){
    
    for(var i = 0;i<insects.length;i++){
        for(var j=0;j<foods.length;j++){
            var distance = insects[i].getDistance(insects[i].x,insects[i].y,foods[j].x,foods[j].y);
            if(distance < 1 && !foods[j].isEaten){
                foods[j].isEaten = true;
                insects[i].changeColor(foods[j].color);
                //you can trigger more stuff here, like sound or change the design of the insect
            }
        }
    }
    
}


function draw() {
    ctx.fillStyle = 'white';
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    //console.log("draw");
    //food
//    for(var i = 0; i < allFood.length; i++){
//        allFood[i].display();
//    }
    //---> you don't wan't to draw all food on stage
    
    
    //you draw only food that has been added in the allFoodOnStage array
    for(var i=0;i<allFoodOnStage.length;i++){
        allFoodOnStage[i].display();
    }
    
    
    //overall CHECKER
    // to check if any Insect has reached any food
    // that function will change each food and insect properties
    overAllCheck(allInsect,allFoodOnStage);
    
    
    //insect
    for(var i = 0; i < allInsect.length; i++) {
        
        
        // for all insects, we'll be checking their distance with all food on stage.
        // it's the function that will change the insect's direction
        // as soon as one is seen as the nearest, the insect try to reach it
        allInsect[i].checkDistanceWithFood(allFoodOnStage);
        
        
        //basic moving and display function
        allInsect[i].move();
        allInsect[i].display();
        
       // allInsect[i].draw(); // that function doesn't exist
    }
    
    requestAnimationFrame(draw);
    
}


setup();
