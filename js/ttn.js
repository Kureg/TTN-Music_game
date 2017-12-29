var ctx;
//適当に追加した情報（バグるから変更しない）
var musicTime = 0;
var autoTime = 0.033 * bpm / 120;
var greatTime = 0.08 * bpm / 120;
var goodTime = 0.25 * bpm / 120;
var badTime = 0.4 * bpm / 120;
var notesMFive = 0.26 * bpm / 120;
var notesMOne = 0.2 * bpm / 120;
var notesMTwo = 0.13 * bpm / 120;
var notesMThree = 0.1 * bpm / 120;
var notesMFour = 0.06 * bpm / 120;
var u = 0, r = 0, g = 0;
var greatCount = 0, goodCount = 0, badCount = 0, renCount = 0, comboCount = 0;
var gTime = 0;
var autoRen = 0;
var bpm_c = 0, scroll_c= 1;
var combo = 0; var maxCombo = 0; var scoreCombo = 0;
var score = 0, scoreBasic = 0, scoreAdd = 0, scoreTime = 0;
var scoreGauge = 0, scoreGaugeMax, scoreGaugeNorma;
var normaWidth;
var notesMeasure = [];
var notesK = 0, notesG = 0;
var play = false;
var playOn;
var end = false, endTime;
var userAgent;
var ready = false;
var mode, modename;

var bpmlist = [], bpmchange = [], bpmchangetime = [];
var scrolllist = [];
var shokou, kousa;

var notesOne = [], notesTwo = [], notesFive = [], notesEight = [];

var auto = false;
var scroll = 1;

document.onkeydown = function(e){
  var key_code = e.keyCode;
  if(!auto){
    if(key_code == 70 || key_code == 74){ //F,J
      document.getElementById("men").currentTime = 0.002;
      document.getElementById("men").play();
      Judge(1);
    }
    if(key_code == 68 || key_code ==75){ //D,K
      document.getElementById("fuchi").currentTime = 0.002;
      document.getElementById("fuchi").play();
      Judge(2);
    }
  }
  if(ready && !play && userAgent.indexOf('chrome') != -1){
    if(key_code == 32){ //スペース
      playOn = setInterval(render, 16);
    }
  }
  if(!ready){
    if(key_code == 65){ // a：Auto
      if(!auto){
        auto = true;
      }else{
        auto = false;
      }
      readyoption();
    }
    if(key_code == 83){ // s：Scroll
      if(scroll == 4){
        scroll = 1;
      }else{
        scroll += 1;
      }
      readyoption();
    }
    if(key_code == 49){ // 1：easy
      if(difficulty[0] != 0){
        document.getElementById("men").currentTime = 0.002;
        document.getElementById("men").play();
        mode = 1; modename = "Easy";
        ready = true;
        start();
      }
    }
    if(key_code == 50){ // 2：normal
      if(difficulty[1] != 0){
        document.getElementById("men").currentTime = 0.002;
        document.getElementById("men").play();
        mode = 2; modename = "Normal";
        ready = true;
        start();
      }
    }
    if(key_code == 51){ // 3：hard
      if(difficulty[2] != 0){
        document.getElementById("men").currentTime = 0.002;
        document.getElementById("men").play();
        mode = 3; modename = "Hard";
        ready = true;
        start();
      }
    }
    if(key_code == 52){ // 4：insane
      if(difficulty[3] != 0){
        document.getElementById("men").currentTime = 0.002;
        document.getElementById("men").play();
        mode = 4; modename = "Insane";
        ready = true;
        start();
      }
    }
    if(key_code == 53){ // 5：?
      if(max_mode == 5){
        document.getElementById("men").currentTime = 0.002;
        document.getElementById("men").play();
        mode = 5; modename = "Insane";
        ready = true;
        start();
      }
    }
  }
}

function init(){
  document.getElementById("men").volume = 0.5;
  document.getElementById("fuchi").volume = 0.5;
  document.getElementById("bgm").volume = soundVolume / 100;
  var canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  userAgent = window.navigator.userAgent.toLowerCase();
  if(userAgent.indexOf('chrome') != -1){
    //背景
    ctx.fillStyle = "#F6E3CE";
    ctx.fillRect(0,0,800,400);
    //名前
    ctx.textAlign = "left";
    ctx.font = "34px 'りいてがき筆'";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(name, 20, 40);
    ctx.font = "34px 'りいてがき筆'";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.strokeText(name, 20, 40);
    //難易度表示
    ctx.fillStyle = "#000000"
    ctx.font = "34px 'Arial'";
    ctx.fillText("1：Easy", 100, 120);
    ctx.fillText("2：Normal", 100, 180);
    ctx.fillText("3：Hard", 100, 240);
    ctx.fillText("4：Insane", 100, 300);
    //星
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < difficulty[i]; j++){
        drawStar(300 + (j * 50), 85 + (i * 60));
      }
    }
  }else{
    ctx.textAlign = "center";
    ctx.fillStyle = "#000000";
    ctx.font = "50px 'Arial'";
    ctx.fillText("Should play with Chrome", 400, 200);
  }
}

