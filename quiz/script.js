const questions = [
    { question: "Listen to the sounds: /p/ and /b/. Select the one that starts the word 'pat.'", audio: "p_sound.mp3.mp3", options: ['p', 'b', 'd', 'g', 't'], correct: ['p'] },
    { question: "Which word starts with the /k/ sound?", audio: "k_sound.mp3", options: ['cat', 'bat', 'hat', 'sat', 'mat'], correct: ['cat'] },
    { question: "Select the sound that starts with /t/:", audio: "t_sound.mp3", options: ['tap', 'bat', 'hat', 'mat', 'sat'], correct: ['tap'] },
    { question: "Listen: /s/ and /z/. Which sound starts the word 'sit'?", audio: "s_sound.mp3", options: ['s', 'z', 't', 'm', 'f'], correct: ['s'] },
    { question: "Which word starts with the /d/ sound?", audio: "d_sound.mp3", options: ['dog', 'log', 'frog', 'cat', 'bat'], correct: ['dog'] },
    { question: "Choose the correct beginning sound for the word 'box'", audio: "b_sound.mp3", options: ['b', 'p', 'd', 'g', 'm'], correct: ['b'] },
    { question: "Which sound begins the word 'frog'?", audio: "f_sound.mp3", options: ['f', 't', 'p', 'd', 'g'], correct: ['f'] },
    { question: "Select the correct sound to start the word 'hat.'", audio: "h_sound.mp3", options: ['h', 'm', 'b', 's', 'p'], correct: ['h'] },
    { question: "Which word starts with the /l/ sound?", audio: "l_sound.mp3", options: ['lake', 'bake', 'cake', 'take', 'fake'], correct: ['lake'] },
    { question: "Listen: /t/ and /d/. Which sound starts the word 'dog'?", audio: "d_sound_2.mp3", options: ['t', 'd', 'g', 's', 'p'], correct: ['d'] },
    { question: "Which sound begins the word 'zebra'?", audio: "z_sound.mp3", options: ['z', 'j', 's', 'g', 'b'], correct: ['z'] },
    { question: "Select the correct sound to start the word 'chair.'", audio: "ch_sound.mp3", options: ['ch', 'sh', 'th', 'k', 'p'], correct: ['ch'] },
    { question: "Which word starts with the /n/ sound?", audio: "n_sound.mp3", options: ['nut', 'cut', 'but', 'put', 'hut'], correct: ['nut'] },
    { question: "Listen: /m/ and /n/. Which sound starts the word 'mat'?", audio: "m_sound.mp3", options: ['m', 'n', 't', 'b', 'c'], correct: ['m'] },
    { question: "Which word starts with the /f/ sound?", audio: "fa_sound_2.mp3", options: ['fan', 'pan', 'can', 'man', 'ran'], correct: ['fan'] },
    { question: "Select the correct sound to start the word 'yarn.'", audio: "y_sound.mp3", options: ['y', 'a', 'e', 'i', 'o'], correct: ['y'] },
    { question: "Which sound begins the word 'elephant'?", audio: "e_sound.mp3", options: ['e', 'i', 'u', 'a', 'o'], correct: ['e'] },
    { question: "Choose the correct sound for the word 'train.'", audio: "tr_sound_2.mp3", options: ['t', 'd', 'k', 'b', 's'], correct: ['t'] },
    { question: "Listen: /h/ and /k/. Which sound starts the word 'hat'?", audio: "h_sound_2.mp3", options: ['h', 'k', 'g', 'd', 's'], correct: ['h'] },
    { question: "Which word starts with the /v/ sound?", audio: "v_sound.mp3", options: ['van', 'ban', 'can', 'man', 'ran'], correct: ['van'] },
    { question: "Select the correct beginning sound for the word 'x-ray.'", audio: "x_sound.mp3", options: ['x', 'z', 'k', 's', 't'], correct: ['x'] },
    { question: "Which word starts with the /q/ sound?", audio: "q_sound.mp3", options: ['quack', 'black', 'snack', 'track', 'stack'], correct: ['quack'] },
    { question: "Choose the sound that starts with /j/: jam or dam?", audio: "j_sound.mp3", options: ['jam', 'dam', 'ham', 'ram', 'clam'], correct: ['jam'] },
    { question: "Which word starts with the /w/ sound?", audio: "w_sound.mp3", options: ['was', 'has', 'this', 'that', 'his'], correct: ['was'] },
    { question: "Listen: /r/ and /l/. Which sound starts the word 'red'?", audio: "r_sound.mp3", options: ['r', 'l', 't', 'm', 'n'], correct: ['r'] },
    { question: "Select the correct sound that starts the word 'whale.'", audio: "wh_sound.mp3", options: ['wh', 'h', 'w', 'r', 's'], correct: ['wh'] },
    { question: "Which word starts with the /y/ sound?", audio: "ye_sound_2.mp3", options: ['yellow', 'hello', 'fellow', 'mellow', 'bellow'], correct: ['yellow'] },
    { question: "Choose the sound that starts with /th/: this or his?", audio: "th_sound.mp3", options: ['this', 'his', 'was', 'has', 'fizz'], correct: ['this', 'his'] },
    { question: "Listen: /ch/ and /sh/. Which sound starts the word 'ship'?", audio: "sh_sound.mp3", options: ['sh', 'ch', 'th', 'f', 'g'], correct: ['sh'] },
    { question: "Which word starts with the /g/ sound?", audio: "g_sound.mp3", options: ['goat', 'boat', 'coat', 'mote', 'vote'], correct: ['goat'] },
    { question: "Select the sound that starts with /z/: zebra or lebra?", audio: "z_sound.mp3", options: ['zebra', 'lebra', 'deb', 'fab', 'rab'], correct: ['zebra'] }
];

