// SparkleQuery Copyright Felis Phasma 2014 v2.0
(function() {
  window.SparkleQuery = function(query, context) {
    context = context == undefined ? document : context;
    return {
      "-1": function(q) {
        return context.getElementsByTagName(q);
      },
      "0": function(q) {
        return context.getElementById(q.substr(1));
      },
      "1": function(q) {
        return context.getElementsByClassName(q.substr(1));
      }
    }[["#", "."].indexOf(query[0]).toString()](query);
  };
})();
window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      return window.setTimeout(callback, 1000 / 60);
    }
  );
})();
var Query = SparkleQuery,
  canvas = Query("#radar"),
  ctx = canvas.getContext("2d"),
  h,
  w,
  ringSpacing = 200,
  angle = 0,
  angleStep = 1;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize, false);
resize();

function from360(angle360) {
  return (Math.PI * angle360) / 180;
}

function line(x, y, len, d) {
  /*ctx.beginPath();
  ctx.arc(x, y, lw / 2, 0, 2 * Math.PI);
  ctx.fill();*/
  ctx.beginPath();
  ctx.moveTo(x, y);
  var x1 = x + len * Math.cos(from360(d)),
    y1 = y + len * Math.sin(from360(d));
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

function render() {
  // Reset canvas
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);

  // Beam
  var renderLines = 600;
  for (i = 0; i < renderLines; i++) {
    ctx.strokeStyle = "rgb(0, " + Math.round(200 * (i / renderLines)) + ", 0)";
    line(w / 2, h / 2, 10000, angle + i / 20);
  }

  // Axis
  ctx.strokeStyle = "#005500";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(w / 2, 0);
  ctx.lineTo(w / 2, h);
  ctx.stroke();
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, h / 2);
  ctx.lineTo(w, h / 2);
  ctx.stroke();

  // Rings
  ctx.strokeStyle = "#00ff00";
  for (var r = 0, m = Math.max(w, h) / ringSpacing; r < m; r++) {
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, r * ringSpacing, 0, 2 * Math.PI);
    ctx.stroke();
  }

  window.requestAnimFrame(render);
  angle += angleStep;
}
render();
