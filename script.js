let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answers": ["Robbie Williams", "Lady Gaga", "Tim Berners-Lee", "Justin Bieber"],
        "correct_answer": 2
    },
    {
        "question": "Wer gilt als Verfasser der amerikanischen Unabhängigkeitserklärung?",
        "answers": ["Thomas Jefferson", "Benjamin Franklin", "George Washington", "John Adams"],
        "correct_answer": 0
    },
    {
        "question": "Welches Land ist kein ständiges Mitglied im Sicherheitsrat der Vereinten Nationen?",
        "answers": ["USA", "Russland", "China", "Deutschland"],
        "correct_answer": 3
    },
    {
        "question": "Wie heisst die Hauptstadt von Äthiopien?",
        "answers": ["Nairobi", "Addis Abeba", "Mogadischu", "Harare"],
        "correct_answer": 1
    },
    {
        "question": "In welchem Ozean liegt die Insel Hawaii?",
        "answers": ["Atlantischer Ozean", "Indischer Ozean", "Karibisches Meer", "Pazifischer Ozean"],
        "correct_answer": 3
    }
]

let currentQuestion = 0;
let score = 0;
let SUCCESS_SOUND = new Audio('audio/success.mp3');
let FALSE_SOUND = new Audio('audio/wrong.mp3');


function init() {
    renderCard();
    renderQuestion();
    renderAnswers();
    renderCurrentQuestionId();
    renderQuestionAmount();
    renderProgressBar();
}


function renderCard() {
    let cardBody = document.getElementById('card-body');

    cardBody.innerHTML = /*html*/ `
        <div id="progress-bar"></div>
        <h5 class="card-title">Frage</h5>
        <p class="card-text" id="question"></p>
        <div class="answer-container" id="answer-container"></div>
        <div class="question-footer">
            <span>
                <b id="current-question"></b> von <b id="question-amount"></b> Fragen
            </span>
            <button class="btn btn-primary" id="next-question" onclick="nextQuestion()" disabled>Nächste Frage</button>
        </div>
    `;
}


function renderQuestion() {
    let questionContainer = document.getElementById('question');
    questionContainer.innerHTML = "";
    questionContainer.innerHTML += /*html*/ `
        ${questions[currentQuestion].question}
    `;
}


function renderAnswers() {
    let answerContainer = document.getElementById('answer-container');
    answerContainer.innerHTML = "";

    for (let i = 0; i < questions[currentQuestion].answers.length; i++) {
        answerContainer.innerHTML += /*html*/ `
            <div class="card mb-2 answer" onclick="checkAnswer(${i})" id="answer${i}">
                <div class="card-body">
                    ${questions[currentQuestion].answers[i]}
                </div>
            </div>
        `;
    }
}


function renderProgressBar() {
    let progressBar = document.getElementById('progress-bar');
    let width = Math.round(currentQuestion / questions.length * 100);

    progressBar.innerHTML = /*html*/ `
        <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="${width}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar" style="width: ${width}%">${width}%</div>
        </div>
    `;
}


function checkAnswer(i) {
    let clickedAnswer = questions[currentQuestion].answers[i];
    let answerIndex = questions[currentQuestion].answers.indexOf(clickedAnswer);
    let correctAnswer = questions[currentQuestion].correct_answer;
    let answerField = document.getElementById(`answer${i}`);
    let correctAnswerField = document.getElementById(`answer${correctAnswer}`);

    if(answerIndex == correctAnswer) {
        answerCorrect(answerField);
    } else {
        answerWrong(answerField, correctAnswerField);
    }
    document.getElementById('next-question').disabled = false;
    document.querySelectorAll('.answer-container')[0].classList.add('disable-answers');
}


function answerCorrect(answerField) {
    answerField.classList.add('bg-success', 'text-white');
    SUCCESS_SOUND.volume = 0.5;
    SUCCESS_SOUND.play();
    score++;
}


function answerWrong(answerField, correctAnswerField) {
    answerField.classList.add('bg-danger', 'text-white');
    FALSE_SOUND.play();
    correctAnswerField.classList.add('bg-success', 'text-white');
}


function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-question').disabled = true;
    if(currentQuestion == questions.length) {
        renderEndscreen();
    } else {
        init();
        if(currentQuestion == questions.length - 1) {
            document.getElementById('next-question').innerHTML = `Quiz beenden`;
        }
        document.querySelectorAll('.answer-container')[0].classList.remove('disable-answers');
    }
}


function renderEndscreen() {
    let cardBody = document.getElementById('card-body');
    document.getElementById('header-image').style.display = 'none';
    cardBody.innerHTML = /*html*/ `
        <div class="endscreen">
            <h2>Quiz beendet</h2>
            <img class="endscreen-image" src="img/trophy-1674911_640.png" alt="">
            <div>Du hast <b>${score}</b> von <b>${questions.length}</b> Fragen richtig beantwortet!</div>
            <button class="btn btn-primary" onclick="restartQuiz()">Nochmal spielen</button>
        </div>
    `;
}


function restartQuiz() {
    document.getElementById('header-image').style.display = 'block';
    currentQuestion = 0;
    score = 0;

    init();
}


function renderQuestionAmount() {
    let container = document.getElementById('question-amount');
    container.innerHTML = "";
    container.innerHTML += /*html*/ `
        ${questions.length}
    `;
}


function renderCurrentQuestionId() {
    let currentQuestionId = document.getElementById('current-question');
    currentQuestionId.innerHTML = "";
    currentQuestionId.innerHTML += /*html*/ `
        ${currentQuestion + 1}.
    `;
}