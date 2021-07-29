new Vue({
  el: "#app",
  data: {
    satoshiHeight: 100,
    pikachuHeight: 100,
    gameIsRunning: false,
    logsGame: [],
    isLogs: false,
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.resetHeight();
      this.isLogs = true;
      this.logsGame = [];
    },
    finalGame() {
      this.gameIsRunning = false;
      this.resetHeight();
      this.isLogs = false;
      this.logsGame = [];
    },
    resetHeight() {
      this.satoshiHeight = 100;
      this.pikachuHeight = 100;
    },
    attack() {
      this.satoshiAttack();
      this.pikachuAttack();
      this.playerCheckOption();
      var satoshiDame = this.satoshiAttack();
      var pikachuDame = this.pikachuAttack();
      this.logsGame.unshift(
        "Satoshi attack " + satoshiDame + " height Pikachu"
      );
      this.logsGame.unshift(
        "Pikachu attack " + pikachuDame + " height Satoshi"
      );
      this.logGameAttack();
    },
    satoshiAttack() {
      var dame = Math.floor(Math.random() * 10);
      this.satoshiHeight -= Math.floor(Math.random() * 10);
      return dame;
    },
    pikachuAttack() {
      var dame = Math.floor(Math.random() * 10);
      this.pikachuHeight -= Math.floor(Math.random() * 10);
      return dame;
    },
    satoshiSpecialAttack() {
      var dame = Math.floor(Math.random() * 20);
      this.satoshiHeight -= Math.floor(Math.random() * 20);
      return dame;
    },
    pikachuSpecialAttack() {
      var dame = Math.floor(Math.random() * 20);
      this.pikachuHeight -= Math.floor(Math.random() * 20);
      return dame;
    },
    specialAttack() {
      this.satoshiSpecialAttack();
      this.pikachuSpecialAttack();
      this.playerCheckOption();
      var satoshiDame = this.satoshiSpecialAttack();
      var pikachuDame = this.pikachuSpecialAttack();
      this.logsGame.unshift(
        "Satoshi attack " + satoshiDame + " height Pikachu"
      );
      this.logsGame.unshift(
        "Pikachu attack " + pikachuDame + " height Satoshi"
      );
      this.logGameAttack();
    },
    heal() {
      if (this.satoshiHeight > 70) {
        alert("Height hight , no heal");
      } else if (this.satoshiHeight <= 60) {
        this.satoshiHeight += 10;
        this.pikachuAttack();
        var pikachuDame = this.pikachuAttack();
        this.logsGame.unshift("Satoshi heal 10 hp");
        this.logsGame.unshift(
          "Pikachu attack " + pikachuDame + " height Satoshi"
        );
        document.getElementById("heal").disabled = true;
      } else {
        this.satoshiHeight = 70;
      }
      this.logGameAttack();
      setTimeout(() => {
        document.getElementById("heal").disabled = false;
      }, 5000);
    },
    giveup() {
      this.finalGame();
      this.gameIsRunning = false;
      alert("You lose");
    },
    playerCheckOption() {
      if (this.pikachuHeight <= 0) {
        if (confirm("You win  ! You are ready")) {
          this.finalGame();
        } else {
          this.finalGame();
        }
      }
      if (this.satoshiHeight <= 0) {
        if (confirm("You lose  ! You are ready")) {
          this.finalGame();
        } else {
          this.finalGame();
        }
      }
    },
    logGameAttack() {
      if (this.logsGame.length == 6) {
        this.logsGame.splice(2, 2);
      }
    },
  },
  // watch: {
  //   pikachuHeight() {
  //     if (this.pikachuHeight <= 0) {
  //       alert("win");
  //       document.querySelector();
  //     }
  //   },
  //   satoshiHeight() {
  //     if (this.satoshiHeight <= 0) {
  //       alert("lose");
  //     }
  //   },
  // },
});
