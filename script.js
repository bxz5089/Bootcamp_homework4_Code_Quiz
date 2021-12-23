var start_btn = document.querySelector(".start_btn button");
var player_scores_btn = document.querySelector(".player_scores_btn button");
var info_box = document.querySelector(".info_box");
var exit_btn = info_box.querySelector(".buttons .quit");
var continue_btn = info_box.querySelector(".buttons .restart");

var scores_box = document.querySelector(".scores_box");
var exit_scores_btn = scores_box.querySelector(".buttons .quit");
var continue_scores_btn = scores_box.querySelector(".buttons .restart");

var quiz_box = document.querySelector(".quiz_box");


var result_box = document.querySelector(".result_box");
var option_list = document.querySelector(".option_list");
var timeText = document.querySelector(".timer .time_left_txt");
var timeCount = document.querySelector(".timer .timer_sec");

const questions = [
    {
      numb: 1,
      question: "What does HTML stand for?",
      answer: "Hyper Text Markup Language",
      options: [
        "Hyper Text Preprocessor",
        "Hyper Text Markup Language",
        "Hyper Text Multiple Language",
        "Hyper Tool Multi Language"
    ]
  },
    {
      numb: 2,
      question: "How to write an IF statement in JavaScript?",
      answer: "if (i==5)",
      options: [
        "if (i==5)",
        "if i=5",
        "if i==5 then",
        "if i=5 then"
    ]
  },
    {
      numb: 3,
      question: "What's the action of doing something over and over again, repeating code.",
      answer: "Loop",
      options: [
        "Code",
        "Loop",
        "Bug",
        "Program"
      ]
    },
    {
      numb: 4,
      question: "What does CSS stand for?",
      answer: "Cascading Style Sheet",
      options: [
        "Common Style Sheet",
        "Colorful Style Sheet",
        "Computer Style Sheet",
        "Cascading Style Sheet"
      ]
    },
    {
      numb: 5,
      question: "Which event occurs when the user clicks on an HTML element??",
      answer: "onclick",
      options: [
        "onchange",
        "onclick",
        "onmouseclick",
        "onmouseover"
    ]
  },
];

start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); 
}
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
}
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.add("activeQuiz"); 
    showQuetions(0); 
    queCounter(1); 
    startTimer(15); 
}

player_scores_btn.onclick = ()=>{
    scores_box.classList.add("activeScores");
    showPlayerScores()
    getInputValue()
}
exit_scores_btn.onclick = ()=>{
    scores_box.classList.remove("activeScores");
}
continue_scores_btn.onclick = ()=>{
    scores_box.classList.remove("activeScores");
    quiz_box.classList.add("activeQuiz");
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15); //calling startTimer function
}


var timeValue = 15;
var que_count = 0;
var que_numb = 1;
var userScore = 0;
var counter;
var widthValue = 0;

var restart_quiz = result_box.querySelector(".buttons .restart");
var quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    clearInterval(counter); //clear counter
    startTimer(timeValue); //calling startTimer function
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    
    next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

var next_btn = document.querySelector("footer .next_btn");
var bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ 
        que_count++; 
        que_numb++; 
        showQuetions(que_count); 
        queCounter(que_numb); 
        next_btn.classList.remove("show"); 
    }else{
        // clearInterval(counter); //clear counter
        showResult(); //calling showResult function
    }
}

function showPlayerScores(){
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.remove("activeResult"); 
    scores_box.classList.add("activeScores");
    var playerScoreText = scores_box.querySelector(".player_scores");
    if (userScore > 3){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>Congrats! You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        playerScoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = '<span>You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        playerScoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        playerScoreText.innerHTML = scoreTag;
    }
}



// getting questions and options from array
function showQuetions(index){
    var que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    var option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

//if user clicked on option
function optionSelected(answer){
    // clearInterval(counter); //clear counter
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    var allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else if(userAns != correcAns){
        answer.classList.add("incorrect"); //adding red color to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    var scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>Congrats! You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = '<span>You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    var playerInitials = result_box.querySelector(".player_initials");
}

// var quit_quiz_btn = quiz_box.querySelector(".footer .buttons .quit");
//     quit_quiz_btn.onclick = ()=>{
//         result_box.classList.remove("activeResult");
//     }

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; 
        time--; 
        if(time < 9){ 
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; 
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Over"; //change the time text to time off
            var allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array 
           
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option

                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            } 
            alert("Time Over!");
            // next_btn.classList.add("show"); //show the quit button if user selected any option
            // quit_quiz_btn.classList.add("show");
            
        }
    }
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}

function getInputValue(){
    // Selecting the input element and get its value 
    var inputInitial = document.getElementById("player_initials").value;
    alert(inputInitial);
}