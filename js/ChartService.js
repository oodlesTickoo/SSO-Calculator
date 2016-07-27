app.service('ChartService',function(){
  this.createChart = function(thpWithoutSS,thpWithSS,taxSaving,optimisedSS){
    document.getElementById("myChart").style.display="block";
    var ctx = $("#myChart");
    if(window.myChar !== undefined){
    myChar.destroy();
  }
    window.myChar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["THP without SS", "THP with SS", "Tax Saving", "Salary Sacrifice"],
            datasets: [{

                // label: 'Salary Sacrifice Optimistaion',
                data: [thpWithoutSS,thpWithSS,taxSaving,optimisedSS],
                backgroundColor: [
                    'blue',
                    'crimson',
                    'greenyellow',
                    'cornflowerblue'
                ],
                borderColor: [
                    '#cccccc',
                    '#cccccc',
                    '#cccccc',
                    '#cccccc'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        callback: function(value, index, values) {
                          if(value){
                        return "$ " + value/1000 + "k";
                      }else{
                        return "$ " + value;
                      }
                    }
                    },
                    scaleLabel: {
                        // display: true,
                        // labelString: 'probability'
                    }
                }]
            },
            tooltips:{
              callbacks: {
                    label: function(tooltipItems, data) {
                      // console.log(typeOf(tooltipItems.yLabel));
                        return  '$ ' + tooltipItems.yLabel.toFixed(2);
                    }
            }
          },

            legend : {
              display:false
            },
           maintainAspectRatio: true,
           responsive : true,
           title:{
             display:true,
             text:"Salary Sacrifice Optimisation"
           },
           animation :{
           duration : 1000
         }
          //  animation:{
          //    onComplete:function(){
          //      alert("gg");
          //    }
          //  }
        },
        // tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' %' %>"
    });
  }
})
