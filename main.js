new Vue({
  el: "#app",
  data: {
    satoshiHeight: 100,
    pikachuHeight: 100,
    gameIsRunning: false,
    logsGame: [],
    isLogs: false,
    items: [
      {
        name: "HP",
        chiso: 5,
        quality: 5,
        tien: 10,
        thumbail: "./images/hp.png",
      },
      {
        name: "Def",
        chiso: 10,
        quality: 5,
        tien: 10,
        thumbail: "./images/shield.png",
      },
    ],
    cash: 100,
    defSatoshi: 0,
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.resetHeight();
      this.isLogs = true;
      this.logsGame = [];
      this.cash = 100;
      this.defSatoshi = 0;
    },
    finalGame() {
      this.gameIsRunning = false;
      this.resetHeight();
      this.isLogs = false;
      this.logsGame = [];
      this.cash = 10;
    },
    resetHeight() {
      this.satoshiHeight = 100;
      this.pikachuHeight = 100;
    },
    attack() {
      this.playerCheckOption();
      var satoshiDame = this.satoshiAttack();
      var pikachuDame = this.pikachuAttack();
      // this.logsGame.unshift("Satoshi tấn công " + satoshiDame + " máu Pikachu");
      // this.logsGame.unshift("Pikachu tấn công " + pikachuDame + " máu Satoshi");
      document.getElementById("resultSatoshi").innerHTML =
        " - " + pikachuDame + " HP";
      document.getElementById("resultPikachu").innerHTML =
        " - " + satoshiDame + " HP";
      this.logGameAttack();
    },
    satoshiAttack() {
      var dame = Math.floor(Math.random() * 10);
      this.pikachuHeight -= dame;
      return dame;
    },
    pikachuAttack() {
      var dame = Math.floor(Math.random() * 10);
      var hasDef = dame - 5;
      if (this.defSatoshi > 0) {
        this.satoshiHeight -= hasDef;
        this.defSatoshi -= 5;
      } else {
        this.satoshiHeight -= dame;
      }
      console.log(this.defSatoshi);
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
      this.playerCheckOption();
      var satoshiDame = this.satoshiSpecialAttack();
      var pikachuDame = this.pikachuSpecialAttack();
      // this.logsGame.unshift("Satoshi tấn công " + satoshiDame + " máu Pikachu");
      // this.logsGame.unshift("Pikachu tấn công " + pikachuDame + " máu Satoshi");
      document.getElementById("resultSatoshi").innerHTML =
        " - " + pikachuDame + " HP";
      document.getElementById("resultPikachu").innerHTML =
        " - " + satoshiDame + " HP";
      this.logGameAttack();
    },
    heal() {
      if (this.satoshiHeight > 70) {
        alert("Máu quá cao, không thể hồi");
      } else if (this.satoshiHeight <= 60) {
        this.satoshiHeight += 10;
        document.getElementById("resultSatoshi").innerHTML = " + 10 HP";
        // this.pikachuAttack();
        // var pikachuDame = this.pikachuAttack();
        // this.logsGame.unshift("Satoshi đã hồi 10 HP");
        // this.logsGame.unshift(
        //   "Pikachu tấn công " + pikachuDame + " máu Satoshi"
        // );
        document.getElementById("resultPikachu").innerHTML = "";
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
        if (confirm("Bạn thắng rồi ! Bạn có muốn chơi lại không")) {
          this.finalGame();
          this.resetItems();
        } else {
          this.finalGame();
          this.resetItems();
        }
      }
      if (this.satoshiHeight <= 0) {
        if (confirm("Bạn thua rồi ! Bạn có muốn chơi lại không ?")) {
          this.finalGame();
          this.resetItems();
        } else {
          this.finalGame();
          this.resetItems();
        }
      }
    },
    logGameAttack() {
      if (this.logsGame.length == 6) {
        this.logsGame.splice(2, 2);
      }
    },
    buyItem(index) {
      this.items.forEach((item, i) => {
        var name = item.name;
        if (i == index) {
          if (this.cash > 0) {
            if (item.quality > 0) {
              // this.checkCash();
              if (index == 1) {
                this.defSatoshi += item.chiso;
                item.quality -= 1;
                this.cash -= item.tien;
              } else {
                if (this.satoshiHeight <= 70) {
                  this.satoshiHeight += item.chiso;
                  item.quality -= 1;
                  this.cash -= item.tien;
                } else {
                  alert("Máu của bạn chưa đủ điều kiện để mua item");
                }
              }
            } else {
              alert("Item " + name + " đã hết hàng");
              return false;
            }
          } else {
            alert("Bạn đã hết tiền");
            return false;
          }
        }
      });
    },
    resetItems() {
      this.items.forEach((item, i) => {
        item.quality = 5;
      });
    },
    addCoin() {
      alert(
        "Có cái nịt, dù add thêm được coin nhưng tui giới hạn số lượng item rồi, add làm gì :v"
      );
    },
  },
});
