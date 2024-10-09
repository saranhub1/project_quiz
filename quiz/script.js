const questions = [
    { question: "Listen to the sounds: /p/ and /b/. Select the one that starts the word 'pat.'", audio: "p_sound.mp3", options: ['p', 'b'], correct: 'p' },
    { question: "Which word starts with the /k/ sound?", audio: "k_sound.mp3", options: ['cat', 'bat'], correct: 'cat' },
    { question: "Select the sound that starts with /t/: tap or bat?", audio: "t_sound.mp3", options: ['tap', 'bat'], correct: 'tap' },
    { question: "Listen: /s/ and /z/. Which sound starts the word 'sit'?", audio: "s_sound.mp3", options: ['s', 'z'], correct: 's' },
    { question: "Which word starts with the /d/ sound?", audio: "d_sound.mp3", options: ['dog', 'log'], correct: 'dog' },
    { question: "Choose the correct beginning sound for the word 'box'", audio: "b_sound.mp3", options: ['b', 'p'], correct: 'b' },
    { question: "Which sound begins the word 'frog'?", audio: "f_sound.mp3", options: ['f', 't'], correct: 'f' },
    { question: "Select the correct sound to start the word 'hat.'", audio: "h_sound.mp3", options: ['h', 'm'], correct: 'h' },
    { question: "Which word begins with the /v/ sound?", audio: "v_sound.mp3", options: ['van', 'man'], correct: 'van' },
    { question: "Choose the correct sound for 'sun'", audio: "s_sound2.mp3", options: ['s', 'f'], correct: 's' },
    { question: "Which word starts with the /ch/ sound?", audio: "ch_sound.mp3", options: ['chip', 'ship'], correct: 'chip' },
    { question: "Select the beginning sound of the word 'jog'", audio: "j_sound.mp3", options: ['j', 'b'], correct: 'j' },
    { question: "Listen: /l/ and /r/. Which starts 'run'?", audio: "r_sound.mp3", options: ['l', 'r'], correct: 'r' },
    { question: "Which word starts with /m/?", audio: "m_sound.mp3", options: ['man', 'tan'], correct: 'man' },
    { question: "Select the word that starts with /p/: 'pen' or 'ten'?", audio: "p_sound2.mp3", options: ['pen', 'ten'], correct: 'pen' },
    { question: "Which begins with /th/: 'this' or 'fish'?", audio: "th_sound.mp3", options: ['this', 'fish'], correct: 'this' },
    { question: "Select the correct sound to start 'zip.'", audio: "z_sound.mp3", options: ['z', 's'], correct: 'z' },
    { question: "Listen: /g/ and /k/. Which sound starts 'go'?", audio: "g_sound.mp3", options: ['g', 'k'], correct: 'g' },
    { question: "Choose the correct sound for 'kite.'", audio: "k_sound2.mp3", options: ['k', 'p'], correct: 'k' },
    { question: "Which word begins with /n/?", audio: "n_sound.mp3", options: ['net', 'bet'], correct: 'net' },
    { question: "Select the beginning sound for 'fox.'", audio: "f_sound2.mp3", options: ['f', 'b'], correct: 'f' },
    { question: "Which word starts with the /sh/ sound?", audio: "sh_sound.mp3", options: ['ship', 'chip'], correct: 'ship' },
    { question: "Listen: /b/ and /d/. Which sound starts 'dog'?", audio: "d_sound2.mp3", options: ['b', 'd'], correct: 'd' },
    { question: "Which word begins with the /g/ sound?", audio: "g_sound2.mp3", options: ['goat', 'coat'], correct: 'goat' },
    { question: "Select the correct sound for 'rat.'", audio: "r_sound2.mp3", options: ['r', 't'], correct: 'r' },
    { question: "Which word starts with /j/: 'jump' or 'bump'?", audio: "j_sound2.mp3", options: ['jump', 'bump'], correct: 'jump' },
    { question: "Choose the correct sound for 'mat.'", audio: "m_sound2.mp3", options: ['m', 't'], correct: 'm' },
    { question: "Which sound begins 'sock'?", audio: "s_sound3.mp3", options: ['s', 'k'], correct: 's' },
    { question: "Select the sound to start 'pig.'", audio: "p_sound3.mp3", options: ['p', 'b'], correct: 'p' },
    { question: "Which begins with /l/: 'lap' or 'cap'?", audio: "l_sound.mp3", options: ['lap', 'cap'], correct: 'lap' },
    { question: "Select the correct sound for 'mop.'", audio: "m_sound3.mp3", options: ['m', 'p'], correct: 'm' },
    { question: "Which word starts with /ch/?", audio: "ch_sound2.mp3", options: ['chip', 'lip'], correct: 'chip' }
];


let score = 0;
let hits = 0;
let misses = 0;
let results = [];
let clicks = 0;

const questionContainer = document.getElementById('question-container');

function loadQuestion(index) {
    const questionData = questions[index];
    clicks = 0;  // Reset clicks for each question

    // Remove any existing click event listeners to avoid duplication
    window.removeEventListener('click', countClicks);

    // Add click event listener to count clicks
    window.addEventListener('click', countClicks);

    const questionElement = document.createElement('div');
    questionElement.innerHTML = `
        <p>${questionData.question}</p>
        <audio controls>
            <source src="${questionData.audio}" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
        <div class="options">
            ${questionData.options.map(option => `<button onclick="submitAnswer('${option}', '${questionData.correct}', ${index})">${option}</button>`).join('')}
        </div>
    `;

    questionContainer.innerHTML = '';
    questionContainer.appendChild(questionElement);
}

function countClicks() {
    clicks++;  // Increment click count on any click during question display
}

function submitAnswer(selected, correct, index) {
    // Remove the click counter listener when the answer is submitted
    window.removeEventListener('click', countClicks);

    if (selected === correct) {
        score++;
        hits++;
    } else {
        misses++;
    }

    results.push({
        question: questions[index].question,
        selectedAnswer: selected,
        correctAnswer: correct,
        result: selected === correct ? 'Hit' : 'Miss',
        clicks: clicks  // Track the number of clicks for the current question
    });

    if (index < questions.length - 1) {
        loadQuestion(index + 1);
    } else {
        alert("Quiz completed!");
    }
}

function downloadCSV() {
    const csvContent = [
        ["Question", "Selected Answer", "Correct Answer", "Result", "Clicks"],
        ...results.map(row => [row.question, row.selectedAnswer, row.correctAnswer, row.result, row.clicks])
    ]
        .map(e => e.join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'quiz_results.csv');
    a.click();
}

window.onload = () => {
    loadQuestion(0);
};
