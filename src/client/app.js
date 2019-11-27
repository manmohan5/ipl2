function matchPlayedPerYear() {
  fetch('../output/matchPlayedPerYear.json')
    .then(response => response.json())
    .then(matches => {
      const year = Object.keys(matches);
      const match = Object.values(matches);

      Highcharts.chart('matchPlayedPerYear', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Matches Played Per Year'
        },
        subtitle: {
          text: 'Source: Kaggle.com'
        },
        xAxis: {
          categories: year,
          crosshair: true,
          title: {
            text: 'Years'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Matches Per Year'
          }
        },

        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [
          {
            name: 'Matches',
            data: match,
            color: 'green'
          }
        ]
      });
    });
}

function extraRunConceded() {
  fetch('../output/extraRunConceded.json')
    .then(response => response.json())
    .then(matches => {
      const teamName = Object.keys(matches);
      const runs = Object.values(matches);

      Highcharts.chart('extraRunConceded', {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Extra Runs Conceeded By Teams'
        },
        subtitle: {
          text: 'Source: Kaggle.com'
        },
        xAxis: {
          categories: teamName,
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: 'teams runs'
          }
        },

        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [
          {
            name: 'Runs',
            data: runs,
            colorByPoint: true
          }
        ]
      });
    });
}

function topEconomicBowlers() {
  fetch('../output/topEconomicBowlers.json')
    .then(response => response.json())
    .then(matches => {
      const playerName = Object.keys(matches);
      const Economy = Object.values(matches);

      Highcharts.chart('topEconomicBowlers', {
        chart: {
          type: 'line'
        },
        title: {
          text: 'Top 10 Economic Bowlers'
        },
        subtitle: {
          text: 'Source: Kaggle.com'
        },
        xAxis: {
          categories: playerName,
          crosshair: true,
          title: {
            text: 'Bowler name'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Economy'
          }
        },

        plotOptions: {
          line: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [
          {
            name: 'Economy',
            data: Economy,
            colorByPoint: true
          }
        ]
      });
    });
}

function wi() {
  fetch('../output/winnersPerYear.json')
    .then(response => response.json())
    .then(matches => {
      const data = Object.entries(matches);
      const matchesWonPerYear = data.map(element => ({
        name: element[0],
        data: Object.values(element[1])
      }));
      const years = data.map(element => Object.keys(element[1]));
      console.log(years);

      Highcharts.chart('wi', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Matches Won By team Per Year'
        },
        xAxis: {
          categories: years[0]
        },
        yAxis: {
          title: {
            text: 'no. of matches'
          }
        },

        plotOptions: {
          column: {
            stacking: 'normal'
          }
        },
        series: matchesWonPerYear
      });
    });
}
