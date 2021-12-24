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
        numb: 2,
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
    startTimer(59); 
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
    showQuetions(0); 
    queCounter(1); 
    startTimer(59); 
}


var timeValue = 60;
var question_count = 0;
var que_numb = 1;
var userScore = 0;
var counter;
var widthValue = 0;

var restart_quiz = result_box.querySelector(".buttons .restart");
var quit_quiz = result_box.querySelector(".buttons .quit");


restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); 
    result_box.classList.remove("activeResult"); 
    timeValue = 60; 
    question_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    clearInterval(counter); 
    startTimer(timeValue); 
    showQuetions(question_count); 
    queCounter(que_numb); 
    
    next_btn.classList.remove("show"); 
}


quit_quiz.onclick = ()=>{
    window.location.reload(); 
}

var next_btn = document.querySelector("footer .next_btn");
var bottom_ques_counter = document.querySelector("footer .total_que");


next_btn.onclick = ()=>{
    if(question_count < questions.length - 1){ 
        question_count++; 
        que_numb++; 
        showQuetions(question_count); 
        queCounter(que_numb); 
        next_btn.classList.remove("show"); 
    }else{
        showResult(); 
    }
}

function showPlayerScores(){
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.remove("activeResult"); 
    scores_box.classList.add("activeScores");
    var playerScoreText = scores_box.querySelector(".player_scores");
    if (userScore > 3){ 
        let scoreTag = '<span>Congrats! You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        playerScoreText.innerHTML = scoreTag;  
    }
    else if(userScore > 1){ 
        let scoreTag = '<span>You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        playerScoreText.innerHTML = scoreTag;
    }
    else{ 
        let scoreTag = '<span>You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        playerScoreText.innerHTML = scoreTag;
    }
}




function showQuetions(index){
    var que_text = document.querySelector(".que_text");

    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; 
    
    var option = option_list.querySelectorAll(".option");


    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}


function optionSelected(answer){
    let userAns = answer.textContent; 
    let correcAns = questions[question_count].answer; 
    var allOptions = option_list.children.length; 
    
    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct");
    }else if(userAns != correcAns){
        answer.classList.add("incorrect"); 
        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ 
                option_list.children[i].setAttribute("class", "option correct"); 
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); 
    }
    next_btn.classList.add("show"); 
}

function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    var scoreText = result_box.querySelector(".score_text");
    let scoreTag = '<span>You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
    
    var playerInitials = result_box.querySelector(".player_initials_label");
}

// var quit_quiz_btn = quiz_box.querySelector(".footer .buttons .quit");
//     quit_quiz_btn.onclick = ()=>{
//         result_box.classList.remove("activeResult");
// showResult(); 
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
        if(time < 0){ 
            clearInterval(counter); 
            timeText.textContent = "Time Over"; 
            var allOptions = option_list.children.length; 
            let correcAns = questions[question_count].answer; 
           
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ 
                    option_list.children[i].setAttribute("class", "option correct"); 
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            } 
            // next_btn.classList.add("show"); //show the quit button if user selected any option
            // quit_quiz_btn.classList.add("show");
            
        }
    }
}

function queCounter(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  
}

function getInputValue(){
    var inputInitial = document.getElementById("player_initials_label").value;
    alert(inputInitial);
}