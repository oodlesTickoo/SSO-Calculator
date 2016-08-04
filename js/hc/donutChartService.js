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
           text: 'Salary Sacrifice Optimisation'
            // align: 'center',
            // verticalAlign: 'middle',
            // y: -10
        },
        tooltip: {
        	headerFormat: '<span style="font-weight:700;color:{point.color}">{point.key}</span><br>',
            pointFormat: '{series.name}: <b>{point.y}%</b>'
         // formatter:function(){
         //          return '<span style="color:'+this.series.color+'">'+this.key+'</span>: <b>'+Highcharts.numberFormat((this.y*100),2,'.')+'%</b>';
         //        }
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
    //                 formatter: function () {
    //     // return Highcharts.numberFormat(this.y,2);
    //     return this.key;
    // },
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                size:280,
                startAngle: -100,
                endAngle: 260,
                center: ['50%', '50%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Amount',
            innerSize: '50%',
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