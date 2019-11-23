const fs = require('fs');
const csvtojson = require('convert-csv-to-json');
const call = require('./ipl.js');
let matches = csvtojson
  .fieldDelimiter(',')
  .getJsonFromCsv('../data/matches.csv');
let deliveries = csvtojson
  .fieldDelimiter(',')
  .getJsonFromCsv('../data/deliveries.csv');

/** first question  */
const matchPlayedPerYear = call.matchPlayedPerYear(matches); ////
var stringify = JSON.stringify(matchPlayedPerYear);
fs.writeFileSync('../output/matchPlayedPerYear.json', stringify, 'utf-8');

//second question
const winnersPerYear = call.winners(matches); ////
stringify = JSON.stringify(winnersPerYear);
fs.writeFileSync('../output/winnersPerYear.json', stringify, 'utf-8');

//third question
const extraRunConceded = call.extraRunConceded(matches, deliveries);
stringify = JSON.stringify(extraRunConceded);
fs.writeFileSync('../output/extraRunConceded.json', stringify, 'utf-8');

//fourth question
const topEconomicBowlers = call.topEconomicBowler(matches, deliveries);
stringify = JSON.stringify(topEconomicBowlers);
fs.writeFileSync('../output/topEconomicBowlers.json', stringify, 'utf-8');
