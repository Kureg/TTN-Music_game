var ctx;

function init(){
  var canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  ctx.fillStyle = "#cc3333";
  ctx.beginPath();
  ctx.arc(50, 25, 23, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle="#ffffff";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(50, 25, 23, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
  ctx.strokeStyle="#000000";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(50, 25, 25, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();

  ctx.fillStyle = "#4466cc";
  ctx.beginPath();
  ctx.arc(50, 125, 23, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle="#ffffff";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(50, 125, 23, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
  ctx.strokeStyle="#000000";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(50, 125, 25, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();

  ctx.fillStyle = "#cccc33";
  ctx.beginPath();
  ctx.arc(75, 225, 25, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle="#000000";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(75, 225, 25, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();

  ctx.fillRect(25, 200, 50, 50);
  ctx.beginPath();
  ctx.moveTo(25, 200);
  ctx.lineTo(75, 200);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(25, 250);
  ctx.lineTo(75, 250);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(25, 225, 23, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle="#ffffff";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(25, 225, 23, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
  ctx.strokeStyle="#000000";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(25, 225, 25, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
}
