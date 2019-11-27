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
const winnersPerYear = call.winnersPerYearPerTeam(matches); ////
stringify = JSON.stringify(winnersPerYear);
fs.writeFileSync('../output/winnersPerYear.json', stringify, 'utf-8');

//third question
let matchId=call.filterMatchId(matches,'2016')
const extraRunConceded = call.extraRunConceded(deliveries,matchId);
stringify = JSON.stringify(extraRunConceded);
fs.writeFileSync('../output/extraRunConceded.json', stringify, 'utf-8');

//fourth question
matchId=call.filterMatchId(matches,'2015')
const topEconomicBowlers = call.topEconomicBowler(deliveries,matchId);
stringify = JSON.stringify(topEconomicBowlers);
fs.writeFileSync('../output/topEconomicBowlers.json', stringify, 'utf-8');

