// Importierte Dateien

// prompt sync funktioniert ähnlich wie readline sync
// mit über prompt User Input an
const prompt = require("prompt-sync")({ sigint: true });
const chalk = require("chalk");
// die Klasse und Methoden sind in der Hangman.js
const Hangman = require("./Hangman");

// Neues Spiel starten sobald node index.js aufgerufen wird
const game = new Hangman();

// Einmal aufräumen für den Start
console.clear();

// User Input Wahl der Kategorie
let category = prompt("Choose a categorie : movies or games ");
// Wenn der Input nicht passt erneute Anfrage
while (!game.setCategory(category)) {
  category = prompt("Type one of these: movies or games ");
}
// Platz um das Spiel zu rendern 
console.clear();
// Darstellung vom spiel 
console.log(`\n${game.renderWord()}\n`);
console.log(chalk.bold.magenta(`\n${game.renderEmoji()}\n`));

// while loop bis das Spiel beendet ist 
while (game.isGameOn()) {
  // Aufruf zur Buchstaben Eingabe
  let guess = prompt("Guess a letter ");
// Validierung und erneute abfrage bei Wiederholung/Ungültiger Eingabe
  while (!game.validateGuess(guess)) {
    guess = prompt("Comon one letter ");
  }
// Aktualisierung der Darstellung nach Validierung
  game.update(guess);
  console.clear();
  console.log(`\n${game.renderWord()}\n`);
  console.log(chalk.bold.magenta(`\n${game.renderEmoji()}\n`));
// Nach gewonnenen Spiel soll die Statistik aktualisiert werden
// - Win Check
// - Continue Check
// - Reset

  if (!game.isGameOn()) {
    const isWinning = game.isWinning();
    game.updateStats(isWinning);
    // Check ob gewonnen und Lösungsausgabe wenn nicht
    if (isWinning) {
      console.log("YOU WIN!!!\n");
    } else {
      console.log("Better luck next time it was: ", game.currentWord);
    }
    // Anfrage zum fortsetzen
    let anotherRound = prompt("Continue ? (y)? (n)? ").toLowerCase();
    // Bei ja reset
    if (anotherRound === "y") {
      game.reset();
      console.clear();
      console.log(`\n${game.renderWord()}\n`);
      console.log(chalk.bold.magenta(`\n${game.renderEmoji()}\n`));
    } 
    // Ansonsten die Statistik ausgeben und Verabschieden
    else {
      console.clear();
      console.log(chalk.bold.yellowBright(`\n${game.getFormattedStats()}\n`));
      console.log("Bye have a great time\n");
    }
  }
}

console.log(chalk.yellow(`-- THE END --\n`));