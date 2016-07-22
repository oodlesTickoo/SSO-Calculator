app.service('ChartService',function(){
  this.createChart = function(thpWithoutSS,thpWithSS,taxSaving,optimisedSS){
    document.getElementById("myChart").style.display="block";
    var ctx = $("#myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["THP without SS", "THP with SS", "Tax Saving", "Salary Sacrifice"],
            datasets: [{
                // label: '# of Votes',
                data: [thpWithoutSS,thpWithSS,taxSaving,optimisedSS],
                backgroundColor: [
                    'blue',
                    'crimson',
                    'green',
                    'cornflowerblue',
                    // 'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    '#cccccc',
                    '#cccccc',
                    '#cccccc',
                    '#cccccc',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },
           maintainAspectRatio: true,
           responsive : true
        }
    });
  }
})
