

  class Hangman {
    constructor() {
      this.gameOn = true;
      this.knownLettersList = [];
      this.playedWords = {
        movies: [],
        games: [],
      };
      this.Emoji = "¯\\_(:/)_/¯";
      this.attempts = this.Emoji.length;
      this.stats = [];
      this.options = {
        movies: [
          "Avatar",
          "Fight Club",
          "Pulp Fiction",
          // ... more movie options ...
        ],
        games: [
          "The Legend of Zelda Ocarina of Time",
          "Super Mario",
          "Tetris",
          // ... more game options ...
        ],
      };
      this.category = Object.keys(this.options)[0];
      this.currentWord = this.getSecretWord(this.category);
    }
  
    setCategory(category) {
      if (!this.options.hasOwnProperty(category)) {
      return false;
      }
      this.category = category;
      this.currentWord = this.getSecretWord(this.category);
      return true;
    }
  
    getSecretWord(category) {
      let randomIndex = Math.floor(Math.random() * this.options[category].length);
      let secretWord = this.options[category][randomIndex];
      if (this.playedWords[this.category] === this.options[this.category]) {
        this.playedWords[this.category] = [];
      }
      while (this.playedWords[this.category].includes(secretWord)) {
        randomIndex = Math.floor(Math.random() * this.options[category].length);
        secretWord = this.options[category][randomIndex];
      }
      this.playedWords[this.category].push(secretWord);
      return secretWord;
    }
  
    validateGuess(letter) {
      return letter && letter.length === 1 && !this.knownLettersList.includes(letter.toLowerCase());
    }
  
    update(letter) {
      this.knownLettersList.push(letter.toLowerCase());
      if (!this.currentWord.toLowerCase().includes(letter)) {
        this.attempts--;
      }
    }
  
    renderWord() {
      return this.currentWord
        .split("")
        .map((char) => {
          if (this.knownLettersList.includes(char.toLowerCase()) || char === " ") {
            return char;
          } else {
            return "_";
          }
        })
        .join("");
    }
  
    renderEmoji() {
      return this.Emoji.slice(0, this.Emoji.length - this.attempts);
    }
  
    updateStats(gameResult) {
      this.stats.push({
        word: this.currentWord,
        result: gameResult ? "win" : "loss",
      });
    }
  
    getFormattedStats() {
      return this.stats
        .map((stat, index) => `${index + 1}. ${stat.word} - ${stat.result}`)
        .join("\n");
    }
  
    isWinning() {
      return this.currentWord === this.renderWord();
    }
  
    isGameOn() {
      return this.attempts > 0 && !this.isWinning();
    }
  
    reset() {
      this.knownLettersList = [];
      this.attempts = this.Emoji.length;
      this.currentWord = this.getSecretWord(this.category);
    }
  }
  
  module.exports = Hangman;