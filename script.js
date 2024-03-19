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

function init() {
    renderQuestion();
    renderAnswers();
    renderCurrentQuestionId();
    renderQuestionAmount();
    renderProgressBar();
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
    let width = (currentQuestion + 1) / questions.length * 100;

    progressBar.innerHTML = /*html*/ `
        <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
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
        answerField.classList.add('bg-success', 'text-white');
        score++;
    } else {
        answerField.classList.add('bg-danger', 'text-white');
        correctAnswerField.classList.add('bg-success', 'text-white');
    }
    document.getElementById('next-question').disabled = false;
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
    }
}


function renderEndscreen() {
    let cardBody = document.getElementById('card-body');
    document.getElementById('header-image').style.display = 'none';
    cardBody.innerHTML = /*html*/ `
        <div class="endscreen">
            <h2>Quiz beendet</h2>
            <img class="endscreen-image" src="img/trophy-1674911_640.png" alt="">
            <div>Du hast <b>${score}</b> von <b>${questions.length}</b> richtig beantwortet!</div>
            <button class="btn btn-primary" onclick="location.reload()">Nochmal spielen</button>
        </div>
    `;
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