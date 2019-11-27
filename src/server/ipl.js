// function for calculating matchs played per yaer
function matchPlayedPerYear(matches) {
  // calcuting matches played per year
  return matches
    .map(match => match['season'])
    .reduce((totalMatchesPerYear, season) => {
      totalMatchesPerYear[season] = totalMatchesPerYear[season] + 1 || 1;
      return totalMatchesPerYear;
    }, {});
}

///// function for finding the winners per year
function winnersPerYearPerTeam(matches) {
  const years = matches.map(match => match.season);
    const year = new Set(years);
  const winnerPerYear = matches.reduce((winnersPerYear, match) => {
    if (match['winner'] !== '') {
      if (!winnersPerYear[match.winner]) {
        //checking whether the season is already present or not
        winnersPerYear[match['winner']] = {}; //create object if not present
      }
      if (!winnersPerYear[match.winner][match['season']]) {
        winnersPerYear[match['winner']][match['season']] = 1;
      } else {
        winnersPerYear[match['winner']][match['season']] += 1;
      }
    }

    return winnersPerYear;
  }, {});

  Object.values(winnerPerYear).forEach((element) => {
    year.forEach((item) => {
      if (!element[item]) {
        element[item] = 0;
      }
    });
  });
  return winnerPerYear;
}

// function for calculating extra runs given  by teams
function extraRunConceded(deliveries, matchIds) {
  //calculatimg extra runs conceded by each team in 2016
  return deliveries.reduce((extraRuns, delivery) => {
    if (matchIds.includes(delivery.match_id)) {
      if (extraRuns[delivery['bowling_team']]) {
        extraRuns[delivery['bowling_team']] += parseInt(delivery['extra_runs']);
      } else
        extraRuns[delivery['bowling_team']] = parseInt(delivery['extra_runs']);
    }

    return extraRuns;
  }, {});
}

function topEconomicBowler(deliveries, matchIds) {
  // calculating balls and runs conceded by each bowler
  const bowlersStats = deliveries.reduce((totalRunsAndBalls, delivery) => {
    if (matchIds.includes(delivery['match_id'])) {
      if (!totalRunsAndBalls[delivery['bowler']]) {
        totalRunsAndBalls[delivery['bowler']] = {};
      }
      if (totalRunsAndBalls[delivery['bowler']].ballsByBowler) {
        totalRunsAndBalls[delivery['bowler']].ballsByBowler += 1;
      } else {
        totalRunsAndBalls[delivery['bowler']].ballsByBowler = 1;
      }
      if (totalRunsAndBalls[delivery['bowler']].runsConcededByBowler) {
        totalRunsAndBalls[delivery['bowler']].runsConcededByBowler += parseInt(
          delivery.total_runs
        );
      } else {
        totalRunsAndBalls[delivery.bowler].runsConcededByBowler = parseInt(
          delivery.total_runs
        );
      }
    }
    return totalRunsAndBalls;
  }, {});

  const economyOfBowlers = Object.entries(bowlersStats).reduce(
    (runRate, runsAndBalls) => {
      runRate[runsAndBalls[0]] =parseFloat((
        runsAndBalls[1].runsConcededByBowler /
        (runsAndBalls[1].ballsByBowler / 6)).toFixed(3));
      return runRate;
    },
    {}
  );

  //finding top 10 economic bolwler
  const topEconomicBowlers = Object.entries(economyOfBowlers)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 10)
    .reduce((a, b) => {
      a[b[0]] = b[1];
      return a;
    }, {});
  return topEconomicBowlers;
}


function filterMatchId(matches, match_id) {
  return matches
    .filter(match => match.season === match_id)
    .map(match => match.id);
}

module.exports = {
  matchPlayedPerYear,
  winnersPerYearPerTeam,
  extraRunConceded,
  topEconomicBowler,
  filterMatchId
};
