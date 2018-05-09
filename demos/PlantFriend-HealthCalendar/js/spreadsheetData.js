var publicSpreadsheetUrl_humid = 'https://docs.google.com/spreadsheets/d/1r1ztp8_NgrZG0FjmaMliWLWRGM__PkzPn5RpqQZAgH4/edit?usp=sharing';
var publicSpreadsheetUrl_temp = 'https://docs.google.com/spreadsheets/d/1MJQ2zBkrliCxVZ-Zl7-weeOFSFbfg7OvWaXXzlZgkBM/edit?usp=sharing';
var publicSpreadsheetUrl_soil = 'https://docs.google.com/spreadsheets/d/1z29_qJje7m_k7UvOTMTBAWNAaYfE3tA1MJ_WmmQqzq0/edit?usp=sharing';
var publicSpreadsheetUrl_UV = 'https://docs.google.com/spreadsheets/d/1TPKFKHf9nPlWdGcYp75lI_TEFApphpnK_PmnVQtyGoM/edit?usp=sharing';

var humidity;
var temperature;
var soilmoisture;
var UVlight;

function init() {
  humidity = Tabletop( { key: publicSpreadsheetUrl_humid,
                   callback: showInfo,
                   simpleSheet: true,
                   parseNumbers: true } );
  temperature = Tabletop({ key: publicSpreadsheetUrl_temp,
                   callback: showInfo,
                   simpleSheet: true,
                   parseNumbers: true });
  soilmoisture = Tabletop({ key: publicSpreadsheetUrl_soil,
                   callback: showInfo,
                   simpleSheet: true,
                   parseNumbers: true });
  uvrays = Tabletop({ key: publicSpreadsheetUrl_UV,
                   callback: showInfo,
                   simpleSheet: true,
                   parseNumbers: true });
}

var latestData;

var startday = moment("May 3, 2018","MMMM DD, YYYY");

//Hard coded the days so that the data doesn't stop being displayed when Plant Friend disconnected
var onedayago = moment("May 2, 2018","MMMM DD, YYYY");
var twodaysago = moment("May 1, 2018","MMMM DD, YYYY");
var threedaysago = moment("April 30, 2018","MMMM DD, YYYY");
var fourdaysago = moment("April 29, 2018","MMMM DD, YYYY");
var fivedaysago = moment("April 28, 2018","MMMM DD, YYYY");

// variables to use do have the calendar visualization update automatically for current moment
// var startday = moment();
// var onedayago = moment().subtract(1, 'day');
// var twodaysago = moment().subtract(2, 'day');
// var threedaysago = moment().subtract(3, 'day');
// var fourdaysago = moment().subtract(4, 'day');
// var fivedaysago = moment().subtract(5, 'day');


function checkDay(startday, day) {
  if (day.isBetween(onedayago, startday, 'day','[]')) {
    return "today";
  } else if (day.isBetween(twodaysago, onedayago, 'day','[]')) {
    return "yesterday";
  } else if (day.isBetween(threedaysago, twodaysago, 'day','[]')) {
    return "twodaysago";
  } else if (day.isBetween(fourdaysago, threedaysago, 'day','[]')) {
    return "threedaysago";
  } else if (day.isBetween(fivedaysago, fourdaysago, 'day','[]')) {
    return "fourdaysago";
  }
}

var averages = [];
var allAverages = [];

function add(a, b) {
    return a + b;
}

