$(document).ready(function () {
    // Generated lorem ipsum phrase to get a word list
    let wordsPhrase = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempor, ante sed fermentum pulvinar, lectus dolor efficitur dui, vel posuere tortor dolor nec elit. Suspendisse potenti. Proin tempor pharetra malesuada. Cras mattis, mi vel gravida feugiat, odio orci congue ex, sit amet scelerisque diam tellus nec sapien. Sed bibendum rutrum interdum. Praesent fermentum gravida odio non fringilla. Integer pulvinar enim nibh, nec molestie est suscipit ac. Proin in cursus turpis, in volutpat est. In tincidunt arcu in nibh sagittis tincidunt. Donec quis mauris nisl. Ut finibus condimentum fringilla. Nam mollis egestas augue, vel aliquet ligula fermentum id. Donec ut urna.";
    let wordsList = wordsPhrase.split(" ");                                     // List from which the word will be drawn
    let startedTimer = false;                                                   // Controls the timer 
    let timeLeft = 60;                                                          // Game time left

    let currentWord = $(".current-word");                                       // Current word to be typed
    let correctWords = parseInt($(".correct-words-qtd").text());                // How many word where typed correctly
    let errorsWords = parseInt($(".errors-words-qtd").text());                  // How manu word where misspeld
    let totalWords = parseInt($(".total-words-qtd").text());                    // Total typed words

    /**
     * Raffle a random word from wordList
     */
    function newCurrentWord() {
        let randomIndex = Math.floor(Math.random() * wordsList.length);

        currentWord.text(wordsList[randomIndex].replace(/[,.]/g, "").trim());
    }

    /**
     * Check the typed word and increase the counters.
     */
    function checkWords(typedWord) {
        // Add a point to correct word counter if the word where typed correctly
        if (typedWord === $(".current-word").text().trim()) {
            $(".correct-words-qtd").text(correctWords += 1);
        // Add a point to errors counter if the word where misspeld
        } else {
            $(".errors-words-qtd").text(errorsWords += 1);
        }
        
        $(".total-words-qtd").text(totalWords += 1);                            // Add a point to general counter
        newCurrentWord();                                                       // Raffle a new random word
        $(".word-input").val("");                                               // Clear input to a new word
    }

    newCurrentWord();                                                           // Starts a first random word
    $(".timer").text(timeLeft + " seconds");                                    // Starts the time limit

    $(".word-input").on("keydown", function (event) {
        // Starts a timer and decrease 1 for each second is passed
        if (!startedTimer) {
            startedTimer = true;
            
            let countDownInterval = setInterval(() => {
                timeLeft -= 1;
                
                $(".timer").text(timeLeft + " seconds");
                
                // If the time is over block the input
                if (timeLeft <= 0) {
                    clearInterval(countDownInterval);
                    $(".word-input").prop("disabled", true);
                }
            }, 1000);
        }
        
        // Every time space bar is pressed check the word
        if (event.keyCode === 32) {
            let typedWord = $(this).val().trim();
            
            checkWords(typedWord);
        }
    });
    
    // Reload page and start the game again
    $(".restart-btn").on("click", function (event) {
        location.reload();
    });
});


