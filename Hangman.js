// Version 1
// Die Haupt-Klasse und darin alle Methoden für das Spiel
class Hangman {
    constructor() {
      // Läuft das Spiel noch
      this.gameOn = true;
      // geratene Buchstaben Liste
      this.knownLettersList = [];
      // bereits gespielte Worte Liste
      this.playedWords = {
        movies: [],
        games: [],
      };
      // das komplette Emoji
      this.Emoji = "¯\\_(:/)_/¯";
      // Versuch Counter (entspricht Emoji Länge)
      this.attempts = this.Emoji.length;
      // Statistik-Stash für gewonnene Spiele
      this.stats = [];
      // Auswählbare Optionen als Kategorien 
      this.options = {
        movies: [
          "Avatar",
          "Fight Club",
          "Pulp Fiction",
          "Zurück in die Zukunft",
          "Kill Bill Volume One",
          "The Big Lebowski",
          "Indianer Jones",
          "Der Herr der Ringe Die Gefährten",
          "Der Herr der Ringe Die zwei Türme",
          "Der Herr der Ringe Die Rueckkehr des Königs",
          "Der Zauberer von Oz",
          "Spaceballs",
          "Die Mummie",
          "Stirb Langsam",
          "Die Ritter der Kokosnuss",
          "Schindlers Liste",
          "Sin City",
          "Forrest Gump",
          "Apocalypse Now",
          "Gran Torino",
          "Departed Unter Feinden",
          "Sieben",
          "Der Pianist",
          "The Dark Knight",
          "Django Unchained",
          "Scary Movie",
          "Das Schweigen der Lämmer",
          "Der weise Hai",
          "Der Soldat James Ryan",
          "Inception",
          "Star Wars",
          "Die Verurteilten",
          "Terminator",
          "Das Streben nach Glück",
          "Oceans Eleven",
          "Matrix",
          "Gladiator",
          "Die zwoelf Geschworenen",
        ],
        games: [
          "The Legend of Zelda Ocarina of Time",
          "Super Mario",
          "Tetris",
          "Minecraft",
          "Grand Theft Auto V",
          "The Witcher III Wild Hunt",
          "Dark Souls",
          "Red Dead Redemption",
          "Half Life II",
          "Portal",
          "Final Fantasy",
          "Super Mario Bros",
          "Fallout New Vegas",
          "Elden Ring",
          "Halo the Master Chief Edition",
          "Tomb Raider",
          "Resident Evil IV",
          "Assassins Creed IV Black Flag",
          "Need for Speed Underground II",
          "Pokemon Red",
          "Counter-Strike Global Offensive",
          "The Elder Scrolls V Skyrim",
          "Metal Gear Solid",
          "World of Warcraft",
          "Pac-Man",
        ],
      };
      // Bestimmung der Kategorien mit Auswahl des ersten Worts 
      // Anhand aller vorhandenen Kategorien(keys)
      this.category = Object.keys(this.options)[0];
    }
  
    // Kategorie Auswahl
    setCategory(category) {
      // Check ob die Kategorie vorhanden ist
      if (!this.options.hasOwnProperty(category)) {
        return false;
      }
      // Test ob die Kategorie gesetzt werden kann
      this.category = category;
      // Ein neues Wort aus der Kategorie
      this.currentWord = this.getSecretWord(this.category);
      return true;
    }
  
    // zufällige Auswahl eines geheimen Wortes
    getSecretWord(category) {
      // zufälliger Index bezogen aus der Kategorie Länge
      let randomIndex = Math.floor(Math.random() * this.options[category].length);
      // Zufälliges Wort aus der gewählten Katgorie
      let secretWord = this.options[category][randomIndex];
      // Check ob die Liste der bereits gespielten Worte voll ist
      // wenn ja wird sie geleert
      if (this.playedWords[this.category] === this.options[this.category]) {
        this.playedWords[this.category] = [];
      }
      // Check ob das neue Wort bereits genutz wurde
      // solange das so ist soll von den übrigen Worten ein zufälliges ausgegeben werden
      while (this.playedWords[this.category].includes(secretWord)) {
        randomIndex = Math.floor(Math.random() * this.options[category].length);
        secretWord = this.options[category][randomIndex];
      }
      // das gewählte Wort kommt in die Liste bereits benutzter Worte
      this.playedWords[this.category].push(secretWord);
      // ausgabe vom zufälligen geheimen Wort 
      return secretWord;
    }
  
    // Prüfung ob der Input das richtige Format hat 
    validateGuess(letter) {
      // Ist nicht vorhanden
      if (!letter) {
        return false;
      }
      // Hat nicht bloß eine Länge von Eins
      if (letter.length !== 1) {
        return false;
      }
      // nicht schon vorher geraten 
      return !this.knownLettersList.includes(letter.toLowerCase());
    }
  
    // Spielverlaufaktualisierung alle richtig geratenen Buchstaben 
    // kommen in das Array für richtig geratene Buchstaben
    update(letter) {
      this.knownLettersList.push(letter.toLowerCase());
  
      // sollte der Buchstabe nicht im aktuellen Wort enthalten sein 
      // soll ein Versuch abgezogen werden
      if (!this.currentWord.toLowerCase().includes(letter)) {
        this.attempts--;
      }
    }

      // Format/Darstellung für das Wort 
    renderWord() {
      // Aufsplitten in ein Array um map anwenden zu können
      const characters = this.currentWord.split("");
      // einmal so darstellen zum rendern in gewünschtes Format
      return characters
      
        .map((char) => {
          // Richtig geratene Buchstaben Abgleich und Darstellung
          if (this.knownLettersList.includes(char.toLowerCase())) {
            return char;
            // Leerzeile im Geheimen Wort
          } else if (char === " ") {
            return char;
            // wenn noch nicht geraten soll _ dargestellt werden
          } else {
            return "_";
          }
        })
        // Alles wieder zurück ins String Format
        .join("");
    }
  
    // Emoji aufbau 
    renderEmoji() {
      // das Emoji als Array in eine Variable
      const Emoji = this.Emoji.split("");
      // die Länge soll sich dynamisch verändern je noch Versuchen
      return Emoji.slice(0, Emoji.length - this.attempts).join("");
    }
  
    // Gewinn Stat counter
    updateStats(gameResult) {
      // Erstellung eines Stat Objects für die Statistik Formatierung
      this.stats.push({
        word: this.currentWord,
        result: gameResult ? "win" : "loss",
      });
    }
  
    // Statistik welche Worte erraten wurden 
    getFormattedStats() {
      return this.stats
        .map((stat, index) => {
          // Darstellung aufsteigender Index das erratene Wort
          return `${index + 1}. ${stat.word} - ${stat.result}`;
        })
        .join("\n");
    }
  
    // Prüfung ob der Spieler gewonnen hat
    isWinning() {
      return this.currentWord === this.renderWord();
    }
  
      // Check ob das spiel noch läuft
    isGameOn() {
      // keine Versuche mehr übrig (Emoji volle Länge)
      if (this.attempts === 0) {
        return false;
      }
      // nach gewonnenem Spiel 
      if (this.isWinning()) {
        return false;
      }
      // ansonsten läuft es noch
      return true;
    }
  
    // Reset am Ende bei Continue für neuen Versuch
    reset() {
      // Liste der geratenen Buchstaben leeren
      this.knownLettersList = [];
      // Versuchanzahl wieder auf Emoji Länge hochsetzen
      this.attempts = this.Emoji.length;
      // neues Wort ziehen 
      this.currentWord = this.getSecretWord(this.category);
    }
  }
  
  module.exports = Hangman;

 