
function getMaxMin(variable) {
  if (variable == "soil") {
    return [0, 750];
  } else if (variable == "humidity") {
    return [5, 50];
  } else if (variable == "temperature") {
    return [40, 100];
  } else if (variable == "UVlight") {
    return [100, 500];
  }
}

function mapToPercent (num, in_min, in_max) {
  return (num - in_min) / (in_max - in_min);
}

function mapToLeaf (num, variable, out_min, out_max) {
  var maxminArray = getMaxMin(variable);
  var minimum = maxminArray[0];
  var maximum = maxminArray[1];

  //out_min is 0
  //out_max is 95
  // if it outputs 95 then need to move up 95 points, i.e. -95, hence multiplying by -1

  return (-1) * (num - minimum) * (95) / (maximum - minimum);
}

var leafid = "";
var selector = "";

var draw = SVG('svgcontainer').size(1000, 800);

//creating groups to hold each leaf
var humidityLeaf1 = draw.group();
var temperatureLeaf1 = draw.group();
var UVlightLeaf1 = draw.group();
var moistureLeaf1 = draw.group();

var humidityLeaf2 = draw.group();
var temperatureLeaf2 = draw.group();
var UVlightLeaf2 = draw.group();
var moistureLeaf2 = draw.group();

var humidityLeaf3= draw.group();
var temperatureLeaf3 = draw.group();
var UVlightLeaf3 = draw.group();
var moistureLeaf3 = draw.group();

var humidityLeaf4 = draw.group();
var temperatureLeaf4 = draw.group();
var UVlightLeaf4 = draw.group();
var moistureLeaf4= draw.group();

var humidityLeaf5 = draw.group();
var temperatureLeaf5 = draw.group();
var UVlightLeaf5 = draw.group();
var moistureLeaf5 = draw.group();

var gradient1,
    gradient2,
    gradient3,
    gradient4,
    gradient5,
    gradient6,
    gradient7,
    gradient8,
    gradient9,
    gradient10,
    gradient11,
    gradient12,
    gradient13,
    gradient14,
    gradient15,
    gradient16,
    gradient17,
    gradient18,
    gradient19,
    gradient20;

gradient = draw.gradient('linear', function(stop){
  stop.at(0, '#e4edbf')
  stop.at(1, '#e4edbf')
});

gradient1 = draw.gradient('linear', function(stop){
  stop.at(0, '#e4edbf')
  stop.at(1, '#e4edbf')
});

gradient2 = draw.gradient('linear', function(stop){
  stop.at(0, '#e4edbf')
  stop.at(1, '#e4edbf')
});

gradient3 = draw.gradient('linear', function(stop){
  stop.at(0, '#e4edbf')
  stop.at(1, '#e4edbf')
});

gradient4 = draw.gradient('linear', function(stop){
  stop.at(0, '#e4edbf')
  stop.at(1, '#e4edbf')
});

gradient5 = draw.gradient('linear', function(stop){
  stop.at(0, '#e4edbf')
  stop.at(1, '#e4edbf')
});

gradient6 = draw.gradient('linear', function(stop){
  stop.at(0, '#e4edbf')
  stop.at(1, '#e4edbf')
});

gradient7 = draw.gradient('linear', function(stop){
  stop.at(0, '#e4edbf')
  stop.at(1, '#e4edbf')
});

gradient8 = draw.gradient('linear', function(stop){
  stop.at(0, '#e4edbf')
  stop.at(1, '#e4edbf')
});

gradient9 = draw.gradient('linear', function(stop){
  stop.at(0, '#e4edbf')
  stop.at(1, '#e4edbf')
});

gradient10 = draw.gradient('linear', function(stop){
  stop.at(0, '#e4edbf')
  stop.at(1, '#e4edbf')
});

gradient11 = draw.gradient('linear', function(stop){
  stop.at(0, '#e4edbf')
  stop.at(1, '#e4edbf')
});

gradient12 = draw.gradient('linear', function(stop){
  stop.at(0, '#e4edbf')
  stop.at(1, '#e4edbf')
});

gradient13 = draw.gradient('linear', function(stop){
  stop.at(0, '#e4edbf')
  stop.at(1, '#e4edbf')
});

