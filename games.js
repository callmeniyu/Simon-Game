var colours=['red','blue','green','yellow']

var gamePattern=[];

var userClickedPattern=[];

var level=0;





function nextSequence(){
  userClickedPattern=[]
  level++;
  $('#level-title').text("level "+level)
  var randomChosenNumber=Math.floor(Math.random()*4)
  var randomChosenColour=colours[randomChosenNumber]
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100)
  gamePattern.push(randomChosenColour)
  playSound(randomChosenColour)
}

$(".btn").click(function(){
  var userChosenColour=$(this).attr("id")
  userClickedPattern.push(userChosenColour)
  checkAnswer(userClickedPattern.length-1)
  animatePress(userChosenColour)
  playSound(userChosenColour)
})

$(document).keydown(function(){
    nextSequence()
})

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(gamePattern.length===userClickedPattern.length){
      setTimeout(function(){
        nextSequence()
      },1000)
    }
  }else{
    var wrongAudio=new Audio('sounds/wrong.mp3')
    wrongAudio.play()
    $('body').addClass('game-over')
    setTimeout(function(){
      $('body').removeClass('game-over')
    },200)
    $('#level-title').text("Game Over, Press Any Key to Restart")
    startOver()
  }
}

function startOver(){
  level=0
  gamePattern=[]
}

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play()
}

function animatePress(currentColour){
  $("#"+currentColour).addClass('pressed')
  setTimeout(function(){
    $("#"+currentColour).removeClass('pressed')
  },100)
}
