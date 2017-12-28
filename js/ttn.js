var ctx;
//適当に追加した情報（バグるから変更しない）
var autoTime = 0.05;
var greatTime = 0.05;
var goodTime = 0.2;
var badTime = 0.35;
var u = 0, r = 0, g = 0;
var gTime = 0;
var autoRen = 0;
var bpm_c = 0, scroll_c= 1;
var combo = 0; var maxCombo = 0; var scoreCombo = 0;
var score = 0, scoreBasic = 0, scoreAdd = 0, scoreTime = 0;
var scoreGauge = 0, scoreGaugeMax, scoreGaugeNorma;
var notesK = 0;
var play = false;
var playOn;
var end = false, endTime;
var userAgent;
var ready = false;
var mode;

document.onkeydown = function(e){
  var key_code = e.keyCode;
  if(!auto){
    if(key_code == 70 || key_code == 74){ //F,J面
      document.getElementById("men").currentTime = 0.002;
      document.getElementById("men").play();
      Judge(1);
    }
    if(key_code == 68 || key_code ==75){ //D,K縁
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
    if(key_code == 49){ // 1：easy
      mode = 1;
      ready = true;
      start();
    }
    if(key_code == 50){ // 2：normal
      mode = 2;
      ready = true;
      start();
    }
    if(key_code == 51){ // 3：hard
      mode = 3;
      ready = true;
      start();
    }
    if(key_code == 52){ // 4：insane
      mode = 4;
      ready = true;
      start();
    }
    if(key_code == 53){ // 5：?
      if(max_mode == 5){
        mode = 5
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
      var x = 200 + ((notesOne[i] - musicTime) * 800 * 0.4 * scrolllist[i]);
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
      var x = 200 + ((notesOne[i] - musicTime) * 800 * 0.4 * scrolllist[i]);
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
      xa = 200 + ((notesOne[i] - musicTime) * 800 * 0.4 * scrolllist[i]);
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
      xb = 200 + ((notesOne[i] - musicTime) * 800 * 0.4 * scrolllist[i]);
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
  if((musicTime - notesOne[u]) > badTime / 2 && notesTwo[u] != 5 && notesTwo[u] != 8){
    u += 1; combo = 0; notesK += 1; scoreGauge -= 2;
  }
  else if((musicTime - notesEight[r]) > badTime / 2){
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
  ctx.strokeRect(324, 140, 0, 30);
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
}

function Judge(num){
  if(notesTwo[u] != 5 && notesTwo[u] != 8){
    if(Math.abs(notesOne[u] - musicTime) <= greatTime / 2  && notesTwo[u] == num){
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
    }else if(Math.abs(notesOne[u] - musicTime) <= goodTime / 2 && notesTwo[u] == num){
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
    }else if(Math.abs(notesOne[u] - musicTime) <= badTime / 2 && notesTwo[u] == num){
      notesOne[u] = -1;
      u += 1; g = 3; gTime = 3; combo = 0; notesK += 1; scoreGauge -= 2;
      if(scoreGauge < 0){
        scoreGauge = 0
      }
    }
  }
  if(notesFive[r] < musicTime && notesEight[r] > musicTime){
    scoreAdd = 200;
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
  for(i = 0; i < notes.length; i++){
    var jk = 0;
    for(j = 0; j < notes[i].length; j++){
      if(notes[i][j] == 0){
        v += 2 * (measureA / measureB) / (notes[i].length - jk);
        continue;
      }
      else if(notes[i][j] == 1 || notes[i][j] == 3){
        notesOne.push(v);
        notesTwo.push(1);
        bpmlist.push(bpm_a);
        scrolllist.push(scroll_a);
        v += 2 * (measureA / measureB) / (notes[i].length - jk);
        scoreBasic += 1; scoreCombo += 1;
        continue;
      }
      else if(notes[i][j] == 2 || notes[i][j] == 4){
        notesOne.push(v);
        notesTwo.push(2);
        bpmlist.push(bpm_a);
        scrolllist.push(scroll_a);
        v += 2 * (measureA / measureB) / (notes[i].length - jk);
        scoreBasic += 1; scoreCombo += 1;
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
  scoreGaugeMax = scoreBasic * 0.7;
  scoreGaugeNorma = scoreBasic * 0.56;
  var tenjoKari;

  switch(difficulty[mode-1]){
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