gradient14 = draw.gradient('linear', function(stop){
  stop.at(0, '#e4edbf')
  stop.at(1, '#e4edbf')
});

gradient15 = draw.gradient('linear', function(stop){
  stop.at(0, '#e4edbf')
  stop.at(1, '#e4edbf')
});

gradient16 = draw.gradient('linear', function(stop){
  stop.at(0, '#e4edbf')
  stop.at(1, '#e4edbf')
});

gradient17 = draw.gradient('linear', function(stop){
  stop.at(0, '#e4edbf')
  stop.at(1, '#e4edbf')
});

gradient18 = draw.gradient('linear', function(stop){
  stop.at(0, '#e4edbf')
  stop.at(1, '#e4edbf')
});

gradient19 = draw.gradient('linear', function(stop){
  stop.at(0, '#e4edbf')
  stop.at(1, '#e4edbf')
});

gradient20 = draw.gradient('linear', function(stop){
  stop.at(0, '#e4edbf')
  stop.at(1, '#e4edbf')
});

var gradientArray = [gradient1, gradient2, gradient3, gradient4, gradient5, gradient6, gradient7, gradient8, gradient9, gradient10, gradient11, gradient12, gradient13, gradient14, gradient15, gradient16, gradient17, gradient18, gradient19];

// stopValue is the raw value from the dataset, variable is a string representing which dataset the raw value came from
// i.e. variable should be something like 'humidity'
function updateGradient(stopValue, variable, gradientToUpdate) {
  var maxminArray = getMaxMin(variable);
  var minimum = maxminArray[0];
  var maximum = maxminArray[1];

  //console.log(mapToPercent(stopValue, minimum, maximum).toFixed(2));
  var placeholder = mapToPercent(stopValue, minimum, maximum).toFixed(2);

  gradientToUpdate.update(function(stop) {
    stop.at(0, '#e4edbf')
    stop.at( 1-placeholder, '#e4edbf') //not sure why this works when it is 1-placeholder... I thought it would work with just placeholder but it
    stop.at( 1-placeholder, '#409f75')
    stop.at(1, '#409f75')
  });

  gradientToUpdate.from(0,0).to(0,1);
}

//all of the leaves in the calendar initialized here
humidityLeaf1.path("m 15.991815,79.548198 c -5.84123,8.676346 -14.3796673,11.197008 -14.3796673,11.197008 0,0 3.199162,3.028162 5.0248804,2.311114 C 13.807566,87.700542 17.547274,81.059521 17.547274,81.059521 102.03819,84.600668 91.19966,49.840134 102.73318,4.8864161 38.408007,-11.120423 9.8361897,21.477923 15.991815,79.548198 Z").fill(gradient);
temperatureLeaf1.path("m 15.991815,79.548198 c -5.84123,8.676346 -14.3796673,11.197008 -14.3796673,11.197008 0,0 3.199162,3.028162 5.0248804,2.311114 C 13.807566,87.700542 17.547274,81.059521 17.547274,81.059521 102.03819,84.600668 91.19966,49.840134 102.73318,4.8864161 38.408007,-11.120423 9.8361897,21.477923 15.991815,79.548198 Z").fill(gradient1);
UVlightLeaf1.path("m 15.991815,79.548198 c -5.84123,8.676346 -14.3796673,11.197008 -14.3796673,11.197008 0,0 3.199162,3.028162 5.0248804,2.311114 C 13.807566,87.700542 17.547274,81.059521 17.547274,81.059521 102.03819,84.600668 91.19966,49.840134 102.73318,4.8864161 38.408007,-11.120423 9.8361897,21.477923 15.991815,79.548198 Z").fill(gradient2);
moistureLeaf1.path("m 15.991815,79.548198 c -5.84123,8.676346 -14.3796673,11.197008 -14.3796673,11.197008 0,0 3.199162,3.028162 5.0248804,2.311114 C 13.807566,87.700542 17.547274,81.059521 17.547274,81.059521 102.03819,84.600668 91.19966,49.840134 102.73318,4.8864161 38.408007,-11.120423 9.8361897,21.477923 15.991815,79.548198 Z").fill(gradient3);

