// 基本情報
var name = "燎原ノ舞";
var bpm = 104, soundStart = 1950, soundVolume = 30;
var measureA = 4, measureB = 4;
var scroll = 1;
var noteJudgeTime = 2;
var max_mode = 4, difficulty = [5, 7, 8, 10];
var notesEasy = [
  [1,1],
  [1,1,1,0],
  [1,1],
  [1,1,1,0],
  [1,1],
  [2,2,2,0],
  [1,1],
  [2,2,2,0],
  ["#MEASURE 15/8",1],
  ["#MEASURE 4/4","#BPMCHANGE 208","#SCROLL 0.8",1,1,1,0],
  [1],
  [1,1,1,0],
  [1],
  [1,1,1,0],
  [1],
  [1,1,1,0],
  [1,2],
  [1,1,1,0],
  [1],
  [1,1,1,0],
  [1],
  [1,1,1,0],
  [1],
  [1,1,1,0],
  [3,3],
  [1,1,1,0],
  [1,1],
  [1,1,1,0],
  [1],
  [2,2,2,0],
  [2,2],
  [2,2,2,0],
  [2],
  [1,1,1,0],
  [2,2],
  [1,1,1,0],
  [2],
  [1,1,1,0],
  [5,0,0,8],
  [1,1,1,0],
  [5],
  [0,8,0,0],
  [4],
  [3,3,0,0],
  [4,4,0,0],
  [1,2],
  [1],
  [1,2],
  [1,2],
  [1,1,1,0],
  [1,1,1,0],
  [1,1,1,1],
  [1,1,1,0],
  [1,1,1,0],
  [1,1,1,0],
  [1,1,1,1],
  [1,1,1,0],
  [1,1,1,0],
  [1,1,1,0],
  [3],
  [0],
  [3],
  [0],
  [3],
  [0],
  [3,3],
  ["#MEASURE 5/4",3,0,3,0,0],
  ["#MEASURE 4/4",1,1,1,1],
  [1,1],
  [3,3,3,0],
  [3,3,3,0],
  [1,1,1,1],
  [1,1],
  [3,3,3,0],
  [3,3,3,0],
  [2,2,2,2],
  [2,2],
  [3,3,3,0],
  [3,3,3,0],
  [2,2,2,2],
  [2,2],
  [3,3,3,0],
  [3,3,3,0],
  [3],
  [2],
  [3],
  [2],
  [3,3],
  [7],
  [0],
  [0],
  [0],
  [0],
  [8],
];
var notesNormal = [
  [1,2,1,0],
  [1,1],
  [1,2,1,0],
  [1,1],
  [1,0,2,0,1,1,0,0],
  [1,0,0,0,1,1,0,0],
  [1,0,2,0,1,1,0,0],
  [1,0,0,0,1,1,1,0],
  ["#MEASURE 15/8",0],
  ["#MEASURE 4/4","#BPMCHANGE 208",1,1,1,0],
  [1,2,2,0],
  [1,1,1,0],
  [1,0,2,2],
  [1,1,1,0],
  [1,2,2,0],
  [1,1,1,0],
  [1,2],
  [1,1,1,0,1,0,0,0],
  [1,2,2,0],
  [1,1,1,0,1,0,0,0],
  [1,2,2,0],
  [1,1,1,0,1,0,0,0],
  [1,2,2,0],
  [1,1,1,0,1,0,0,0],
  [1,1,3,0],
  [1,1,1,0,1,0,0,0],
  [1,1,1,0],
  [1,1,1,0,1,0,0,0],
  [1],
  [2,2,2,0,2,0,0,0],
  [2,2,2,0],
  [2,2,2,0,2,0,0,0],
  [2],
  [1,1,1,0,1,0,0,0],
  [2,2,2,0],
  [1,1,1,0,1,0,0,0],
  [2,2,2,0],
  [1,1,1,0,1,0,1,0],
  [5,0,0,8],
  [1,1,1,0,1,0,1,0],
  [5],
  [0,8,3,0,0,0,0,0],
  [4,4,0,0],
  [3,3,0,0],
  [4,4,0,0],
  [1,2],
  [1,1,2,0],
  [1,2],
  [1,1,2,0],
  [2,2,2,2],
  [2,0,2,2,2,0,0,0],
  [2,2,2,2],
  [2,0,2,2,2,0,0,0],
  [1,1,1,1],
  [1,0,1,1,1,0,0,0],
  [1,1,1,1],
  [1,0,1,1,1,0,0,0],
  [1,1,2,0],
  [1,1,2,0],
  [3],
  [0,0,1,1],
  [3],
  [0,0,1,1],
  [3],
  [0,0,1,1],
  [3,3],
  ["#MEASURE 5/4",3,3,3,0,0],
  ["#MEASURE 4/4",1,1,1,1],
  [1,0,1,1,1,0,0,0],
  [3,3,3,3],
  [1,0,1,1,1,0,0,0],
  [1,1,1,1],
  [1,0,1,1,1,0,0,0],
  [3,3,3,0],
  [1,0,1,1,1,0,0,0],
  [1,1,1,1],
  [2,0,2,2,2,0,0,0],
  [3,3,3,0],
  [1,0,2,2,2,0,0,0],
  [1,1,1,1],
  [2,0,2,2,2,0,0,0],
  [3,3,3,3],
  [1,0,1,1,1,0,0,0],
  [3],
  [2],
  [3],
  [2],
  [3,3],
  [7],
  [0],
  [0],
  [0],
  [8],
];
var notesHard = [
  [3,0,2,0,1,1,0,1],
  [1,1,1,2],
  [1,0,2,0,1,1,0,1],
  [1,0,0,0,1,0,0,0,1,0,2,2,2,0,2,0],
  [3,0,2,0,1,1,0,2],
  [1,0,2,1,1,1,2,0],
  [1,0,2,0,1,1,2,0],
  [1,0,1,0,2,0,1,0,1,0,2,2,2,0,2,0],
  ["#MEASURE 15/8",0],
  ["#MEASURE 4/4","#BPMCHANGE 208",3,1,2,1],
  [1,0,2,2,2,0,2,0],
  [3,1,2,1],
  [1,0,2,2,2,0,2,0],
  [3,1,2,1],
  [1,0,2,2,2,0,2,0],
  [3,1,2,1],
  [2,0,0,0,1,0,0,0,2,2,2,0,2,0,2,0],
  [1,2,1,0,2,0,1,0],
  [1,0,2,2,2,0,2,0],
  [1,2,1,0,2,0,1,0],
  [1,0,2,2,2,0,2,0],
  [1,2,1,0,2,0,1,0],
  [1,0,2,2,2,0,2,0],
  [1,2,1,0,2,0,1,0],
  [2,0,0,0,1,0,1,0,2,0,2,2,1,0,2,0],
  [2,1,2,1,2,0,0,0],
  [2,1,2,1,2,0,0,0],
  [2,1,2,1,2,0,2,0],
  [2,1,2,1,2,0,1,0],
  [2,1,2,1,2,0,0,0],
  [2,1,2,1,2,0,2,0],
  [2,1,2,1,2,0,1,0],
  [2,0,1,0,2,0,1,0,2,0,1,1,1,0,1,0],
  [2,1,2,1,2,0,0,0],
  [2,1,2,1,2,0,1,1],
  [2,1,2,1,2,0,2,2],
  [2,1,2,1,2,0,2,0],
  [2,1,2,1,2,0,0,0],
  [2,1,2,1,2,0,0,0],
  [2,1,2,1,2,0,0,0],
  [5,0,0,8],
  [3,3,3,0,0,0,0,0],
  [4,4,4,0,0,0,0,0],
  [3,3,3,0,0,0,0,0],
  [4,4,4,0,0,0,0,0],
  [1,2],
  [1,1,2,0],
  [1,2],
  [1,1,2,0],
  [2,2,2,0,1,1,1,0],
  [2,2,2,0,1,1,1,0],
  [2,2,2,0,1,1,1,0],
  [2,1,2,1,4,0,0,0],
  [1,0,1,0,1,0,0,0,2,2,2,0,2,0,0,0],
  [1,0,1,0,1,0,0,0,2,2,2,0,2,0,0,0],
  [1,0,1,0,1,0,0,0,2,2,2,0,2,0,0,0],
  [2,1,1,1,4,0,0,0],
  [1,1,1,0,1,1,1,1],
  [2,2,2,0,2,0,0,0,2,2,2,0,2,0,2,0],
  [3,2],
  [2,0,2,1],
  [4,2],
  [2,0,2,1],
  [4,2],
  [2,0,2,1],
  [2,0,2,1],
  ["#MEASURE 5/4",3,3,3,0,0],
  ["#MEASURE 4/4",3,0,0,0,2,2,2,0,2,0,0,0,2,0,0,0],
  [1,0,2,2,2,0,2,0],
  [1,0,0,0,2,2,2,0,2,0,0,0,2,0,0,0],
  [3,3,3,0],
  [3,0,0,0,2,2,2,0,2,0,0,0,2,0,0,0],
  [1,0,2,2,2,0,2,0],
  [5],
  [0],
  [0,8,0,0,2,0,0,0,1,0,0,0,2,0,0,0],
  [1,0,0,0,2,2,2,0,2,0,0,0,4,0,0,0],
  [3,2,1,2],
  [1,0,0,0,1,1,2,0,2,0,1,0,4,0,0,0],
  [3,2,1,2],
  [1,0,0,0,2,2,2,0,2,0,0,0,2,0,0,0],
  [5],
  [0,0,8,1],
  [3],
  [2,1],
  [3],
  [2,1],
  [3,3],
  [3],
];
var notesInsane = [
  [3,0,0,0,2,0,0,0,1,0,1,1,1,0,2,0],
  [1,0,1,0,0,0,1,0,1,0,2,2,0,0,2,0],
  [1,0,0,0,2,0,0,0,1,0,1,1,1,0,2,0],
  [1,0,1,0,0,0,1,0,1,0,2,2,2,0,2,0],
  [3,0,0,0,2,0,0,0,1,0,1,1,1,0,2,0],
  [1,0,1,0,0,0,1,0,1,0,2,2,2,0,2,0],
  [1,0,0,0,2,0,0,0,1,0,1,1,1,0,2,0],
  [1,0,1,0,0,0,1,0,1,0,2,2,2,2,2,0],
  ["#MEASURE 15/8",0],
  ["#BPMCHANGE 208","#MEASURE 4/4",3,1,2,1,1,2,1,1],
  [2,1,2,1,1,2,1,2],
  [3,1,2,1,1,2,1,1],
  [2,1,2,1,1,2,2,1],
  [4,1,1,2,1,1,2,1],
  [1,2,1,1,2,2,2,1],
  [4,1,2,1,1,2,2,1],
  [4,0,1,0,2,0,1,0,2,2,2,2,1,1,1,0],
  [3,1,2,1,1,2,1,1],
  [2,0,1,0,2,0,1,0,1,0,2,2,2,0,2,0],
  [3,1,2,1,1,2,1,1],
  [2,0,1,0,2,0,1,0,1,0,2,2,2,0,2,0],
  [4,1,1,2,1,1,2,1],
  [1,0,2,0,1,0,1,0,2,2,2,0,2,0,1,0],
  [4,1,1,2,1,1,2,1],
  [3,0,0,2,0,0,1,0,0,2,0,0,1,2,1,2,1,2,1,2,1,2,1,2],
  [1,0,1,0,2,0,2,0,1,1,2,2,1,0,1,0],
  [2,2,1,0,2,2,1,0,1,0,2,2,1,0,2,2],
  [1,0,1,0,2,2,1,0,1,1,2,2,1,0,1,0],
  [2,2,1,0,2,2,1,0,1,0,2,2,1,1,2,2],
  [1,0,1,0,2,2,1,0,1,1,2,2,1,0,2,2],
  [2,2,1,0,2,2,1,0,1,0,2,2,1,0,1,0],
  [1,0,1,0,2,2,1,0,1,1,2,2,1,0,1,0],
  [2,2,1,0,2,2,1,0,2,2,1,2,1,2,2,2],
  [1,0,1,0,2,2,1,0,1,1,2,2,1,0,1,0],
  [2,2,1,0,2,2,1,0,1,0,2,2,1,0,1,0],
  [1,0,1,0,2,2,1,0,1,1,2,2,1,0,1,0],
  [2,2,1,0,2,2,1,0,1,0,2,2,1,1,1,1],
  [2,1,1,0,2,2,1,0,1,1,2,2,1,0,1,0],
  [2,2,1,0,2,2,1,0,1,0,2,2,1,0,1,0],
  [1,0,1,0,2,2,1,0,2,2,1,1,2,2,1,0],
  [2,2,1,0,2,2,1,0,1,0,2,1,2,2,2,2],
  [2,1,2,1,2,0,0,0,2,1,2,1,2,0,0,0],
  [2,1,2,1,2,0,1,0,2,0,1,0,2,0,2,0],
  [2,1,2,1,2,0,0,0,2,1,2,1,2,0,0,0],
  [2,1,2,1,2,0,2,0,2,0,2,0,2,2,1,0],
  [1,0,0,1],
  [1,0,0,2],
  [1],
  [1,0,0,0,1,0,0,0,4,0,0,0,0,0,0,0],
  [1,0,2,0,2,0,1,2,0,2,0,1,1,0,2,0],
  [1,0,2,0,2,0,1,1,2,0,2,0,1,0,2,0],
  [2,0,1,0,1,0,2,1,1,0,2,0,2,0,1,0],
  [2,0,1,0,1,0,2,2,1,0,1,0,2,2,1,0],
  [1,0,2,0,2,0,1,2,1,2,1,0,1,0,2,0],
  [1,0,2,0,2,0,1,1,1,0,2,0,1,0,2,0],
  [1,0,2,0,2,0,1,2,1,2,0,1,1,0,2,0],
  [1,0,2,0,2,0,1,1,1,0,2,0,1,0,2,0],
  [2,0,1,0,1,0,2,1,0,1,0,2,2,0,1,0],
  [2,0,1,0,1,0,2,2,1,0,1,0,1,2,1,0],
  [1,1,2,2,0,0,0,0,1,1,2,2,0,0,0,0],
  [1,1,2,2,2,0,0,0,2,0,1,0,2,0,0,0],
  [1,1,2,2,0,0,0,0,1,1,2,2,0,0,0,0],
  [1,1,2,2,2,0,1,0,2,0,1,0,2,0,0,0],
  [2,0,1,0,2,0,1,0,2,0,2,2,1,0,2,0],
  [2,0,2,0,1,0,2,0,1,0,2,2,2,0,2,0],
  [2,0,1,0,2,0,1,0,2,0,2,2,1,0,2,0],
  ["#MEASURE 5/4",2,0,2,0,1,0,2,0,1,0,2,2,2,2,2,2,0,0,0,0],
  ["#MEASURE 4/4",3,0,2,0,3,0,2,0,3,0,1,1,2,0,1,0],
  [3,0,1,0,4,0,1,0,4,0,1,1,1,0,1,0],
  [3,0,2,0,3,0,2,0,3,0,1,1,2,0,1,0],
  [3,0,0,0,3,0,0,0,2,1,1,1,1,1,1,1],
  [2,2,1,1,2,1,0,2,1,1,2,1,2,2,1,0],
  [2,2,1,1,2,1,0,2,1,1,2,1,2,1,0,2],
  [2,2,1,1,2,1,0,2,1,1,2,0,2,1,2,2],
  [2,2,1,1,2,1,0,2,1,2,2,1,2,1,2,1],
  [1,0,2,2,1,0,2,2,1,0,1,1,2,2,1,0],
  [3,0,3,0,2,2,1,0,2,2,1,1,1,0,3,0],
  [3,0,2,2,1,0,2,2,1,0,1,1,2,2,1,0],
  [1,0,0,0,1,0,0,0,1,2,1,2,1,2,1,2],
  [2,2,1,1,2,1,0,2,1,1,2,1,2,2,1,0],
  [2,2,1,1,2,1,0,2,1,1,2,1,2,1,2,0],
  [2,2,1,1,2,1,0,2,1,1,2,0,2,1,2,2],
  [2,2,1,1,2,1,0,2,1,2,2,1,2,1,2,1],
  [1,2],
  [1,0,1,0,0,0,1,0,1,0,2,2,0,0,2,1],
  [1,2],
  [1,0,1,0,0,0,1,0,1,0,2,2,1,2,1,0],
  [5,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0],
  [3],
];
