function matchPlayedPerYear(data) {
  let matchPlayed = data
    .map(match => match['season'])
    .reduce((totalMatchesPerYear, season) => {
      totalMatchesPerYear[season] = totalMatchesPerYear[season] + 1 || 1;

      return totalMatchesPerYear;
    }, {});
  return matchPlayed;
}

///// function for
function winners(data) {
  let obj = {};
  for (let item of data) {
    if (item['winner'] !== '') {
      if (!obj.hasOwnProperty(item['winner'])) {
        obj[item['winner']] = {};
      }
      if (!obj[item['winner']].hasOwnProperty(item['season'])) {
        obj[item['winner']][item['season']] = 1;
      } else {
        obj[item['winner']][item['season']] += 1;
      }
    }
  }

  return obj;
}

function extraRunConceded(matches, deliveries) {
  const matchId = matches
    .filter(match => match.season === '2016')
    .map(match => match.id);

  const extraRunsPerTEam = deliveries.reduce((extraRuns, data) => {
    if (matchId.includes(data.match_id)) {
      if (extraRuns[data.bowling_team]) {
        extraRuns[data.bowling_team] += parseInt(data.extra_runs);
      } else extraRuns[data.bowling_team] = parseInt(data.extra_runs);
    }

    return extraRuns;
  }, {});

  return extraRunsPerTEam;
}

function topEconomicBowler(matches, deliveries) {
  const matchId = matches
    .filter(match => match.season === '2015')
    .map(match => match.id);

  const bowlersStats = deliveries.reduce((totalRunsAndBalls, data) => {
    if (matchId.includes(data.match_id)) {
      if (!totalRunsAndBalls[data.bowler]) {
        totalRunsAndBalls[data.bowler] = {};
      }
      if (totalRunsAndBalls[data.bowler].ballsByBowler) {
        totalRunsAndBalls[data.bowler].ballsByBowler += 1;
      } else {
        totalRunsAndBalls[data.bowler].ballsByBowler = 1;
      }
      if (totalRunsAndBalls[data.bowler].runsConcededByBowler) {
        totalRunsAndBalls[data.bowler].runsConcededByBowler += parseInt(
          data.total_runs
        );
      } else {
        totalRunsAndBalls[data.bowler].runsConcededByBowler = parseInt(
          data.total_runs
        );
      }
    }
    return totalRunsAndBalls;
  }, {});

  const entriesOfbowlersStats = Object.entries(bowlersStats);
  //console.log(entriesOfbowlersStats[1][1].ballsByBowler)
  const economyOfBowlers = entriesOfbowlersStats.reduce((runRate, data) => {
    runRate[data[0]] =
      data[1].runsConcededByBowler / (data[1].ballsByBowler / 6);
    return runRate;
  }, {});
  //console.log(economyOfBowlers)
  const topEconomicBowlers = Object.entries(economyOfBowlers)
    .sort((a, b) => a[1] - b[1])
    .slice(0,10);
  return topEconomicBowlers;
}

module.exports = {
  matchPlayedPerYear,
  winners,
  extraRunConceded,
  topEconomicBowler
};