let currentQuestionIndex = 0;
let hits = 0;
let misses = 0;
let clicks = 0;
let totalTime = 40;
let timer;
let results = [];
let userName, userAge;

const questionContainer = document.getElementById('question-container');
const timerDisplay = document.getElementById('timer');

document.getElementById('start-btn').addEventListener('click', startQuiz);

function startQuiz() {
    userName = document.getElementById('name').value;
    userAge = document.getElementById('age').value;

    if (!userName || !userAge) {
        alert("Please enter your name and age.");
        return;
    }

    document.getElementById('user-info').style.display = 'none';
    document.getElementById('start-btn').style.display = 'none';
    questionContainer.style.display = 'block';
    timerDisplay.style.display = 'block';
    
    displayQuestion();
}

function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        finishQuiz();
        return;
    }

    const question = questions[currentQuestionIndex];
    questionContainer.innerHTML = `<h2>Q${currentQuestionIndex + 1}: ${question.question}</h2>`;
    questionContainer.innerHTML += `<button onclick="playSound('${question.audio}')">Play Sound</button>`;
    questionContainer.innerHTML += '<div class="options">' + 
        question.options.map(option => 
            `<button onclick="selectOption('${option}')">${option}</button>`).join('') +
        '</div>';
    
    hits = 0;
    misses = 0;
    clicks = 0;
    totalTime = 40;

    timerDisplay.innerText = `Time left: ${totalTime}s`;
    timer = setInterval(updateTimer, 1000);
}

function playSound(audioFile) {
    const audio = new Audio(audioFile);
    audio.play();
}

function updateTimer() {
    totalTime--;
    timerDisplay.innerText = `Time left: ${totalTime}s`;
    if (totalTime <= 0) {
        clearInterval(timer);
        alert("Time's up!");
        nextQuestion();
    }
}

function selectOption(selectedOption) {
    const question = questions[currentQuestionIndex];

    if (question.correct.includes(selectedOption)) {
        hits++;
    } else {
        misses++;
    }
    clicks++;
    
    if (hits > 2 || totalTime <= 0) {
        clearInterval(timer);
        nextQuestion();
    }
}

function nextQuestion() {
    results[currentQuestionIndex] = {
        q: `q${currentQuestionIndex + 1}`,
        clicks: clicks,
        hits: hits,
        misses: misses,
        time: totalTime
    };
    
    currentQuestionIndex++;
    displayQuestion();
}

function finishQuiz() {
    clearInterval(timer);
    alert("Quiz completed!");
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('download-btn').style.display = 'block';
}

document.getElementById('download-btn').addEventListener('click', () => {
    const csvContent = "data:text/csv;charset=utf-8,"
        + `${userName},${userAge},` 
        + results.map(e => `${e.q},${e.clicks},${e.hits},${e.misses},${e.time}`).join(",") + "\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "quiz_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
