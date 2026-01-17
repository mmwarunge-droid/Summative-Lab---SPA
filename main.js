const playAudioBtn = document.getElementById("play-audio"); //button to play pronunciation audio
let pronunciationAudio = null;

//Play audio when button is clicked
// Putting this event listener here to ensure pronunciationAudio is defined before use and avoid null errors
playAudioBtn.addEventListener("click", () => {
    if (pronunciationAudio) {
        pronunciationAudio.currentTime = 0; // restart audio
        pronunciationAudio.play();
    }
});

//get the form for searching words
const searchForm = document.getElementById("search-form"); //input box where user types the word
const searchInput = document.getElementById("search-input");
// const searchOutput = document.getElementById("search-output"); - Revisit this line
const errorBox = document.getElementById("error");

const resultBox = document.getElementById("result-box"); //shows the result box
const wordOutput = document.getElementById("word-output"); //shows the searched word on h3
const pronunciationOutput = document.getElementById("pronunciation"); //shows the pronunciation of the word first
const definitionsBox = document.getElementById("definitions"); //shows the definitions of the word - div section

const saveForm = document.getElementById("save-word-form"); //form to save the word
const saveBtn = document.getElementById("save-word-btn"); //button to save the word
const savedWordsList = document.getElementById("saved-words"); //ul to show the saved words

// the dictionary API base URL
const appState = {
    baseUrl: 'https://api.dictionaryapi.dev/api/v2/entries/en'
};
const API_URL = appState.baseUrl;

// store the current searched word and saved words in a list
let currentWord = null;
let savedWords = [];

// runs when the search form is submitted
searchForm.addEventListener("submit", async (e) => { 
    e.preventDefault(); // stops page from refreshing
    const word = searchInput.value.trim().toLowerCase(); // get word from input box

    if (!word) { // if input is empty
        showError("Please enter a word.");
        return;
    }

    clearError(); // clear previous errors
    fetchWord(word);
});

// function to fetch word data from the API
async function fetchWord(word) {

    try {
        clearError(); // clear any previous errors
        clearResult(); // clear previous results
        hideResult(); // hide previous results

        const response = await fetch(`${API_URL}/${word}`); //fetching data from the API

        if (!response.ok) { // if word is not found in the API dictionary
            throw new Error("Word not found, please try another one.");
        }

        const data = await response.json(); //converting response to JSON
        displayResult(data[0]); // show result
        currentWord = word; // save current word

    } catch (error) {
       clearResult(); // clear previous results
       hideResult(); // keep results hidden
       showError(error.message); // show error message
    }
}

// function to show the word information on the page
function displayResult(entry) {
    resultBox.classList.remove("hidden"); // show the result box

    wordOutput.textContent = entry.word; //display the searched word
    pronunciationOutput.textContent = entry.phonetic || ""; //display pronunciation if available

    // clear previous definitions
    definitionsBox.innerHTML = "";

    // setting up pronunciation audio
    const audioSrc = entry.phonetics?.find(p => p.audio)?.audio;

    if (audioSrc) {
        pronunciationAudio = new Audio(audioSrc); // create audio object
        playAudioBtn.classList.remove("hidden");
    } else {
        pronunciationAudio = null; // no audio is available for this word
        playAudioBtn.classList.add("hidden"); // hide play button - still getting a bug here. Debug later
    } 

    // loop through meanings and definitions
    entry.meanings.forEach(meaning => {
        const part = document.createElement("p"); // create paragraph for part of speech
        part.innerHTML = `<strong>${meaning.partOfSpeech}</strong>`; //shows part of speech
        definitionsBox.appendChild(part); // add part of speech to definitions box

        meaning.definitions.forEach(def => {
            const p = document.createElement("p");
            p.textContent = `- ${def.definition}`; //show definition
            definitionsBox.appendChild(p);
        });
    });
}

// runs when the save form is submitted
saveForm.addEventListener("submit", (e) => { // prevent page refresh
    e.preventDefault(); 
    if (!currentWord) return; // do nothing if no word is searched

    // check if word is already saved
    if (savedWords.includes(currentWord)) return;

    if (savedWords.length >= 10) { // limit to 10 saved words
        alert("You can only save up to 10 words.");
        return;
    }

    savedWords.push(currentWord); // add current word to saved words
    renderSavedWords(); // update the saved words list
});

// function to render the saved words list
function renderSavedWords() {
    savedWordsList.innerHTML = ""; //clear previous list

    savedWords.forEach(word => {
        const li = document.createElement("li");
        li.textContent = word; // add word to list item
        savedWordsList.appendChild(li);
    });
}

// showing error messages
function showError(message) { // display error message
    errorBox.textContent = message;
    errorBox.style.display = "block"; // make error box visible
}

// clearing error messages
function clearError() {
    errorBox.textContent = ""; // clear error text
    errorBox.style.display = "none"; //hide error box
}

// clearing results
function clearResult() {
    wordOutput.textContent = ""; // clear the word output
    pronunciationOutput.textContent = ""; // clear the pronunciation output
    definitionsBox.innerHTML = ""; // clear definitions
    pronunciationAudio = null; // clear audio
    playAudioBtn.classList.add("hidden"); // hide play button - Needs debugging
    currentWord = null; // clear current word
}

// hiding the result box
function hideResult() {
    resultBox.classList.add("hidden");
}