function calcAverages(data, currentVariable) {
  var todaysum = [];
  var day1sum = [];
  var day2sum = [];
  var day3sum = [];
  var day4sum = [];

  for (var i = 0; i<data.length; i++) {
    if (checkDay(startday, moment(data[i]['Date'], "MMMM DD, YYYY at h:mm a"))=="today") {
      todaysum.push(data[i]['Value']);
    } else if (checkDay(startday, moment(data[i]['Date'], "MMMM DD, YYYY at h:mm a"))=="yesterday") {
      day1sum.push(data[i]['Value']);
  	} else if (checkDay(startday, moment(data[i]['Date'], "MMMM DD, YYYY at h:mm a"))=="twodaysago") {
      day2sum.push(data[i]['Value']);
    } else if (checkDay(startday, moment(data[i]['Date'], "MMMM DD, YYYY at h:mm a"))=="threedaysago") {
      day3sum.push(data[i]['Value']);
    } else if (checkDay(startday, moment(data[i]['Date'], "MMMM DD, YYYY at h:mm a"))=="fourdaysago") {
      day4sum.push(data[i]['Value']);
    }
  }

  averages = [todaysum.reduce(add, 0)/todaysum.length, day1sum.reduce(add, 0)/day1sum.length, day2sum.reduce(add, 0)/day2sum.length, day3sum.reduce(add, 0)/day3sum.length, day4sum.reduce(add, 0)/day4sum.length];

	var totalAverage = [];
	for (var i=0; i<averages.length; i++) {
		totalAverage.push(averages[i]);
	}

	var weeklyAverage = totalAverage.reduce(add,0) / totalAverage.length;

	 if (currentVariable== "soil") {
			 updateGradient( (todaysum.reduce(add, 0)/todaysum.length), "soil", gradient1);
			 updateGradient( (day1sum.reduce(add, 0)/day1sum.length), "soil", gradient5);
			 updateGradient( (day2sum.reduce(add, 0)/day2sum.length), "soil", gradient9);
			 updateGradient( (day3sum.reduce(add, 0)/day3sum.length), "soil", gradient13);
			 updateGradient( (day4sum.reduce(add, 0)/day4sum.length), "soil", gradient17);

			 SVG.get('leafline1').animate().dmove(0,mapToLeaf(weeklyAverage, "soil"));
			 SVG.get('leafline5').animate().dmove(0, mapToLeaf(weeklyAverage, "soil"));
			 SVG.get('leafline9').animate().dmove(0, mapToLeaf(weeklyAverage, "soil"));
			 SVG.get('leafline13').animate().dmove(0, mapToLeaf(weeklyAverage, "soil"));
			 SVG.get('leafline17').animate().dmove(0, mapToLeaf(weeklyAverage, "soil"));

		} else if (	currentVariable== "humidity") {
			updateGradient( (todaysum.reduce(add, 0)/todaysum.length), "humidity", gradient2);
			updateGradient( (day1sum.reduce(add, 0)/day1sum.length), "humidity", gradient6);
			updateGradient( (day2sum.reduce(add, 0)/day2sum.length), "humidity", gradient10);
			updateGradient( (day3sum.reduce(add, 0)/day3sum.length), "humidity", gradient14);
			updateGradient( (day4sum.reduce(add, 0)/day4sum.length), "humidity", gradient18);

			SVG.get('leafline2').animate().dmove(0,mapToLeaf(weeklyAverage, "humidity"));
			SVG.get('leafline6').animate().dmove(0, mapToLeaf(weeklyAverage, "humidity"));
			SVG.get('leafline10').animate().dmove(0, mapToLeaf(weeklyAverage, "humidity"));
			SVG.get('leafline14').animate().dmove(0, mapToLeaf(weeklyAverage, "humidity"));
			SVG.get('leafline18').animate().dmove(0, mapToLeaf(weeklyAverage, "humidity"));

		} else if (	currentVariable== "temperature") {
			updateGradient( (todaysum.reduce(add, 0)/todaysum.length), "temperature", gradient3);
			updateGradient( (day1sum.reduce(add, 0)/day1sum.length), "temperature", gradient7);
			updateGradient( (day2sum.reduce(add, 0)/day2sum.length), "temperature", gradient11);
			updateGradient( (day3sum.reduce(add, 0)/day3sum.length), "temperature", gradient15);
			updateGradient( (day4sum.reduce(add, 0)/day4sum.length), "temperature", gradient19);

			SVG.get('leafline3').animate().dmove(0,mapToLeaf(weeklyAverage, "temperature"));
			SVG.get('leafline7').animate().dmove(0,mapToLeaf(weeklyAverage, "temperature"));
			SVG.get('leafline11').animate().dmove(0, mapToLeaf(weeklyAverage, "temperature"));
			SVG.get('leafline15').animate().dmove(0, mapToLeaf(weeklyAverage, "temperature"));
			SVG.get('leafline19').animate().dmove(0, mapToLeaf(weeklyAverage, "temperature"));

		} else if (currentVariable=="UVlight") {
			updateGradient( todaysum.reduce(add, 0)/todaysum.length, "UVlight", gradient4);
			updateGradient( day1sum.reduce(add, 0)/day1sum.length, "UVlight", gradient8);
			updateGradient( day2sum.reduce(add, 0)/day2sum.length, "UVlight", gradient12);
			updateGradient( day3sum.reduce(add, 0)/day3sum.length, "UVlight", gradient16);
			updateGradient( day4sum.reduce(add, 0)/day4sum.length, "UVlight", gradient20);

			SVG.get('leafline4').animate().dmove(0,mapToLeaf(weeklyAverage, "UVlight"));
			SVG.get('leafline8').animate().dmove(0, mapToLeaf(weeklyAverage, "UVlight"));
			SVG.get('leafline12').animate().dmove(0, mapToLeaf(weeklyAverage, "UVlight"));
			SVG.get('leafline16').animate().dmove(0, mapToLeaf(weeklyAverage, "UVlight"));
			SVG.get('leafline20').animate().dmove(0, mapToLeaf(weeklyAverage, "UVlight"));

		}

  return averages;
}

function showLatestAverages(data) {
   latestData = data.slice(data.length - 200);
   return calcAverages(latestData);
 }

var count = 0;
var now = moment();

function showInfo(data, tabletop) {
  // data comes through as a simple array since simpleSheet is turned on
  var div = document.getElementById('data'),
      html = "<h1>SHEET " + (++count) + "</h1>",
      prop, i;

      var variablename = "";

    
      if (tabletop.foundSheetNames[0] == "soilmoistureSheet1") {
         variablename= "soil";
      } else if (tabletop.foundSheetNames[0] == "humiditySheet1") {
         variablename= "humidity";
      } else if (tabletop.foundSheetNames[0] == "temperatureSheet1") {
         variablename= "temperature";
      } else if (tabletop.foundSheetNames[0] == "UVlightSheet1") {
         variablename= "UVlight";
      }

     calcAverages(data, variablename);

}

window.addEventListener('DOMContentLoaded', init);