function readyoption(){
  //背景
  ctx.fillStyle = "#F6E3CE";
  ctx.fillRect(0,0,800,400);
  //名前
  ctx.textAlign = "left";
  ctx.font = "34px 'りいてがき筆'";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(name, 20, 40);
  ctx.font = "34px 'りいてがき筆'";
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;
  ctx.strokeText(name, 20, 40);
  //難易度表示
  ctx.fillStyle = "#000000"
  ctx.font = "34px 'Arial'";
  ctx.fillText("1：Easy", 100, 120);
  ctx.fillText("2：Normal", 100, 180);
  ctx.fillText("3：Hard", 100, 240);
  ctx.fillText("4：Insane", 100, 300);
  //星
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < difficulty[i]; j++){
      drawStar(300 + (j * 50), 85 + (i * 60));
    }
  }
  if(auto){
    ctx.fillStyle = "#000000";
    ctx.font = "30px 'Arial'";
    ctx.fillText("Auto", 400, 350);
  }
  switch(scroll){
    case 2:
    ctx.fillStyle = "#000000";
    ctx.font = "30px 'Arial'";
    ctx.fillText("Scroll ×2", 500, 350);
    break;
    case 3:
    ctx.fillStyle = "#000000";
    ctx.font = "30px 'Arial'";
    ctx.fillText("Scroll ×3", 500, 350);
    break;
    case 4:
    ctx.fillStyle = "#000000";
    ctx.font = "30px 'Arial'";
    ctx.fillText("Scroll ×4", 500, 350);
    break;
  }
}

