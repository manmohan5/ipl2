// function for calculating matchs played per yaer
function matchPlayedPerYear(data) {
  // calcuting matches played per year
  let matchPlayed = data
    .map(match => match['season'])
    .reduce((totalMatchesPerYear, season) => {
      totalMatchesPerYear[season] = totalMatchesPerYear[season] + 1 || 1;

      return totalMatchesPerYear;
    }, {});
  return matchPlayed;
}

///// function for finding the winners per year
function winners(matches) {
  const winnerPerYear = matches.reduce((winnersPerYear, item) => {
    if (item['winner'] !== '') {
      if (!winnersPerYear[item.winner]) {
        //checking whether the winner is already present or not
        winnersPerYear[item['winner']] = {}; //create object if not present
      }
      if (!winnersPerYear[item.winner][item['season']]) {
        winnersPerYear[item['winner']][item['season']] = 1;
      } else {
        winnersPerYear[item['winner']][item['season']] += 1;
      }
    }

    return winnersPerYear;
  }, {});

  return winnerPerYear;
}

// function for calculating extra runs given  by teams
function extraRunConceded(matches, deliveries) {
  //find matchsid for the year 2016
  const matchId = matches
    .filter(match => match.season === '2016')
    .map(match => match.id);

  //calculatimg extra runs conceded by each team in 2016
  const extraRunsPerTEam = deliveries.reduce((extraRuns, data) => {
    if (matchId.includes(data.match_id)) {
      if (extraRuns[data['bowling_team']]) {
        extraRuns[data['bowling_team']] += parseInt(data['extra_runs']);
      } else extraRuns[data['bowling_team']] = parseInt(data['extra_runs']);
    }

    return extraRuns;
  }, {});

  return extraRunsPerTEam;
}

function topEconomicBowler(matches, deliveries) {
  //find matchsid for the year 2015
  const matchId = matches
    .filter(match => match.season === '2015')
    .map(match => match.id);

  // calculating balls and runs conceded by each bowler
  const bowlersStats = deliveries.reduce((totalRunsAndBalls, data) => {
    if (matchId.includes(data['match_id'])) {
      if (!totalRunsAndBalls[data['bowler']]) {
        totalRunsAndBalls[data['bowler']] = {};
      }
      if (totalRunsAndBalls[data['bowler']].ballsByBowler) {
        totalRunsAndBalls[data['bowler']].ballsByBowler += 1;
      } else {
        totalRunsAndBalls[data['bowler']].ballsByBowler = 1;
      }
      if (totalRunsAndBalls[data['bowler']].runsConcededByBowler) {
        totalRunsAndBalls[data['bowler']].runsConcededByBowler += parseInt(
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

  //converting key and values as an array
  const entriesOfbowlersStats = Object.entries(bowlersStats);
  //console.log(entriesOfbowlersStats[1][1].ballsByBowler)

  //calcutaing econy of each bowler
  const economyOfBowlers = entriesOfbowlersStats.reduce((runRate, data) => {
    runRate[data[0]] =
      data[1].runsConcededByBowler / (data[1].ballsByBowler / 6);
    return runRate;
  }, {});
  //console.log(economyOfBowlers)
  //finding top 10 economic bolwler
  const topEconomicBowlers = Object.entries(economyOfBowlers)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 10);
  return topEconomicBowlers;
}

module.exports = {
  matchPlayedPerYear,
  winners,
  extraRunConceded,
  topEconomicBowler
};
