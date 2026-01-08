const quotes = [
  "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
  "There is nothing more deceptive than an obvious fact.",
  "I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.",
  "I never make exceptions. An exception disproves the rule.",
  "What one man can invent another can discover.",
  "Nothing clears up a case so much as stating it to another person.",
  "Education never ends, Watson. It is a series of lessons, with the greatest for the last.",
];

//States
let words = 0;
let wordsIndex = 0;
let startTime = 0;

//UI elements
const quoteElement = document.querySelector("#quote");
const messageElement = document.querySelector("#message");
const typedValueELement = document.querySelector("#typed-value");
const startButton = document.querySelector("#startbutton");

//Message system
const message = {
  success: (seconds) =>
    `Cpngralutaions! You finished in ${seconds.toFixed(2)} seconds.`,
  error: "Oops! There is a mistake.",
  start: "Start typing to begin the test.",
};

//Utility:pick a random quote
const getRandomquote = () => quotes[Math.floor(Math.random() * quotes.length)];

//Utility:render quote as spans
const renderQuote = (quote) => {
  quoteElement.innerHTML = quote
    .split(" ")
    .map(
      (word, i) => `<span ${i === 0 ? 'class="highlight"' : '"'}>${word}</span>`
    )
    .join(" ");
};
//highlights the current words
const highlightWord = (index) => {
  [...quoteElement.children].forEach((el, i) => {
    el.classList.toggle("highlight", i === index);
  });
};

//Game Starts
const startGame = () => {
  const quote = getRandomquote();
  words = quote.split(" ");
  wordsIndex = 0;
  renderQuote(quote);

  messageElement.textContent = message.start;
  typedValueELement.value = "";
  typedValueELement.focus();
  startTime = Date.now();
};

//TYping Logic
const handltyping = () => {
  const currentWord = words[wordsIndex];
  const typedValue = typedValueELement.value;

  if (typedValue === currentWord && wordsIndex === words.length - 1) {
    //Game Finished
    const elapsedTime = (Date.now() - startTime) / 1000;
    messageElement.textContent = message.success(elapsedTime);
    typedValueELement.disabled = true;
  } else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
    //Correct Word
    typedValueELement.value = "";
    wordsIndex++;
    highlightWord(wordsIndex);
  } else if (currentWord.startsWith(typedValue)) {
    typedValueELement.classList.remove("error");
  } else {
    typedValueELement.classList.add("error");
    messageElement.textContent = message.error;
  }
};

// Event Listeners
startButton.addEventListener("click", startGame);
typedValueElement.addEventListener("input", handleTyping);

messageElement.textContent = " Click Start to begin!";