humidityLeaf2.path("m 15.991815,79.548198 c -5.84123,8.676346 -14.3796673,11.197008 -14.3796673,11.197008 0,0 3.199162,3.028162 5.0248804,2.311114 C 13.807566,87.700542 17.547274,81.059521 17.547274,81.059521 102.03819,84.600668 91.19966,49.840134 102.73318,4.8864161 38.408007,-11.120423 9.8361897,21.477923 15.991815,79.548198 Z").fill(gradient4);
temperatureLeaf2.path("m 15.991815,79.548198 c -5.84123,8.676346 -14.3796673,11.197008 -14.3796673,11.197008 0,0 3.199162,3.028162 5.0248804,2.311114 C 13.807566,87.700542 17.547274,81.059521 17.547274,81.059521 102.03819,84.600668 91.19966,49.840134 102.73318,4.8864161 38.408007,-11.120423 9.8361897,21.477923 15.991815,79.548198 Z").fill(gradient5);
UVlightLeaf2.path("m 15.991815,79.548198 c -5.84123,8.676346 -14.3796673,11.197008 -14.3796673,11.197008 0,0 3.199162,3.028162 5.0248804,2.311114 C 13.807566,87.700542 17.547274,81.059521 17.547274,81.059521 102.03819,84.600668 91.19966,49.840134 102.73318,4.8864161 38.408007,-11.120423 9.8361897,21.477923 15.991815,79.548198 Z").fill(gradient6);
moistureLeaf2.path("m 15.991815,79.548198 c -5.84123,8.676346 -14.3796673,11.197008 -14.3796673,11.197008 0,0 3.199162,3.028162 5.0248804,2.311114 C 13.807566,87.700542 17.547274,81.059521 17.547274,81.059521 102.03819,84.600668 91.19966,49.840134 102.73318,4.8864161 38.408007,-11.120423 9.8361897,21.477923 15.991815,79.548198 Z").fill(gradient7);

humidityLeaf3.path("m 15.991815,79.548198 c -5.84123,8.676346 -14.3796673,11.197008 -14.3796673,11.197008 0,0 3.199162,3.028162 5.0248804,2.311114 C 13.807566,87.700542 17.547274,81.059521 17.547274,81.059521 102.03819,84.600668 91.19966,49.840134 102.73318,4.8864161 38.408007,-11.120423 9.8361897,21.477923 15.991815,79.548198 Z").fill(gradient8);
temperatureLeaf3.path("m 15.991815,79.548198 c -5.84123,8.676346 -14.3796673,11.197008 -14.3796673,11.197008 0,0 3.199162,3.028162 5.0248804,2.311114 C 13.807566,87.700542 17.547274,81.059521 17.547274,81.059521 102.03819,84.600668 91.19966,49.840134 102.73318,4.8864161 38.408007,-11.120423 9.8361897,21.477923 15.991815,79.548198 Z").fill(gradient9);
UVlightLeaf3.path("m 15.991815,79.548198 c -5.84123,8.676346 -14.3796673,11.197008 -14.3796673,11.197008 0,0 3.199162,3.028162 5.0248804,2.311114 C 13.807566,87.700542 17.547274,81.059521 17.547274,81.059521 102.03819,84.600668 91.19966,49.840134 102.73318,4.8864161 38.408007,-11.120423 9.8361897,21.477923 15.991815,79.548198 Z").fill(gradient10);
moistureLeaf3.path("m 15.991815,79.548198 c -5.84123,8.676346 -14.3796673,11.197008 -14.3796673,11.197008 0,0 3.199162,3.028162 5.0248804,2.311114 C 13.807566,87.700542 17.547274,81.059521 17.547274,81.059521 102.03819,84.600668 91.19966,49.840134 102.73318,4.8864161 38.408007,-11.120423 9.8361897,21.477923 15.991815,79.548198 Z").fill(gradient11);

