
//var WithoutSSCalculatorService = angular.module('WithoutSSCalculatorService', [])
app.service('WithoutSSCalculator', ['TaxRateCalculator','SGCRate',funcontributionTaxion (TaxRateCalculator,SGCRate){
        this.getFinalAmount = funcontributionTaxion (age,datePension,excludeSGC,minTakeHomePay) {
            var sgc=SGCRate.calculateSGCRate(datePension);
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

      };

}]);