function render(){
  if(!play && soundStart <= 0){
    document.getElementById("bgm").play();
    play = true;
  }else if(!play){
    soundStart -= 16;
  }
  ctx.textAlign = "center";
  ctx.clearRect(0,0,800, 500);
  //背景
  ctx.fillStyle = "#F6E3CE";
  ctx.fillRect(0,0,800,400);
  //レーン
  ctx.fillStyle = "#222222";
  ctx.fillRect(140, 160, 660, 120);
  //判定の枠（大）
  ctx.strokeStyle = "#cccccc";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(200, 220, 35, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
  //判定の枠（小）
  ctx.beginPath();
  ctx.arc(200, 220, 23, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
  //名前
  ctx.textAlign = "left";
  ctx.font = "34px 'りいてがき筆'";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(name, 20, 40);
  ctx.font = "34px 'りいてがき筆'";
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;
  ctx.strokeText(name, 20, 40);
  //スコアゲージ
  ctx.lineWidth = 2;
  ctx.fillStyle = "#333333";
  ctx.fillRect(400, 126, 400, 30);
  if(scoreGauge >= scoreGaugeMax){
    ctx.fillStyle = "#ffff33";
  }else{
    ctx.fillStyle = "#ff3333";
  }
  ctx.fillRect(400, 126, 400 * scoreGauge / scoreGaugeMax, 30);
  ctx.strokeStyle = "#cccccc";
  ctx.strokeRect(400 + normaWidth, 126, 0, 30);
  //オート
  if(auto){
    if(Math.abs(notesOne[u] - musicTime) <= autoTime / 2 && notesTwo[u] == 1){
      document.getElementById("men").currentTime = 0.002;
      document.getElementById("men").play();
      Judge(1);
    }
    if(Math.abs(notesOne[u] - musicTime) <= autoTime / 2 && notesTwo[u] == 2){
      document.getElementById("fuchi").currentTime = 0.002;
      document.getElementById("fuchi").play();
      Judge(2);
    }
    if(notesFive[r] < musicTime && notesEight[r] > musicTime){
      if(autoRen <= 0){
      document.getElementById("men").currentTime = 0.002;
      document.getElementById("men").play();
      Judge(1);
      autoRen = 4;
      }
      else{
        autoRen -= 1;
      }
    }
  }

  //音符
  var notesL, notesJ;
  if(notesK < 10){
    notesL = 5;
  }else{
    notesL = notesK;
  }
  notesJ = notesL + 34;
  if(notesJ > notesOne.length){
    notesJ = notesOne.length;
  }
  for(var i = notesJ; i >= notesL - 5; i--){
    var xa;
    var xb;
    //赤
    if(notesTwo[i] == 1){
      var x = 200 + ((notesOne[i] - musicTime) * 800 * 0.4 * scrolllist[i] * scroll);
      ctx.fillStyle = "#cc3333";
      ctx.beginPath();
      ctx.arc(x, 220, 23, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle="#ffffff";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(x, 220, 23, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
      ctx.strokeStyle="#000000";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, 220, 25, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
    }

    //青
    else if(notesTwo[i] == 2){
      var x = 200 + ((notesOne[i] - musicTime) * 800 * 0.4 * scrolllist[i] * scroll);
      ctx.fillStyle = "#4466cc";
      ctx.beginPath();
      ctx.arc(x, 220, 23, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle="#ffffff";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(x, 220, 23, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
      ctx.strokeStyle="#000000";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, 220, 25, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
    }
    //連打
    else if(notesTwo[i] == 5){
      xa = 200 + ((notesOne[i] - musicTime) * 800 * 0.4 * scrolllist[i] * scroll);
      ctx.fillRect(xa, 195, xb - xa, 50);
      ctx.beginPath();
      ctx.moveTo(xa, 195);
      ctx.lineTo(xb, 195);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(xa, 245);
      ctx.lineTo(xb, 245);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(xa, 220, 23, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle="#ffffff";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(xa, 220, 23, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
      ctx.strokeStyle="#000000";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(xa, 220, 25, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
    }
    else if(notesTwo[i] == 8){
      xb = 200 + ((notesOne[i] - musicTime) * 800 * 0.4 * scrolllist[i] * scroll);
      ctx.fillStyle = "#cccc33";
      ctx.beginPath();
      ctx.arc(xb, 220, 25, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle="#000000";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(xb, 220, 25, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
    }
  }

  //判定
  ctx.textAlign = "center";
  if(gTime > 0 && g == 1){
    ctx.font =  "28px 'Arial'";
    ctx.fillStyle = "#FAAC58";
    ctx.fillText("Great", 200, 180);
    ctx.font =  "28px 'Arial'";
    ctx.strokeStyle = "#000000";
    ctx.strokeText("Great", 200, 180);
    gTime -= 0.1;
  }
  else if(gTime > 0 && g == 2){
    ctx.font =  "28px 'Arial'";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Good", 200, 180);
    ctx.font =  "28px 'Arial'";
    ctx.strokeStyle = "#000000";
    ctx.strokeText("Good", 200, 180);
    gTime -= 0.1;
  }
  else if(gTime > 0 && g == 3){
    ctx.font =  "28px 'Arial'";
    ctx.fillStyle = "#2E64FE";
    ctx.fillText("Bad", 200, 180);
    ctx.font =  "28px 'Arial'";
    ctx.strokeStyle = "#000000";
    ctx.strokeText("Bad", 200, 180);
    gTime -= 0.1;
  }

  switch(notesMeasure[notesG + 1]){
    case 1:
    if((musicTime - notesOne[u]) > notesMOne / 2 && notesTwo[u] != 5 && notesTwo[u] != 8){
      u += 1; combo = 0; notesK += 1; scoreGauge -= 2; badCount += 1; notesG += 1;
    }
    break;
    case 2:
    if((musicTime - notesOne[u]) > notesMTwo / 2 && notesTwo[u] != 5 && notesTwo[u] != 8){
      u += 1; combo = 0; notesK += 1; scoreGauge -= 2; badCount += 1; notesG += 1;
    }
    break;
    case 3:
    if((musicTime - notesOne[u]) > notesMThree / 2 && notesTwo[u] != 5 && notesTwo[u] != 8){
      u += 1; combo = 0; notesK += 1; scoreGauge -= 2; badCount += 1; notesG += 1;
    }
    break;
    case 4:
    if((musicTime - notesOne[u]) > notesMFour / 2 && notesTwo[u] != 5 && notesTwo[u] != 8){
      u += 1; combo = 0; notesK += 1; scoreGauge -= 2; badCount += 1; notesG += 1;
    }
    break;
    default:
    if((musicTime - notesOne[u]) > notesMOne / 2 && notesTwo[u] != 5 && notesTwo[u] != 8){
      u += 1; combo = 0; notesK += 1; scoreGauge -= 2; badCount += 1; notesG += 1;
    }
    break;
  }

  if((musicTime - notesEight[r]) > badTime / 2){
    u += 2; r += 1; notesK += 2;
    if(auto){
      autoRen = 0;
    }
  }
  if(scoreGauge < 0){
    scoreGauge = 0
  }
  //コンボ数
  ctx.fillStyle = "#F5D0A9";
  ctx.fillRect(0, 160, 140, 120);
  if(combo > 10){
    ctx.font =  "50px 'Arial'";
    ctx.fillStyle = "#000000";
    ctx.fillText(combo, 70, 235);
  }
  //スコア
  ctx.textAlign = "right";
  ctx.font = "40px 'Arial'";
  ctx.fillStyle = "#000000";
  ctx.fillText(score, 790, 110);
  if(scoreTime > 0){
    ctx.font = "36px 'Arial'";
    ctx.fillStyle = "#000000";
    ctx.fillText("+" + scoreAdd, 790, 78);
    scoreTime -= 1;
  }
  //難易度
  ctx.font = "36px 'Arial'";
  if(mode == 5){
    ctx.fillStyle = "#ff3333";
  }
  ctx.fillText(modename, 780, 46);
  //オプション
  ctx.textAlign = "left";
  if(auto){
    ctx.fillStyle = "#000000";
    ctx.font = "30px 'Arial'";
    ctx.fillText("Auto", 400, 350);
  }
  switch(scroll){
    case 2:
    ctx.fillStyle = "#000000";
    ctx.font = "30px 'Arial'";
    ctx.fillText("Scroll ×2", 500, 350);
    break;
    case 3:
    ctx.fillStyle = "#000000";
    ctx.font = "30px 'Arial'";
    ctx.fillText("Scroll ×3", 500, 350);
    break;
    case 4:
    ctx.fillStyle = "#000000";
    ctx.font = "30px 'Arial'";
    ctx.fillText("Scroll ×4", 500, 350);
    break;
  }

  if(!end && u == notesOne.length){
    endTime = 3;
    end = true;
  }
  if(end){
    endTime -= 0.02;
  }
  if(end && endTime <= 0){
    clearInterval(playOn);
    result();
  }
  if(bpmchangetime[bpm_c] <= musicTime){
    bpm = bpmchange[bpm_c];
    bpm_c += 1;
  }

  musicTime += 0.016 * bpm/120;
}

function start(){
  ctx.textAlign = "center";
  notesRearrange();
  scoreSystem();
  ctx.clearRect(0,0,800, 500);
  //背景
  ctx.fillStyle = "#F6E3CE";
  ctx.fillRect(0,0,800,400);
  //レーン
  ctx.fillStyle = "#222222";
  ctx.fillRect(140, 160, 660, 120);
  //判定の枠（大）
  ctx.strokeStyle = "#cccccc";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(200, 220, 35, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
  //判定の枠（小）
  ctx.beginPath();
  ctx.arc(200, 220, 23, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
  //名前
  ctx.textAlign = "left";
  ctx.font = "34px 'りいてがき筆'";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(name, 20, 40);
  ctx.font = "34px 'りいてがき筆'";
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;
  ctx.strokeText(name, 20, 40);
  //スコアゲージ
  ctx.lineWidth = 2;
  ctx.fillStyle = "#333333";
  ctx.fillRect(400, 126, 400, 30);
  ctx.strokeStyle = "#cccccc";
  ctx.strokeRect(400 + normaWidth, 126, 0, 30);
  //コンボ数0
  ctx.fillStyle = "#F5D0A9";
  ctx.fillRect(0, 160, 140, 120);
  //待機
  ctx.textAlign = "center";
  ctx.fillStyle = "#cccccc";
  ctx.font = "30px 'Arial'";
  ctx.fillText("Press the Spacebar", 380, 230);
  //スコア
  ctx.textAlign = "right";
  ctx.font = "40px 'Arial'";
  ctx.fillStyle = "#000000";
  ctx.fillText(score, 790, 110);
  //難易度
  ctx.font = "36px 'Arial'";
  if(mode == 5){
    ctx.fillStyle = "#ff3333";
  }
  ctx.fillText(modename, 780, 46);
  //オプション
  ctx.textAlign = "left";
  if(auto){
    ctx.fillStyle = "#000000";
    ctx.font = "30px 'Arial'";
    ctx.fillText("Auto", 400, 350);
  }
  switch(scroll){
    case 2:
    ctx.fillStyle = "#000000";
    ctx.font = "30px 'Arial'";
    ctx.fillText("Scroll ×2", 500, 350);
    break;
    case 3:
    ctx.fillStyle = "#000000";
    ctx.font = "30px 'Arial'";
    ctx.fillText("Scroll ×3", 500, 350);
    break;
    case 4:
    ctx.fillStyle = "#000000";
    ctx.font = "30px 'Arial'";
    ctx.fillText("Scroll ×4", 500, 350);
    break;
  }
}

function result(){
  ctx.textAlign = "center";
  ctx.clearRect(0,0,800, 500);
  //背景
  ctx.fillStyle = "#F6E3CE";
  ctx.fillRect(0,0,800,400);
  //名前
  ctx.textAlign = "left";
  ctx.font = "34px 'りいてがき筆'";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(name, 20, 40);
  ctx.font = "34px 'りいてがき筆'";
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;
  ctx.strokeText(name, 20, 40);
  //スコアゲージ
  ctx.lineWidth = 2;
  ctx.fillStyle = "#333333";
  ctx.fillRect(96, 136, 408, 38);
  if(scoreGauge >= scoreGaugeMax){
    ctx.fillStyle = "#ffff33";
  }else{
    ctx.fillStyle = "#ff3333";
  }
  ctx.fillRect(100, 140, 400 * scoreGauge / scoreGaugeMax, 30);
  ctx.strokeStyle = "#cccccc";
  ctx.strokeRect(100 + normaWidth, 140, 0, 30);
  //スコア
  ctx.textAlign = "right";
  ctx.font = "50px 'Arial'";
  ctx.fillStyle = "#000000";
  ctx.fillText(score, 500, 130);
  //コメント
  ctx.textAlign = "center";
  ctx.font = "44px 'りいてがき筆'";
  if(scoreGauge >= scoreGaugeNorma){
    ctx.fillStyle = "#ffffff";
    ctx.fillText("ノルマクリア成功", 300, 200);
    ctx.strokeStyle = "#ff3333";
    ctx.lineWidth = 2;
    ctx.strokeText("ノルマクリア成功", 300, 200);
  }
  else{
    ctx.fillStyle = "#ffffff";
    ctx.fillText("ノルマクリア失敗", 300, 200);
    ctx.strokeStyle = "#3333ff";
    ctx.lineWidth = 2;
    ctx.strokeText("ノルマクリア失敗", 300, 200);
  }
  //詳細結果
  ctx.textAlign = "right";
  ctx.font = "26px 'Arial'";
  ctx.fillStyle = "#000000";
  ctx.fillText("最大コンボ", 360, 230);
  ctx.fillText(comboCount, 440, 230);
  ctx.fillStyle = "#FAAC58";
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;
  ctx.fillText("Great", 360, 260)
  ctx.strokeText("Great", 360, 260)
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("Good", 360, 290)
  ctx.strokeText("Good", 360, 290)
  ctx.fillStyle = "#2E64FE";
  ctx.fillText("Bad", 360, 320)
  ctx.strokeText("Bad", 360, 320)
  ctx.fillStyle = "#000000";
  ctx.fillText(greatCount, 440, 260);
  ctx.fillText(goodCount, 440, 290);
  ctx.fillText(badCount, 440, 320);
  ctx.fillStyle = "#000000";
  ctx.fillText("連打数", 360, 350);
  ctx.fillText(renCount, 440, 350);
  //難易度
  ctx.textAlign = "right";
  ctx.font = "36px 'Arial'";
  if(mode == 5){
    ctx.fillStyle = "#ff3333";
  }
  ctx.fillText(modename, 780, 46);
}

function drawStar(x, y){
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 12, y + 38);
  ctx.lineTo(x - 19, y + 14);
  ctx.lineTo(x + 19, y + 14);
  ctx.lineTo(x - 12, y + 38);
  ctx.closePath();
  ctx.strokeStyle = "#ff3333";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  ctx.fill();
}

function Judge(num){
  if(notesTwo[u] != 5 && notesTwo[u] != 8){
    if(Math.abs(notesOne[u] - musicTime) <= greatTime / 2  && notesTwo[u] == num){
      notesOne[u] = -1;
      u += 1; greatCount += 1;
      g = 1; gTime = 3; combo += 1; notesK += 1; scoreGauge += 1; notesG += 1;
      scoreAdd = shokou + kousa * kosa(combo);
      score += scoreAdd;
      scoreTime = 20;
      if(combo % 100 == 0 && combo != 0){
        scoreAdd = 10000 + scoreAdd;
        score += 10000;
      }
      if(combo > comboCount){
        comboCount = combo;
      }
      if(scoreGauge > scoreGaugeMax){
        scoreGauge = scoreGaugeMax;
      }
    }else if(Math.abs(notesOne[u] - musicTime) <= goodTime / 2 && notesTwo[u] == num){
      notesOne[u] = -1; goodCount += 1;
      u += 1; g = 2; gTime = 3; combo += 1; notesK += 1; scoreGauge += 0.5; notesG += 1;
      var tenDigit = Math.floor(((shokou + kousa * kosa(combo)) / 2) / 10);
      scoreAdd = tenDigit * 10;
      score += scoreAdd;
      scoreTime = 20;
      if(combo % 100 == 0 && combo != 0){
        scoreAdd = 10000 + scoreAdd;
        score += 10000;
      }
      if(combo > comboCount){
        comboCount = combo;
      }
      if(scoreGauge > scoreGaugeMax){
        scoreGauge = scoreGaugeMax;
      }
    }else if(Math.abs(notesOne[u] - musicTime) <= badTime / 2 && notesTwo[u] == num){
      notesOne[u] = -1; badCount += 1;
      u += 1; g = 3; gTime = 3; combo = 0; notesK += 1; scoreGauge -= 2; notesG += 1;
      if(scoreGauge < 0){
        scoreGauge = 0
      }
    }
  }
  if(notesFive[r] < musicTime && notesEight[r] > musicTime){
    scoreAdd = 200; renCount += 1;
    score += scoreAdd;
    scoreTime = 20;
  }
}

function notesRearrange(){
  var notes = [];
  switch (mode) {
    case 1:
    notes = notesEasy;
    break;
    case 2:
    notes = notesNormal;
    break;
    case 3:
    notes = notesHard;
    break;
    case 4:
    notes = notesInsane;
    break;
    case 5:
    notes = notesInsaneTwo;
    break;
  }
  var v = noteJudgeTime;
  var bpm_a = bpm, scroll_a = scroll;
  var bpm_b = bpm;
  var xnotes = 0;
  var measureC = measureA, measureD = measureB;
  for(i = 0; i < notes.length; i++){
    var jk = 0;
    for(j = 0; j < notes[i].length; j++){
      if(notes[i][j] == 0){
        v += 2 * (measureA / measureB) / (notes[i].length - jk);
        xnotes += 1;
        continue;
      }
      else if(notes[i][j] == 1 || notes[i][j] == 3){
        notesOne.push(v);
        notesTwo.push(1);
        bpmlist.push(bpm_a);
        scrolllist.push(scroll_a);
        v += 2 * (measureA / measureB) / (notes[i].length - jk);
        scoreBasic += 1; scoreCombo += 1;

        if(xnotes == 0 && i != 0 && j != 0){
          if(j - jk != 0){
           if(notes[i].length - jk >= 24 * measureA / measureB){
             notesMeasure.push(4);
           }
           else if(notes[i].length - jk >= 16 * measureA / measureB){
             notesMeasure.push(3);
           }
           else if(notes[i].length -jk >= 12 * measureA / measureB){
             notesMeasure.push(2);
           }
           else if(notes[i].length - jk >= 8 * measureA / measureB){
             notesMeasure.push(1);
           }
           else if(notes[i].length - jk >= 6 * measureA / measureB){
             notesMeasure.push(5);
           }
           else{
             notesMeasure.push(0);
           }
          }
          else{
            if(notes[i-1].length - jk >= 24 * measureC / measureD){
              notesMeasure.push(4);
            }
            else if(notes[i-1].length - jk >= 16 * measureC / measureD){
              notesMeasure.push(3);
            }
            else if(notes[i-1].length -jk >= 12 * measureC / measureD){
              notesMeasure.push(2);
            }
            else if(notes[i-1].length - jk >= 8 * measureC / measureD){
              notesMeasure.push(1);
            }
            else if(notes[i-1].length - jk >= 6 * measureC / measureD){
              notesMeasure.push(5);
            }
            else{
              notesMeasure.push(0);
            }
            measureC = measureA;
            measureD = measureB;
          }
        }
        else if(xnotes == 1){
          if(j - jk != 0){
            if(notes[i].length - jk >= 48 * measureA / measureB){
              notesMeasure.push(4);
            }
            else if(notes[i].length - jk >= 24 * measureA / measureB){
              notesMeasure.push(2);
            }
            else if(notes[i].length - jk >= 16 * measureA / measureB){
              notesMeasure.push(1);
            }
            else if(notes[i].length - jk >= 12 * measureA / measureB){
              notesMeasure.push(5);
            }
            else{
              notesMeasure.push(0);
            }
          }
          else{
            if(notes[i-1].length - jk >= 48 * measureC / measureD){
              notesMeasure.push(4);
            }
            else if(notes[i-1].length - jk >= 24 * measureC / measureD){
              notesMeasure.push(2);
            }
            else if(notes[i-1].length - jk >= 16 * measureC / measureD){
              notesMeasure.push(1);
            }
            else if(notes[i-1].length - jk >= 12 * measureC / measureD){
              notesMeasure.push(5);
            }
            else{
              notesMeasure.push(0);
            }
            measureC = measureA;
            measureD = measureB;
          }
        }
        else if(xnotes == 2){
          if(j - jk != 0){
            if(notes[i].length - jk >= 48 * measureA / measureB){
              notesMeasure.push(3);
            }
            else if(notes[i].length - jk >= 24 * measureA / measureB){
              notesMeasure.push(1);
            }
            else{
              notesMeasure.push(0);
            }
          }
          else{
            if(notes[i-1].length - jk >= 48 * measureC / measureD){
              notesMeasure.push(3);
            }
            else if(notes[i-1].length - jk >= 24 * measureC / measureD){
              notesMeasure.push(1);
            }
            else{
              notesMeasure.push(0);
            }
            measureC = measureA;
            measureD = measureB;
          }
        }
        else if(xnotes == 3){
          if(j - jk != 0){
            if(notes[i].length - jk >= 48 * measureA / measureB){
              notesMeasure.push(2);
            }
            else if(notes[i].length - jk >= 24 * measureA / measureB){
              notesMeasure.push(5);
            }
            else{
              notesMeasure.push(0);
            }
          }
          else{
            if(notes[i-1].length - jk >= 48 * measureC / measureD){
              notesMeasure.push(2);
            }
            else if(notes[i-1].length - jk >= 24 * measureC / measureD){
              notesMeasure.push(5);
            }
            else{
              notesMeasure.push(0);
            }
            measureC = measureA;
            measureD = measureB;
          }
        }
        else if(xnotes == 5){
          if(j - jk != 0){
            if(notes[i].length - jk >= 48 * measureA / measureB){
              notesMeasure.push(1);
            }
            else{
              notesMeasure.push(0);
            }
          }
          else{
            if(notes[i-1].length - jk >= 48 * measureC / measureD){
              notesMeasure.push(2);
            }
            else{
              notesMeasure.push(0);
            }
            measureC = measureA;
            measureD = measureB;
          }
        }
        else if(xnotes == 7){
          if(j - jk != 0){
            if(notes[i].length - jk >= 48 * measureA / measureB){
              notesMeasure.push(5);
            }
            else{
              notesMeasure.push(0);
            }
          }
          else{
            if(notes[i-1].length - jk >= 48 * measureC / measureD){
              notesMeasure.push(5);
            }
            else{
              notesMeasure.push(0);
            }
            measureC = measureA;
            measureD = measureB;
          }
        }
        else{
            notesMeasure.push(0);
        }
        xnotes = 0;
        continue;
      }
      else if(notes[i][j] == 2 || notes[i][j] == 4){
        notesOne.push(v);
        notesTwo.push(2);
        bpmlist.push(bpm_a);
        scrolllist.push(scroll_a);
        v += 2 * (measureA / measureB) / (notes[i].length - jk);
        scoreBasic += 1; scoreCombo += 1;

        if(xnotes == 0 && i != 0 && j != 0){
          if(j - jk != 0){
           if(notes[i].length - jk >= 24 * measureA / measureB){
             notesMeasure.push(4);
           }
           else if(notes[i].length - jk >= 16 * measureA / measureB){
             notesMeasure.push(3);
           }
           else if(notes[i].length -jk >= 12 * measureA / measureB){
             notesMeasure.push(2);
           }
           else if(notes[i].length - jk >= 8 * measureA / measureB){
             notesMeasure.push(1);
           }
           else if(notes[i].length - jk >= 6 * measureA / measureB){
             notesMeasure.push(5);
           }
           else{
             notesMeasure.push(0);
           }
          }
          else{
            if(notes[i-1].length - jk >= 24 * measureC / measureD){
              notesMeasure.push(4);
            }
            else if(notes[i-1].length - jk >= 16 * measureC / measureD){
              notesMeasure.push(3);
            }
            else if(notes[i-1].length -jk >= 12 * measureC / measureD){
              notesMeasure.push(2);
            }
            else if(notes[i-1].length - jk >= 8 * measureC / measureD){
              notesMeasure.push(1);
            }
            else if(notes[i-1].length - jk >= 6 * measureC / measureD){
              notesMeasure.push(5);
            }
            else{
              notesMeasure.push(0);
            }
            measureC = measureA;
            measureD = measureB;
          }
        }
        else if(xnotes == 1){
          if(j - jk != 0){
            if(notes[i].length - jk >= 48 * measureA / measureB){
              notesMeasure.push(4);
            }
            else if(notes[i].length - jk >= 24 * measureA / measureB){
              notesMeasure.push(2);
            }
            else if(notes[i].length - jk >= 16 * measureA / measureB){
              notesMeasure.push(1);
            }
            else if(notes[i].length - jk >= 12 * measureA / measureB){
              notesMeasure.push(5);
            }
            else{
              notesMeasure.push(0);
            }
          }
          else{
            if(notes[i-1].length - jk >= 48 * measureC / measureD){
              notesMeasure.push(4);
            }
            else if(notes[i-1].length - jk >= 24 * measureC / measureD){
              notesMeasure.push(2);
            }
            else if(notes[i-1].length - jk >= 16 * measureC / measureD){
              notesMeasure.push(1);
            }
            else if(notes[i-1].length - jk >= 12 * measureC / measureD){
              notesMeasure.push(5);
            }
            else{
              notesMeasure.push(0);
            }
            measureC = measureA;
            measureD = measureB;
          }
        }
        else if(xnotes == 2){
          if(j - jk != 0){
            if(notes[i].length - jk >= 48 * measureA / measureB){
              notesMeasure.push(3);
            }
            else if(notes[i].length - jk >= 24 * measureA / measureB){
              notesMeasure.push(1);
            }
            else{
              notesMeasure.push(0);
            }
          }
          else{
            if(notes[i-1].length - jk >= 48 * measureC / measureD){
              notesMeasure.push(3);
            }
            else if(notes[i-1].length - jk >= 24 * measureC / measureD){
              notesMeasure.push(1);
            }
            else{
              notesMeasure.push(0);
            }
            measureC = measureA;
            measureD = measureB;
          }
        }
        else if(xnotes == 3){
          if(j - jk != 0){
            if(notes[i].length - jk >= 48 * measureA / measureB){
              notesMeasure.push(2);
            }
            else if(notes[i].length - jk >= 24 * measureA / measureB){
              notesMeasure.push(5);
            }
            else{
              notesMeasure.push(0);
            }
          }
          else{
            if(notes[i-1].length - jk >= 48 * measureC / measureD){
              notesMeasure.push(2);
            }
            else if(notes[i-1].length - jk >= 24 * measureC / measureD){
              notesMeasure.push(5);
            }
            else{
              notesMeasure.push(0);
            }
            measureC = measureA;
            measureD = measureB;
          }
        }
        else if(xnotes == 5){
          if(j - jk != 0){
            if(notes[i].length - jk >= 48 * measureA / measureB){
              notesMeasure.push(1);
            }
            else{
              notesMeasure.push(0);
            }
          }
          else{
            if(notes[i-1].length - jk >= 48 * measureC / measureD){
              notesMeasure.push(2);
            }
            else{
              notesMeasure.push(0);
            }
            measureC = measureA;
            measureD = measureB;
          }
        }
        else if(xnotes == 7){
          if(j - jk != 0){
            if(notes[i].length - jk >= 48 * measureA / measureB){
              notesMeasure.push(5);
            }
            else{
              notesMeasure.push(0);
            }
          }
          else{
            if(notes[i-1].length - jk >= 48 * measureC / measureD){
              notesMeasure.push(5);
            }
            else{
              notesMeasure.push(0);
            }
            measureC = measureA;
            measureD = measureB;
          }
        }
        else{
            notesMeasure.push(0);
        }
        xnotes = 0;
        continue;
      }
      else if(notes[i][j] == 5 || notes[i][j] == 6 || notes[i][j] == 7){
        notesOne.push(v);
        notesTwo.push(5);
        notesFive.push(v);
        bpmlist.push(bpm_a);
        scrolllist.push(scroll_a);
        v += 2 * (measureA / measureB) / (notes[i].length - jk);
        continue;
      }
      else if(notes[i][j] == 8){
        notesOne.push(v);
        notesTwo.push(8);
        notesEight.push(v);
        bpmlist.push(bpm_a);
        scrolllist.push(scroll_a);
        v += 2 * (measureA / measureB) / (notes[i].length - jk);
        continue;
      }

      var ij = notes[i][j];
      ij.toString();
      if(ij.substr(0, 8) == "#MEASURE"){
        var mea = ij.slice(9);
        var kea = mea.split("/");
        measureA = kea[0];
        measureB = kea[1]
        Number(measureA);
        Number(measureB);
      }
      else if(ij.substr(0, 10) == "#BPMCHANGE"){
        bpm_a = parseInt(ij.slice(11), 10);
        bpmchange.push(bpm_a);
        bpmchangetime.push(v);
      }
      else if(notes[i][j].substr(0, 7) == "#SCROLL"){
        scroll_a = parseFloat(ij.slice(8), 10)
      }
      jk += 1;
    }
  }

}

function scoreSystem(){
  var tenjoKari;

  switch(difficulty[mode-1]){
    case 1:
    switch(mode){
      case 1:
      tenjoKari = 260000;
      scoreGaugeMax = scoreBasic * 0.6;
      scoreGaugeNorma = scoreBasic * 0.36;
      break;
      case 2:
      tenjoKari = 560000;
      scoreGaugeMax = scoreBasic * 0.656;
      scoreGaugeNorma = scoreBasic * 0.459;
      break;
      case 3:
      tenjoKari = 760000;
      scoreGaugeMax = scoreBasic * 0.775;
      scoreGaugeNorma = scoreBasic * 0.543;
      break;
      case 4:
      case 5:
      tenjoKari = 860000;
      scoreGaugeMax = scoreBasic * 0.707;
      scoreGaugeNorma = scoreBasic * 0.566;
      break;
    }
    case 2:
    switch(mode){
      case 1:
      tenjoKari = 280000;
      scoreGaugeMax = scoreBasic * 0.633;
      scoreGaugeNorma = scoreBasic * 0.38;
      break;
      case 2:
      tenjoKari = 580000;
      scoreGaugeMax = scoreBasic * 0.656;
      scoreGaugeNorma = scoreBasic * 0.459;
      break;
      case 3:
      tenjoKari = 780000;
      scoreGaugeMax = scoreBasic * 0.775;
      scoreGaugeNorma = scoreBasic * 0.543;
      break;
      case 4:
      case 5:
      tenjoKari = 880000;
      scoreGaugeMax = scoreBasic * 0.707;
      scoreGaugeNorma = scoreBasic * 0.566;
      break;
    }
    case 3:
    switch(mode){
      case 1:
      tenjoKari = 300000;
      scoreGaugeMax = scoreBasic * 0.633;
      scoreGaugeNorma = scoreBasic * 0.38;
      break;
      case 2:
      tenjoKari = 600000;
      scoreGaugeMax = scoreBasic * 0.695;
      scoreGaugeNorma = scoreBasic * 0.486;
      break;
      case 3:
      tenjoKari = 800000;
      scoreGaugeMax = scoreBasic * 0.725;
      scoreGaugeNorma = scoreBasic * 0.508;
      break;
      case 4:
      case 5:
      tenjoKari = 900000;
      scoreGaugeMax = scoreBasic * 0.707;
      scoreGaugeNorma = scoreBasic * 0.566;
      break;
    }
    case 4:
    switch(mode){
      case 1:
      tenjoKari = 320000;
      scoreGaugeMax = scoreBasic * 0.733;
      scoreGaugeNorma = scoreBasic * 0.44;
      break;
      case 2:
      tenjoKari = 620000;
      scoreGaugeMax = scoreBasic * 0.703;
      scoreGaugeNorma = scoreBasic * 0.492;
      break;
      case 3:
      tenjoKari = 820000;
      scoreGaugeMax = scoreBasic * 0.691;
      scoreGaugeNorma = scoreBasic * 0.484;
      break;
      case 4:
      case 5:
      tenjoKari = 920000;
      scoreGaugeMax = scoreBasic * 0.707;
      scoreGaugeNorma = scoreBasic * 0.566;
      break;
    }
    case 5:
    switch(mode){
      case 1:
      tenjoKari = 340000;
      scoreGaugeMax = scoreBasic * 0.733;
      scoreGaugeNorma = scoreBasic * 0.44;
      break;
      case 2:
      tenjoKari = 640000;
      scoreGaugeMax = scoreBasic * 0.75;
      scoreGaugeNorma = scoreBasic * 0.525;
      break;
      case 3:
      tenjoKari = 840000;
      scoreGaugeMax = scoreBasic * 0.675;
      scoreGaugeNorma = scoreBasic * 0.472;
      break;
      case 4:
      case 5:
      tenjoKari = 940000;
      scoreGaugeMax = scoreBasic * 0.707;
      scoreGaugeNorma = scoreBasic * 0.566;
      break;
    }
    case 6:
    switch(mode){
      case 2:
      tenjoKari = 660000;
      scoreGaugeMax = scoreBasic * 0.75;
      scoreGaugeNorma = scoreBasic * 0.525;
      break;
      case 3:
      tenjoKari = 860000;
      scoreGaugeMax = scoreBasic * 0.687;
      scoreGaugeNorma = scoreBasic * 0.481;
      break;
      case 4:
      case 5:
      tenjoKari = 960000;
      scoreGaugeMax = scoreBasic * 0.707;
      scoreGaugeNorma = scoreBasic * 0.566;
      break;
    }
    case 7:
    switch(mode){
      case 2:
      tenjoKari = 680000;
      scoreGaugeMax = scoreBasic * 0.75;
      scoreGaugeNorma = scoreBasic * 0.525;
      break;
      case 3:
      tenjoKari = 880000;
      scoreGaugeMax = scoreBasic * 0.687;
      scoreGaugeNorma = scoreBasic * 0.481;
      break;
      case 4:
      case 5:
      tenjoKari = 980000;
      scoreGaugeMax = scoreBasic * 0.707;
      scoreGaugeNorma = scoreBasic * 0.566;
      break;
    }
    case 8:
    switch(mode){
      case 3:
      tenjoKari = 900000;
      scoreGaugeMax = scoreBasic * 0.687;
      scoreGaugeNorma = scoreBasic * 0.481;
      break;
      case 4:
      case 5:
      tenjoKari = 1000000;
      scoreGaugeMax = scoreBasic * 0.7;
      scoreGaugeNorma = scoreBasic * 0.56;
      break;
    }
    break;
    case 9:
    switch(mode){
      case 4:
      case 5:
      tenjoKari = 1040000;
      scoreGaugeMax = scoreBasic * 0.76;
      scoreGaugeNorma = scoreBasic * 0.61;
      break;
    }
    case 10:
    switch(mode){
      case 4:
      case 5:
      tenjoKari = 1080000;
      scoreGaugeMax = scoreBasic * 0.76;
      scoreGaugeNorma = scoreBasic * 0.61;
      break;
    }
  }
  normaWidth = 400 * scoreGaugeNorma / scoreGaugeMax;

  var i = tenjoKari - Math.floor(scoreCombo / 100) * 10000;

  var j = (i / scoreCombo) / 2;
  var tenDigit = Math.floor(j / 10);
  if(j % 10 >= 5){
    shokou = tenDigit * 10 + 10;
  }else{
    shokou = tenDigit * 10;
  }
  var ki = shokou / 8;
  tenDigit = Math.floor(ki / 10);
  if(ki % 10 >= 5){
    kousa = tenDigit * 10 + 10;
  }else{
    kousa = tenDigit * 10;
  }
}

function kosa(i){
  var p;
  if(i < 10){
    p = 0;
  }else if(i < 30){
    p = 1;
  }else if(i < 50){
    p = 2;
  }else if(i < 100){
    p = 4;
  }else{
    p = 8;
  }
  return p;
}
