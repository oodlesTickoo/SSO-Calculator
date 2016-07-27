
//var WithoutSSCalculatorService = angular.module('WithoutSSCalculatorService', [])
app.service('WithoutSSCalculator', ['TaxRateCalculator','SGCRate','AgeCalculator',function(TaxRateCalculator,SGCRate,AgeCalculator){
        this.getFinalAmount = function(dob,datePension,excludeSGC,minTakeHomePay){
            var age = AgeCalculator.getAge(dob,datePension.getFullYear());
            var sgc=SGCRate.calculateSGCRate(datePension)*excludeSGC;
            var concessionalContributionCap;
            concessionalContributionCap=age<49?30000:35000;
            var concessionalContributionTax=0.15;
            var excessContributionTax=0.32;
            var grossAnnualIncomebeforeSGC=excludeSGC;
            var additionalConcessionalContribution=0;
            var assessableAnnualIncome=grossAnnualIncomebeforeSGC-additionalConcessionalContribution;
            var personalTax= TaxRateCalculator.getTaxBase(assessableAnnualIncome)+TaxRateCalculator.getTaxRate(assessableAnnualIncome)*(assessableAnnualIncome-1-TaxRateCalculator.getLowerBoundValue(assessableAnnualIncome));
            var takehomePay=assessableAnnualIncome-personalTax;
            var concessionalContribution=additionalConcessionalContribution+sgc;
            if(concessionalContribution>concessionalContributionCap){
                  var contributionTax=concessionalContribution*concessionalContributionTax+((concessionalContribution-concessionalContributionCap)*excessContributionTax);
            }else{
                  var contributionTax=concessionalContribution*concessionalContributionTax+0;
            }
            var boostUpSuperBalanceBy=concessionalContribution-contributionTax;
            var finalAmount=takehomePay+boostUpSuperBalanceBy;
            var ttakehomePay=personalTax+contributionTax;
            console.log(personalTax);
            console.log(contributionTax);
            return [takehomePay,ttakehomePay,finalAmount];
      };

}]);
