
//var WithoutSSCalculatorService = angular.module('WithoutSSCalculatorService', [])
app.service('WithSSCalculator', ['TaxRateCalculator','SGCRate','AgeCalculator',function(TaxRateCalculator,SGCRate,AgeCalculator){
        this.getFinalAmount = function(dob,datePension,excludeSGC,minTakeHomePay,taxWithoutSS) {
            var age = AgeCalculator.getAge(dob);
            // var sgc=SGCRate.calculateSGCRate(datePension);
            var concessionalContributionCap;
            concessionalContributionCap=age<49?30000:35000;
            var concessionalContributionTax=0.15;
            var excessContributionTax=0.32;

            var totalEmployerContribution = SGCRate.calculateSGCRate(datePension)*excludeSGC;

            var validEmployerContribution;

            var upperSS;

            if(totalEmployerContribution >= 19307.80){
            validEmployerContribution = 19307.80;
            }else{
            validEmployerContribution = totalEmployerContribution;
            }

            upperSS = concessionalContributionCap - validEmployerContribution;

            var grossAnnualIncomebeforeSGC=excludeSGC;

            var minTax = excludeSGC;

            // var taxSaving = 0;

            var optimisedSS = 0;

            var optimisedTakeHomePay = 0;

            var unattainableTHP = true;

            var finalAmountWithSS = 0;

            for(ss=1;ss<=upperSS;ss++){
            var additionalConcessionalContribution = ss;
            var assessableAnnualIncome=grossAnnualIncomebeforeSGC-additionalConcessionalContribution;
            var personalTax= TaxRateCalculator.getTaxBase(assessableAnnualIncome)+TaxRateCalculator.getTaxRate(assessableAnnualIncome)*(assessableAnnualIncome-1-TaxRateCalculator.getLowerBoundValue(assessableAnnualIncome));
            var takehomePay=assessableAnnualIncome-personalTax;
            if(takehomePay >= minTakeHomePay){
              var concessionalContribution=additionalConcessionalContribution+validEmployerContribution;
              if(concessionalContribution>concessionalContributionCap){
                    var contributionTax=concessionalContribution*concessionalContributionTax+((concessionalContribution-concessionalContributionCap)*excessContributionTax);
              }else{
                    var contributionTax=concessionalContribution*concessionalContributionTax+0;
              }
              var boostUpSuperBalanceBy=concessionalContribution-contributionTax;
              var finalAmount=takehomePay+boostUpSuperBalanceBy;
              var totalTaxPaid=personalTax+contributionTax;

              // if(totalTaxPaid < taxWithoutSS && totalTaxPaid < minTax){
              if(totalTaxPaid < minTax){
                minTax = totalTaxPaid;
                optimisedSS = additionalConcessionalContribution;
                optimisedTakeHomePay = takehomePay;
                unattainableTHP = false;
                finalAmountWithSS = finalAmount;
              }
            }
          }

          return [optimisedTakeHomePay,minTax,finalAmountWithSS,optimisedSS,unattainableTHP];


      };

}]);
