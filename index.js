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
const typedValueElement = document.querySelector("#typed-value");
const startButton = document.querySelector("#start");

//Message system
const message = {
  success: (seconds) =>
    `Congratulations! You finished in ${seconds.toFixed(2)} seconds.`,
  error: "Oops! There is a mistake.",
  start: "Start typing to begin the test.",
};

//Utility:pick a random quote
const getRandomquote = () => quotes[Math.floor(Math.random() * quotes.length)];

//Utility:render quote as spans
const renderQuote = (quote) => {
  quoteElement.innerHTML = quote
    .split(" ")
    .map((word, i) => `<span${i === 0 ? ' class="highlight"' : ''}>${word}</span>`)
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
  typedValueElement.value = "";
  typedValueElement.focus();
  startTime = Date.now();
};

//Typing Logic
const handleTyping = () => {
  const currentWord = words[wordsIndex];
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordsIndex === words.length - 1) {
    //Game Finished
    const elapsedTime = (Date.now() - startTime) / 1000;
    messageElement.textContent = message.success(elapsedTime);
    typedValueElement.disabled = true;
  } else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
    //Correct Word
    typedValueElement.value = "";
    wordsIndex++;
    highlightWord(wordsIndex);
  } else if (currentWord.startsWith(typedValue)) {
    typedValueElement.classList.remove("error");
  } else {
    typedValueElement.classList.add("error");
    messageElement.textContent = message.error;
  }
};

// Event Listeners
startButton.addEventListener("click", startGame);
typedValueElement.addEventListener("input", handleTyping);

messageElement.textContent = message.start;
