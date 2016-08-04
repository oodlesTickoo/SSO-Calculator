app.service('DonutChartServiceHc',function(){
  this.createChart = function(thpWithoutSS,thpWithSS,taxSaving,optimisedSS){
     
    $('#donutContainer').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        exporting:{
        	enabled:false
        },
        credits:{
        	enabled:false
        },
        title: {
           text: 'Salary Sacrifice Optimisation',
            // align: 'center',
            // verticalAlign: 'middle',
             y: 25
        },
        tooltip: {
        	headerFormat: '<span style="font-weight:700; font-size:14px;">{point.key}</span><br>',
        	// color:{point.color}
            pointFormat: '{series.name}: <b>{point.y}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                size:285,
                startAngle: -100,
                endAngle: 260,
                center: ['50%', '45%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Amount',
            innerSize: '50%',
            colorByPoint:true,
            data: [
                ['THP Without Salary Sacrifice', 40.00],
                ['THP With Salary Sacrifice', 35.00],
                ['Tax Savings',8.00],
                ['Salary Sacrifice', 17.00],
                {
                    name: 'Proprietary or Undetectable',
                    y: 0.2,
                    dataLabels: {
                        enabled: false
                    }
                }
            ]
        }],
        // points : [{point:{name:"bc"}},{point:{name:"bc"}},{point:{name:"bc"}},{point:{name:"bc"}}]
    });



  }
}
);