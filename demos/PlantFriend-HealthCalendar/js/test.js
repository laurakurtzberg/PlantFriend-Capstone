function mapToDegrees (num, in_min, in_max) {
  return (num - in_min) * 180 / (in_max - in_min);
}

console.log(mapToDegrees(400,100,500));
var mybool = true;
function animateWithGreensock(value) {
    arc = document.getElementById('gauge-arc');
    needle = document.cd getElementById('gauge-needle');
    if (mybool){
    TweenMax.to(needle, 0.1, {
      transformOrigin: '87% 50%',
      rotation: value,
    });
        mybool = false;
    } else {
      TweenMax.to(needle, 0.1, {
        transformOrigin: '87% 50%',
        rotation: value-10,
      });
      mybool = true;
    }
  };


  var btnGreensock = document.getElementById('greensock');

  var container;
  var needle;
  var myvalue = 150;
  btnGreensock.onclick = function(event) { animateWithGreensock(myvalue) };



  // polar to cartesian arc
  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}


document.getElementById("gauge-arc").setAttribute("d", describeArc(160, 166, 120, 270, 90));