humidityLeaf4.path("m 15.991815,79.548198 c -5.84123,8.676346 -14.3796673,11.197008 -14.3796673,11.197008 0,0 3.199162,3.028162 5.0248804,2.311114 C 13.807566,87.700542 17.547274,81.059521 17.547274,81.059521 102.03819,84.600668 91.19966,49.840134 102.73318,4.8864161 38.408007,-11.120423 9.8361897,21.477923 15.991815,79.548198 Z").fill(gradient12);
temperatureLeaf4.path("m 15.991815,79.548198 c -5.84123,8.676346 -14.3796673,11.197008 -14.3796673,11.197008 0,0 3.199162,3.028162 5.0248804,2.311114 C 13.807566,87.700542 17.547274,81.059521 17.547274,81.059521 102.03819,84.600668 91.19966,49.840134 102.73318,4.8864161 38.408007,-11.120423 9.8361897,21.477923 15.991815,79.548198 Z").fill(gradient13);
UVlightLeaf4.path("m 15.991815,79.548198 c -5.84123,8.676346 -14.3796673,11.197008 -14.3796673,11.197008 0,0 3.199162,3.028162 5.0248804,2.311114 C 13.807566,87.700542 17.547274,81.059521 17.547274,81.059521 102.03819,84.600668 91.19966,49.840134 102.73318,4.8864161 38.408007,-11.120423 9.8361897,21.477923 15.991815,79.548198 Z").fill(gradient14);
moistureLeaf4.path("m 15.991815,79.548198 c -5.84123,8.676346 -14.3796673,11.197008 -14.3796673,11.197008 0,0 3.199162,3.028162 5.0248804,2.311114 C 13.807566,87.700542 17.547274,81.059521 17.547274,81.059521 102.03819,84.600668 91.19966,49.840134 102.73318,4.8864161 38.408007,-11.120423 9.8361897,21.477923 15.991815,79.548198 Z").fill(gradient15);

humidityLeaf5.path("m 15.991815,79.548198 c -5.84123,8.676346 -14.3796673,11.197008 -14.3796673,11.197008 0,0 3.199162,3.028162 5.0248804,2.311114 C 13.807566,87.700542 17.547274,81.059521 17.547274,81.059521 102.03819,84.600668 91.19966,49.840134 102.73318,4.8864161 38.408007,-11.120423 9.8361897,21.477923 15.991815,79.548198 Z").fill(gradient16);
temperatureLeaf5.path("m 15.991815,79.548198 c -5.84123,8.676346 -14.3796673,11.197008 -14.3796673,11.197008 0,0 3.199162,3.028162 5.0248804,2.311114 C 13.807566,87.700542 17.547274,81.059521 17.547274,81.059521 102.03819,84.600668 91.19966,49.840134 102.73318,4.8864161 38.408007,-11.120423 9.8361897,21.477923 15.991815,79.548198 Z").fill(gradient17);
UVlightLeaf5.path("m 15.991815,79.548198 c -5.84123,8.676346 -14.3796673,11.197008 -14.3796673,11.197008 0,0 3.199162,3.028162 5.0248804,2.311114 C 13.807566,87.700542 17.547274,81.059521 17.547274,81.059521 102.03819,84.600668 91.19966,49.840134 102.73318,4.8864161 38.408007,-11.120423 9.8361897,21.477923 15.991815,79.548198 Z").fill(gradient18);
moistureLeaf5.path("m 15.991815,79.548198 c -5.84123,8.676346 -14.3796673,11.197008 -14.3796673,11.197008 0,0 3.199162,3.028162 5.0248804,2.311114 C 13.807566,87.700542 17.547274,81.059521 17.547274,81.059521 102.03819,84.600668 91.19966,49.840134 102.73318,4.8864161 38.408007,-11.120423 9.8361897,21.477923 15.991815,79.548198 Z").fill(gradient19);


//lines showing weekly average initialized here
humidityLeaf1.path("m 14,60 90,0").addClass("line").attr('id', 'leafline1').move(15,100);
temperatureLeaf1.path("m 14,60 90,0").addClass("line").attr('id', 'leafline2').move(15,100);
UVlightLeaf1.path("m 14,60 90,0").addClass("line").attr('id', 'leafline3').move(15,100);
moistureLeaf1.path("m 14,60 90,0").addClass("line").attr('id', 'leafline4').move(15,100);

