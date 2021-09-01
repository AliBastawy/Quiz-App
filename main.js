let start = document.querySelector(".start");

let rules = document.querySelector(".rules");

let continue_btn = document.querySelector(".continue");

let exit_btn = document.querySelector(".exit");

let questions_window = document.querySelector(".questions");

let headerWindow = document.querySelector(".questions .head");

let questionsText = document.querySelector(".questions .question");

let timerSpan = document.querySelector(".questions .head .timer .time-number");

// Get Span of Number Of Questions In Footer
let questionFootNumber = document.querySelector(".number-questions");

// Get Button Next Que
let nextQue = document.querySelector(".foot .button");

// Get Result Div
let resultDiv = document.querySelector(".result");

// Get Span OF Total Right Answers
let totalWrongAnswers = document.querySelector(".result .display-result");

let timeValue = 15;

// Variable To Stop Timer After Answering
let check = false;

// Wrong Answers
let wrongAnswers = 0;

// Variable Of JSON Data (Quiz Data)
let questions;

// Request JSON File
var myRequest = new XMLHttpRequest();

myRequest.onreadystatechange = function () {
    if (this.status === 200 && this.readyState === 4) {
        questions = JSON.parse(this.responseText);
    }
}

// Open JSON File
myRequest.open('GET', 'questions.json', true);
// Send Request To open The File
myRequest.send();



start.onclick = function () {

    rules.classList.add("activeInfo");

}

exit_btn.onclick = function () {
    
    rules.classList.remove("activeInfo");
    
}

function startTimer(index) {

    timeValue = 15;
    
    var counter = setInterval(timerCount , 1000);
    
    function timerCount() {
        
        timerSpan.textContent = timeValue;
        timeValue--;

        if (timeValue < 9) {
            let add = timerSpan.innerText;
            timerSpan.textContent = "0" + add;
        }

        if (timeValue < 0) {

            clearInterval(counter);

            showRightAnswer(index);

        }

        if (check) {

            clearInterval(counter);

            if (document.body.contains(document.querySelector(".animation"))) {
                document.querySelector(".animation").classList.add("pause-animation");
            }
        }

    }
    
}

function showAnimation() {

    if (document.body.contains(document.querySelector(".animation"))) {

        document.querySelector(".animation").remove();

        // Add Animation To The Header
        let animateDiv = document.createElement('div');

        animateDiv.classList.add("animation");
        
        headerWindow.appendChild(animateDiv);
        
        check = false;
    }
    else {

        // Add Animation To The Header
        let animateDiv = document.createElement('div');

        animateDiv.classList.add("animation");
        
        headerWindow.appendChild(animateDiv);
    }

    
}

function showQuestions(index) {

    showAnimation();

    // Show The Question
    questionsText.innerHTML = `<h2> ${questions[index].numb}. ${questions[index].question} </h2>`;

    // Create The Container of Answers
    let div_answerContainer = document.createElement("div");

    // Add Class To the Container
    div_answerContainer.classList = "answer-container";

    // Loop To Show All Answers
    questions[index].options.forEach(quiz => {

        // Create Div Of Answer
        let div_answerText = document.createElement("div");
        
        // Add Class To the Div OF Answer
        div_answerText.classList = "answer";

        // Create Span Of the Answer
        let spanAnswer = document.createElement("span");

        // Put Answer in Span
        let spanAnswerText = document.createTextNode(`${quiz}`)
        
        // Span Append The Answer
        spanAnswer.appendChild(spanAnswerText);

        // The Div of Answer Append Span
        div_answerText.appendChild(spanAnswer);

        // Container Append The Div
        div_answerContainer.appendChild(div_answerText);

    })

    // Question Append The Answer Container
    questionsText.appendChild(div_answerContainer);

    // Show Number Of Questioin
    questionFootNumber.innerText = `${questions[index].numb} of ${questions.length} Questions`;

    // Get The Span Contains Answer
    let answerSpan = document.querySelectorAll(".questions .question .answer-container .answer span");

    // Loop To Add Right Or Wrong Answer
    answerSpan.forEach(element => {
        
        element.onclick = function () {

            if (element.innerText == questions[index].answer) {
                
                showRightAnswer(index);
            } 
            else {

                wrongAnswers++;

                // Add Incorrect Class To Answer
                element.classList.add("incorrect");
                
                // Div Contain Icon
                let createIcon = document.createElement(`div`);
    
                // Icon Element
                createIcon.innerHTML = '<i class="fas fa-times"></i>'
    
                // Add Incorrect Class To Span Answer
                createIcon.classList.add("icon-incorrect")
    
                // Append The Div of Icon To the Answer 
                element.parentElement.appendChild(createIcon);

                showRightAnswer(index);
            }

        }

    })

}

function showRightAnswer(index) {

    // Get The Span Contains Answer
    let answerSpan = document.querySelectorAll(".questions .question .answer-container .answer span");

    answerSpan.forEach(element => {
    
        if (element.innerText == questions[index].answer) {
        
        // Add Correct Class To Answer
        element.classList.add("correct");
        
        // Div Contain Icon
        let createIcon = document.createElement(`div`);

        // Icon Element
        createIcon.innerHTML = '<i class="fas fa-check"></i>'

        // Add Correct Class To Span Answer
        createIcon.classList.add("icon-correct")

        // Append The Div of Icon To the Answer 
        element.parentElement.appendChild(createIcon);

        // Show The Next Que Button After Clicked On Answer
        nextQue.classList.add("activeInfo");

    }
    
    // Prevent Click
    element.parentElement.classList.add("disabled");
    
    check = true;
})
}

continue_btn.onclick = function () {

    rules.classList.remove("activeInfo");

    questions_window.classList.add("activeInfo");

    startTimer(0);

    showQuestions(0);

}

function showResultWindow() {

    resultDiv.classList.add("activeInfo");

    rightAnswers = 5 - wrongAnswers;

    if (rightAnswers > 3)
        totalWrongAnswers.innerHTML = '<span>and congrats! 🎉, You got '+ rightAnswers +' out of '+ questions.length +'</span>';
    else if (rightAnswers > 1) 
        totalWrongAnswers.innerHTML = '<span>and nice 😎, You got '+ rightAnswers +' out of '+ questions.length +'</span>';
    else 
        totalWrongAnswers.innerHTML = '<span>and sorry 😐, You got only '+ rightAnswers +' out of '+ questions.length +'</span>';
}


let nextQuestion = 1;

nextQue.onclick = function () {

    if (nextQuestion == 5) {

        questions_window.classList.remove("activeInfo");

        nextQuestion = 1;

        showResultWindow();

    }
    else {

        // Show The Next Que Button After Clicked On Answer
        nextQue.classList.remove("activeInfo");

        startTimer(nextQuestion);

        showQuestions(nextQuestion);
        
        nextQuestion++;
    }

}

let replayButton = document.querySelector(".replay")

replayButton.onclick = function () {

    resultDiv.classList.remove("activeInfo");

    questions_window.classList.add("activeInfo");

    startTimer(0);

    showQuestions(0);

    wrongAnswers = 0;
}

let quitButton = document.querySelector(".quit");

// If Quit Quiz Button clicked
quitButton.onclick = ()=>{
    window.location.reload(); //reload the current window
}