var ctx;
//適当に追加した情報（バグるから変更しない）
var autoTime = 0.05;
var greatTime = 0.05;
var goodTime = 0.2;
var badTime = 0.35;
var u = 0, k = 0, r = 0, g = 0;
var gTime = 0;
var autoRen = 0;
var combo = 0; var maxCombo = 0; var scoreCombo = 0;
var score = 0, scoreBasic = 0, scoreAdd = 0, scoreTime = 0;
var scoreGauge = 0, scoreGaugeMax, scoreGaugeNorma;
var notesK = 0, notesS = 0,notesG = 0;
var play = false;
var userAgent;

document.onkeydown = function(e){
  var key_code = e.keyCode;
  if(!auto){
    if(key_code == 70 || key_code == 74){ //F,J面
      document.getElementById("men").currentTime = 0.002;
      document.getElementById("men").play();
      menJudge();
    }
    if(key_code == 68 || key_code ==75){ //D,K縁
      document.getElementById("fuchi").currentTime = 0.002;
      document.getElementById("fuchi").play();
      fuchiJudge();
    }
  }
  if(!play && userAgent.indexOf('chrome') != -1){
    if(key_code == 32){ //スペース
      setInterval(render, 16);
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
    ctx.strokeRect(624, 126, 0, 30);
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
  }else{
    ctx.textAlign = "center";
    ctx.fillStyle = "#000000";
    ctx.font = "50px 'Arial'";
    ctx.fillText("Should play with Chrome", 400, 200);
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
  ctx.strokeRect(624, 126, 0, 30);
  //オート
  if(auto){
    if(Math.abs(notesOne[u] - musicTime) <= autoTime / 2){
      document.getElementById("men").currentTime = 0.002;
      document.getElementById("men").play();
      menJudge();
    }
    if(Math.abs(notesTwo[k] - musicTime) <= autoTime / 2){
      document.getElementById("fuchi").currentTime = 0.002;
      document.getElementById("fuchi").play();
      fuchiJudge();
    }
    if(notesFive[r] < musicTime && notesEight[r] > musicTime){
      if(autoRen <= 0){
      document.getElementById("men").currentTime = 0.002;
      document.getElementById("men").play();
      menJudge();
      autoRen = 4;
      }
      else{
        autoRen -= 1;
      }
    }
  }

  //面
  var notesL, notesJ;
  if(notesK < 10){
    notesL = 5;
  }else{
    notesL = notesK;
  }
  notesJ = notesL + 20;
  if(notesJ > notesOne.length){
    notesJ = notesOne.length;
  }
  for(var i = notesL - 5; i < notesJ; i++){
    var x = 200 + (1 * ((notesOne[i] - musicTime) * 800 * 0.4));
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
  //縁
  if(notesS < 10){
    notesL = 5;
  }else{
    notesL = notesS;
  }
  notesJ = notesL + 20;
  if(notesJ > notesOne.length){
    notesJ = notesOne.length;
  }
  for(var i = notesL - 5; i < notesJ; i++){
    var x = 200 + (1 * ((notesTwo[i] - musicTime) * 800 * 0.4));
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
  if(notesG < 3){
    notesL = 1;
  }else{
    notesL = notesG;
  }
  notesJ = notesL + 5;
  if(notesJ > notesFive.length){
    notesJ = notesFive.length;
  }
  for(var i = notesL - 1; i < notesJ; i++){
    var xa = 200 + (1 * ((notesFive[i] - musicTime) * 800 * 0.4));
    var xb = 200 + (1 * ((notesEight[i] - musicTime) * 800 * 0.4));
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
  if((musicTime - notesOne[u]) > badTime / 2){
    u += 1; combo = 0; notesK += 1; scoreGauge -= 2;
  }
  else if((musicTime - notesTwo[k]) > badTime / 2){
    k += 1; combo = 0; notesS += 1; scoreGauge -= 2;
  }
  else if((musicTime - notesEight[r]) > badTime / 2){
    r += 1; notesG += 1;
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

  musicTime += 0.016 * bpm/120;
}

function menJudge(){
  if(Math.abs(notesOne[u] - musicTime) <= greatTime / 2){
    notesOne[u] = -1;
    u += 1;
    g = 1; gTime = 3; combo += 1; notesK += 1; scoreGauge += 1;
    scoreAdd = shokou + kousa * kosa(combo);
    score += scoreAdd;
    scoreTime = 20;
    if(combo % 100 == 0 && combo != 0){
      scoreAdd = 10000 + scoreAdd;
      score += 10000;
    }
    if(scoreGauge > scoreGaugeMax){
      scoreGauge = scoreGaugeMax;
    }
  }else if(Math.abs(notesOne[u] - musicTime) <= goodTime / 2){
    notesOne[u] = -1;
    u += 1; g = 2; gTime = 3; combo += 1; notesK += 1; scoreGauge += 0.5;
    var tenDigit = Math.floor(((shokou + kousa * kosa(combo)) / 2) / 10);
    scoreAdd = tenDigit * 10;
    score += scoreAdd;
    scoreTime = 20;
    if(combo % 100 == 0 && combo != 0){
      scoreAdd = 10000 + scoreAdd;
      score += 10000;
    }
    if(scoreGauge > scoreGaugeMax){
      scoreGauge = scoreGaugeMax;
    }
  }else if(Math.abs(notesOne[u] - musicTime) <= badTime / 2){
    notesOne[u] = -1;
    u += 1; g = 3; gTime = 3; combo = 0; notesK += 1; scoreGauge -= 2;
    if(scoreGauge < 0){
      scoreGauge = 0
    }
  }else if(notesFive[r] < musicTime && notesEight[r] > musicTime){
    scoreAdd = 200;
    score += scoreAdd;
    scoreTime = 20;
  }
}
function fuchiJudge(){
  if(Math.abs(notesTwo[k] - musicTime) <= greatTime / 2){
    notesTwo[k] = -1;
    k +=  1; g = 1; gTime = 3; combo += 1; notesS += 1; scoreGauge += 1;
    scoreAdd = shokou + kousa * kosa(combo);
    score += scoreAdd;
    scoreTime = 20;
    if(combo % 100 == 0 && combo != 0){
      scoreAdd = 10000 + scoreAdd;
      score += 10000;
    }
    if(scoreGauge > scoreGaugeMax){
      scoreGauge = scoreGaugeMax;
    }
  }else if(Math.abs(notesTwo[k] - musicTime) <= goodTime / 2){
    notesTwo[k] = -1;
    k += 1; g = 2; gTime = 3; combo += 1; notesS += 1; scoreGauge += 0.5;
    var tenDigit = Math.floor(((shokou + kousa * kosa(combo)) / 2) / 10);
    scoreAdd = tenDigit * 10;
    score += scoreAdd;
    scoreTime = 20;
    if(combo % 100 == 0 && combo != 0){
      scoreAdd = 10000 + scoreAdd;
      score += 10000;
    }
    if(scoreGauge > scoreGaugeMax){
      scoreGauge = scoreGaugeMax;
    }
  }else if(Math.abs(notesTwo[k] - musicTime) <= badTime / 2){
    notesTwo[k] = -1;
    k += 1; g = 3; gTime = 3; combo = 0; notesS += 1; scoreGauge -= 2;
    if(scoreGauge < 0){
      scoreGauge = 0
    }
  }else if(notesFive[r] < musicTime && notesEight[r] > musicTime){
    scoreAdd = 200;
    score += scoreAdd;
    scoreTime = 20;
  }
}

function notesRearrange(){
  for(i = 0; i < notes.length; i++){
    for(j = 0; j < notes[i].length; j++){
      if(notes[i][j] == 1 || notes[i][j] == 3){
        v = noteJudgeTime + i * 2 + (j * 2 / notes[i].length);
        scoreBasic += 1; scoreCombo += 1;
        notesOne.push(v);
      }
      if(notes[i][j] == 2 || notes[i][j] == 4){
        v = noteJudgeTime + i * 2 + (j * 2 / notes[i].length);
        scoreBasic += 1; scoreCombo += 1;
        notesTwo.push(v);
      }
      if(notes[i][j] == 5){
        v = noteJudgeTime + i * 2 + (j * 2 / notes[i].length);
        notesFive.push(v);
      }
      if(notes[i][j] == 8){
        v = noteJudgeTime + i * 2 + (j * 2 / notes[i].length);
        notesEight.push(v);
      }
    }
  }

}

function scoreSystem(){
  scoreGaugeMax = scoreBasic * 0.7;
  scoreGaugeNorma = scoreBasic * 0.56;
  var tenjoKari;

  switch(difficulty){
    case 1:
    switch(mode){
      case 1:
      tenjoKari = 260000;
      break;
      case 2:
      tenjoKari = 560000;
      break;
      case 3:
      tenjoKari = 760000;
      break;
      case 4:
      case 5:
      tenjoKari = 860000;
      break;
    }
    case 2:
    switch(mode){
      case 1:
      tenjoKari = 280000;
      break;
      case 2:
      tenjoKari = 580000;
      break;
      case 3:
      tenjoKari = 780000;
      break;
      case 4:
      case 5:
      tenjoKari = 880000;
      break;
    }
    case 3:
    switch(mode){
      case 1:
      tenjoKari = 300000;
      break;
      case 2:
      tenjoKari = 600000;
      break;
      case 3:
      tenjoKari = 800000;
      break;
      case 4:
      case 5:
      tenjoKari = 900000;
      break;
    }
    case 4:
    switch(mode){
      case 1:
      tenjoKari = 320000;
      break;
      case 2:
      tenjoKari = 620000;
      break;
      case 3:
      tenjoKari = 820000;
      break;
      case 4:
      case 5:
      tenjoKari = 920000;
      break;
    }
    case 5:
    switch(mode){
      case 1:
      tenjoKari = 340000;
      break;
      case 2:
      tenjoKari = 640000;
      break;
      case 3:
      tenjoKari = 840000;
      break;
      case 4:
      case 5:
      tenjoKari = 940000;
      break;
    }
    case 6:
    switch(mode){
      case 2:
      tenjoKari = 660000;
      break;
      case 3:
      tenjoKari = 860000;
      break;
      case 4:
      case 5:
      tenjoKari = 960000;
      break;
    }
    case 7:
    switch(mode){
      case 2:
      tenjoKari = 680000;
      break;
      case 3:
      tenjoKari = 880000;
      break;
      case 4:
      case 5:
      tenjoKari = 980000;
      break;
    }
    case 8:
    switch(mode){
      case 3:
      tenjoKari = 900000;
      break;
      case 4:
      case 5:
      tenjoKari = 1000000;
      break;
    }
    break;
    case 9:
    switch(mode){
      case 4:
      case 5:
      tenjoKari = 1040000;
      break;
    }
    case 10:
    switch(mode){
      case 4:
      case 5:
      tenjoKari = 1080000;
      break;
    }
  }
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