humidityLeaf2.path("m 14,60 90,0").addClass("line").attr('id', 'leafline5').move(15,100);
// humidityLeaf2.flip('x');
temperatureLeaf2.path("m 14,60 90,0").addClass("line").attr('id', 'leafline6').move(15,100);
// temperatureLeaf2.flip('x');
UVlightLeaf2.path("m 14,60 90,0").addClass("line").attr('id', 'leafline7').move(15,100);
// UVlightLeaf2.flip('x');
moistureLeaf2.path("m 14,60 90,0").addClass("line").attr('id', 'leafline8').move(15,100);
// moistureLeaf2.flip('x');

humidityLeaf3.path("m 14,60 90,0").addClass("line").attr('id', 'leafline9').move(15,100);
temperatureLeaf3.path("m 14,60 90,0").addClass("line").attr('id', 'leafline10').move(15,100);
UVlightLeaf3.path("m 14,60 90,0").addClass("line").attr('id', 'leafline11').move(15,100);
moistureLeaf3.path("m 14,60 90,0").addClass("line").attr('id', 'leafline12').move(15,100);

humidityLeaf4.path("m 14,60 90,0").addClass("line").attr('id', 'leafline13').move(15,100);
// humidityLeaf4.flip('x');
temperatureLeaf4.path("m 14,60 90,0").addClass("line").attr('id', 'leafline14').move(15,100);
// temperatureLeaf4.flip('x');
UVlightLeaf4.path("m 14,60 90,0").addClass("line").attr('id', 'leafline15').move(15,100);
// UVlightLeaf4.flip('x');
moistureLeaf4.path("m 14,60 90,0").addClass("line").attr('id', 'leafline16').move(15,100);
// moistureLeaf4.flip('x');

humidityLeaf5.path("m 14,60 90,0").addClass("line").attr('id', 'leafline17').move(15,100);
temperatureLeaf5.path("m 14,60 90,0").addClass("line").attr('id', 'leafline18').move(15,100);
UVlightLeaf5.path("m 14,60 90,0").addClass("line").attr('id', 'leafline19').move(15,100);
moistureLeaf5.path("m 14,60 90,0").addClass("line").attr('id', 'leafline20').move(15,100);

humidityLeaf1.move(100, 0);
temperatureLeaf1.move(200, 0);
UVlightLeaf1.move(300, 0);
moistureLeaf1.move(400, 0);

humidityLeaf2.move(100, 110);
temperatureLeaf2.move(200, 110);
UVlightLeaf2.move(300, 110);
moistureLeaf2.move(400, 110);

humidityLeaf2.scale(-1, 1);
temperatureLeaf2.scale(-1, 1);
UVlightLeaf2.scale(-1, 1);
moistureLeaf2.scale(-1, 1);

humidityLeaf3.move(100, 210);
temperatureLeaf3.move(200, 210);
UVlightLeaf3.move(300, 210);
moistureLeaf3.move(400, 210);

humidityLeaf4.move(100, 310);
temperatureLeaf4.move(200, 310);
UVlightLeaf4.move(300, 310);
moistureLeaf4.move(400, 310);

humidityLeaf4.scale(-1, 1);
temperatureLeaf4.scale(-1, 1);
UVlightLeaf4.scale(-1, 1);
moistureLeaf4.scale(-1, 1);

humidityLeaf5.move(100, 410);
temperatureLeaf5.move(200, 410);
UVlightLeaf5.move(300, 410);
moistureLeaf5.move(400, 410);


//this array creates json objects that organize which leaves contain which variable information.
var leafArray = [
  {name: "today", values: [humidityLeaf1, temperatureLeaf1, UVlightLeaf1, moistureLeaf1]},
  {name: "1dayago", values: [humidityLeaf2, temperatureLeaf2, UVlightLeaf2, moistureLeaf2]} ,
  {name: "2daysago", values:[humidityLeaf3, temperatureLeaf3, UVlightLeaf3, moistureLeaf3]},
  {name: "3daysago", values:[humidityLeaf4, temperatureLeaf4, UVlightLeaf4, moistureLeaf4]},
  {name: "4daysago", values:[humidityLeaf5, temperatureLeaf5, UVlightLeaf5, moistureLeaf5]},
];
