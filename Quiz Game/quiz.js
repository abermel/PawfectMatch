let currentQuestion = 0;
//let score = [];
let sky = 0;
let honey = 0;
let gaston = 0;
let bell = 0;
let buzz = 0;
let counterVar = 0;
let answerScore = [];
//let dusty = ;
let finals = [];
let winner = ("",0);
const totalQuestions =questions.length;
const dogs1 = dogs.length;


const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');
const option5 = document.querySelector('.option5');
const qCounter = document.querySelector('.counter');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');
const result = document.querySelector('.result');

//Function to generate question 
function generateQuestions (index) {
    //Select each question by passing it a particular index
    const qlen = questions[index].length/2;
    const question = questions[index];
    questionEl.innerHTML = `${question.question}`;
    if(questions[index].answer1){
      const option1Total = questions[index].answer1Total;
      option1.setAttribute('data-total', `${option1Total}`);
      option1.innerHTML = `${question.answer1}`;
    }

    //Option 3
    if(questions[index].answer2){
      const option2Total = questions[index].answer2Total;
      option2.setAttribute('data-total', `${option2Total}`);
      option2.innerHTML = `${question.answer2}`;
    }

    let w3 = questions[index].answer3;
    if(w3 != null){
      document.getElementById("option3").style.visibility = "visible";
      const option3Total = questions[index].answer3Total;
      option3.setAttribute('data-total', `${option3Total}`);
      option3.innerHTML = `${question.answer3}`;
      
    }else{
      document.getElementById("option3").style.visibility = "hidden";
    }

    //Option 4
    if(questions[index].answer4){
      document.getElementById("option4").style.visibility = "visible";
      const option4Total = questions[index].answer4Total;
      option4.setAttribute('data-total', `${option4Total}`);
      option4.innerHTML = `${question.answer4}`;
    }else{
      document.getElementById("option4").style.visibility = "hidden";
    }

    //Option 5
    if(questions[index].answer5){
      document.getElementById("option5").style.visibility = "visible";
      const option5Total = questions[index].answer5Total;
      option5.setAttribute('data-total', `${option5Total}`);
      option5.innerHTML = `${question.answer5}`;
    }else{
      document.getElementById("option5").style.visibility = "hidden";
    }
    
    qCounter.innerHTML = 'Question ' + (currentQuestion+1) + '/10';
    
}


function loadNextQuestion () {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    //Check if there is a radio input checked
    if(!selectedOption) {
        alert('Please select your answer!');
        return;
    }
    //Get value of selected radio
    //for(let i = 0; i < selectedOption.nextElementSibling.getAttribute('data-total').length; i++){
      //if(selectedOption.)
    answerScore = JSON.parse(selectedOption.nextElementSibling.getAttribute('data-total'));
    //}

    ////Add the answer score to the score array
    
    /*for(let i = 0; i < answerScore.length; i++){
      if (answerScore[i] == 1){

        sky = sky+1;
      }else if(answerScore[i] == 2){
        gaston = gaston+1;
      }else if(answerScore[i] == 3){
        honey = honey +1;
    }
  }*/
  if(answerScore[0]!=0){
    for(let i = 0; i < answerScore.length; i++){
      dogs[answerScore[i]-1].score = JSON.parse(dogs[answerScore[i]-1].score) + 1;
    }
  }

    currentQuestion++;
        selectedOption.checked = false;
    if(currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }
    if(currentQuestion == totalQuestions) {
      //finals.push(sky);
      //finals.push(honey);
      //finals.push(gaston);
      let max = -1;
      let maxi = -1;
      for(let i = 0; i < dogs.length; i++){
        if(JSON.parse(dogs[i].score) > max){
          max = JSON.parse(dogs[i].score);
          maxi = i; 
        }
      }
      //Select each question by passing it a particular index
      const winDog = dogs[maxi];
        container.style.display = 'none';
        result.innerHTML =
         `<h1 class="final-score">Your Pawfect Match is </h1>
         <div></div>
         <h1 class = "final-score">${winDog.name}</h1>
         <div class="summary">
            <h1>Match Summary</h1>
            <p>${winDog.description1}</p>
            <p>${winDog.description2}</p>
            <p>${winDog.description3}</p>
            <p>${winDog.description4}</p>
            <img src = ${winDog.img} alt = ${winDog.name}>
        </div>
        <button class="restart">Restart Quiz</button>
         `;
        return;
    }
    option3.innerHTML = '';
    option4.innerHTML = '';
    option5.innerHTML = '';
    generateQuestions(currentQuestion);
}

//Function to load previous question
function loadPreviousQuestion() {
    //Decrement quentions index
    if(answerScore[0]!=0){
      for(let i = 0; i < answerScore.length; i++){
        dogs[answerScore[i]-1].score = JSON.parse(dogs[answerScore[i]-1].score) - 1;
      }
    }
    currentQuestion--;
    //remove last array value;
    //score.pop();
    //Generate the question
    generateQuestions(currentQuestion);
}

//Fuction to reset and restart the quiz;
function restartQuiz(e) {
    if(e.target.matches('button')) {
    //reset array index and score
    currentQuestion = 0;
    score = [];
    for(i = 0; i <dogs.length; i++){
      dogs[i].score = 0;
    }
    //Reload quiz to the start
    location.reload();
    }

}


generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click',loadPreviousQuestion);
result.addEventListener('click',restartQuiz);