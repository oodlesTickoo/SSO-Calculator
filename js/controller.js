app.controller("TTRController",['$scope','AgeCalculator','TaxRateCalculator','SGCRate','WithoutSSCalculator','WithSSCalculator','ChartService','ChartServiceHc',function($scope,AgeCalculator,TaxRateCalculator,SGCRate,WithoutSSCalculator,WithSSCalculator,ChartService,ChartServiceHc){

  // $scope.rate = SGCRate.calculateSGCRate(new Date(2011,11,11));

  $scope.dob = new Date();
  $scope.datePension = new Date();
  $scope.datePension.setMonth(6);
  $scope.datePension.setDate(1);
  $scope.resultWithSS=[0,0,0];
  $scope.resultWithoutSS=[0,0,0];

  $scope.excludeSGC = 80000;
  $scope.target = 40000;

  $scope.maxTHP = 0; 

  $scope.maxTHPError = false;

  $scope.csesError = false;

  $scope.thpError = false;

  $scope.csesZeroError = false;
  
  $scope.infoShow=function(value){
    if(value){
      document.getElementsByClassName("information-overlay")[0].style.visibility="visible";
      document.getElementsByClassName("information-overlay")[0].style.zIndex="9999";
      document.getElementsByClassName("information-overlay")[0].style.position="inline-block";
      document.getElementsByClassName("information-overlay")[0].style.height =  ""+(document.getElementsByClassName("otrp-calculator")[0].clientHeight-10)+"px";
    }else{
      document.getElementsByClassName("information-overlay")[0].style.visibility="hidden";
    }
  }
  // $scope.unattainableTHP = false;

  $scope.firstDP = function(){
    $scope.dateOptions.maxDate = new Date();
  }

  $scope.secondDp = function(){
    delete $scope.dateOptions.maxDate;
  }

  $scope.today = function(){
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
      $scope.dt = null;
    };

    $scope.inlineOptions = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: true
    };

    $scope.dateOptions = {
      // dateDisabled: disabled,
      formatYear: 'yy',
      // maxDate: new Date(2020, 5, 22),
      // minDate: new Date(),
      startingDay: 1,
      showWeeks: false
    };

    $scope.toggleMin = function() {
      $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
      $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
      $scope.popup1.opened = true;
      $scope.firstDP();
    };

    $scope.open2 = function() {
      $scope.secondDp();
      $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
      $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate','dd/MM/yyyy'];
    $scope.format = $scope.formats[4];
    // $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
      opened: false
    };

    $scope.popup2 = {
      opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

    function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);

        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }

      return '';
    }

    // $scope.getAge = function(){
    //   $scope.age = AgeCalculator.getAge($scope.dob);
    // }

    $scope.Math = window.Math;

    $scope.calculationsDone = false;

    $scope.unattainableTHP = false;

    $scope.attainableTHP = false;

    $scope.unattainableTHPS = false;

    $scope.optimisedSS;

    $scope.maxTHP =  WithoutSSCalculator.getFinalAmount($scope.dob,$scope.datePension,$scope.excludeSGC,$scope.target,true);


    $scope.calculateMaxTHP = function(){
      $scope.thpError = false;
      $scope.csesError = false;
      $scope.csesZeroError = false;
      if($scope.target >= $scope.excludeSGC){
        $scope.thpError = true;
      }else{
     $scope.maxTHP =  WithoutSSCalculator.getFinalAmount($scope.dob,$scope.datePension,$scope.excludeSGC,$scope.target,true);
     if($scope.maxTHP < $scope.target){
      $scope.thpError = true;
      console.log($scope.thpError);
     }
   }
     if($scope.excludeSGC > 300000){
      $scope.csesError = true;
     }
     if($scope.excludeSGC === 0){
      $scope.csesZeroError = true;
     }
    }

    // $scope.calculateMaxTHP();
    
     $scope.changeTHP = function(){
      $scope.thpError = false;
     if($scope.maxTHP < $scope.target){
      $scope.thpError = true;
     }
    }


    $scope.submitForm = function(isValid){
      if(isValid){
        $scope.calculationsDone = true;
        $scope.resultWithoutSS = WithoutSSCalculator.getFinalAmount($scope.dob,$scope.datePension,$scope.excludeSGC,$scope.target,false);
        $scope.thpWithoutSS = $scope.resultWithoutSS[0];
        $scope.taxWithoutSS = $scope.resultWithoutSS[1];
        $scope.finalAmountWithoutSS = $scope.resultWithoutSS[2];
        $scope.unattainableTHPS = $scope.resultWithoutSS[3];
        $scope.resultWithSS = WithSSCalculator.getFinalAmount($scope.dob,$scope.datePension,$scope.excludeSGC,$scope.target,$scope.taxWithoutSS);
        $scope.thpWithSS = $scope.resultWithSS[0];
        $scope.taxWithSS = $scope.resultWithSS[1];
        $scope.finalAmountWithSS = $scope.resultWithSS[2];
        // $scope.finalSS = $scope.resultWithSS[3];
        $scope.optimisedSS = $scope.resultWithSS[3];
        $scope.unattainableTHP = $scope.resultWithSS[4];
        $scope.attainableTHP = !$scope.unattainableTHP;
        if($scope.attainableTHP && !$scope.unattainableTHPS){
          // ChartService.createChart(Number($scope.thpWithoutSS.toFixed(2)),Number($scope.thpWithSS.toFixed(2)),Number(($scope.taxWithoutSS - $scope.taxWithSS).toFixed(2)), Number($scope.optimisedSS.toFixed(2)));
          ChartServiceHc.createChart(Number($scope.thpWithoutSS.toFixed(2)),Number($scope.thpWithSS.toFixed(2)),Number(($scope.taxWithoutSS - $scope.taxWithSS).toFixed(2)), Number($scope.optimisedSS.toFixed(2)));

        }
        // else{
        //   if(window.myChar !== undefined){
        //     myChar.destroy();
        //     document.getElementById("myChart").style.display="none";
        //   }
        // }
        console.log("complete");
      }
      else{
        console.log("has errors");
      }
    }

    $scope.submitForm(true);

    $scope.overlay = false;



}]);
