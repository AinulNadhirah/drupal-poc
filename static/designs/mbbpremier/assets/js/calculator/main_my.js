

'use strict' 

var app = angular.module('myApp', ['rzModule', 'toggle-switch']);

angular.module('myApp').controller('index', ['$scope', function ($scope) {

    $scope.sliderData = {};

    $scope.sliderData.incrementalDepositAumSlider    = 0;
    $scope.sliderData.lastMonthBalanceSlider         = 0;
    $scope.sliderData.minimum1000                    = false;
    $scope.sliderData.utInvestmentSlider             = 0;
    $scope.sliderData.sdInvestmentSlider             = 0;
    $scope.sliderData.dciInvestmentSlider            = 0;
    $scope.sliderData.annualPremiumPolicy            = 0;
    $scope.sliderData.singlePremiumPolicy            = 0;
    $scope.sliderData.residentialPropertyLoan        = 0;
    $scope.sliderData.residentialPropertyLoanIslamic = 0;

    $scope.expectedTreatPoint = '';

    numeral.language('en', {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
    });

    $scope.currencyFormatting = function (value) {
        return 'RM' + numeral(value).format('0,0');
    }

    $scope.tpFormatting = function (value) {
        return numeral(value).format('0,0');
    }

    $scope.calculateReward = function () {

        $scope.rewardData = null;

        $scope.incrementalDepositAumReward = Math.floor(($scope.sliderData.incrementalDepositAumSlider) / 30000) * 1000;
        if ($scope.sliderData.minimum1000 === true) {
            $scope.minimum1000Reward = 1000;
        }
        else {
            $scope.minimum1000Reward = 0;
        }
        
        var promoTP = 500;    

        /* Modified on 3rd March 2015 by Daisy Wu of Business Strategy & Development - Maybank Premier Wealth */
        $scope.utInvestmentReward = Math.floor($scope.sliderData.utInvestmentSlider / 50000) * 5000;
        $scope.sdInvestmentReward = Math.floor($scope.sliderData.sdInvestmentSlider / 50000) * 1500;
        $scope.dciInvestmentReward = Math.floor($scope.sliderData.dciInvestmentSlider / 50000) * promoTP;
        
        // New additions on 10 Feb 2015
        $scope.annualPremiumPolicyReward        = Math.floor($scope.sliderData.annualPremiumPolicy      / 5000) * 4000;
        $scope.singlePremiumPolicyReward        = Math.floor($scope.sliderData.singlePremiumPolicy      / 30000) * 10000;
        $scope.residentialPropertyLoanReward    = Math.floor($scope.sliderData.residentialPropertyLoan  / 300000) * 10000;
		$scope.residentialPropertyLoanIslamicReward    = Math.floor($scope.sliderData.residentialPropertyLoanIslamic  / 300000) * 10000;

        var totalTP = 
            $scope.incrementalDepositAumReward + 
            $scope.minimum1000Reward + 
            $scope.utInvestmentReward + 
            $scope.sdInvestmentReward + 
            $scope.dciInvestmentReward +
            $scope.annualPremiumPolicyReward +
            $scope.singlePremiumPolicyReward +
            $scope.residentialPropertyLoanReward +
            $scope.residentialPropertyLoanIslamicReward;

        $scope.totalReward = $scope.tpFormatting(totalTP);
        if (totalTP > 200000) {
            $scope.totalReward = $scope.tpFormatting(200000);
        }
    }

    $scope.calculateReward();

    $scope.$watch('sliderData', function (newVal) {
        $scope.calculateReward();
    }, true);

    $scope.$watch( 'expectedTreatPoint', function( newVal ) {

        if ( typeof newVal !== 'undefined' ) {
        
            if ( newVal > 200000 ) {
                newVal = 200000;
                $scope.expectedTreatPoint = 200000;
            }
            
            var promoTP     = 500;                

            $scope.sgdSavings           = Math.ceil( newVal / 1000  ) * 30000;
            $scope.utInvestment         = Math.ceil( newVal / 5000  ) * 50000;
            $scope.sdInvestment         = Math.ceil( newVal / 1500  ) * 50000;
            $scope.dciInvestment        = Math.ceil( newVal / promoTP ) * 50000;            
            $scope.annualPremiumPolicy  = Math.ceil( newVal / 4000  ) * 5000;
            $scope.singlePremiumPolicy  = Math.ceil( newVal / 10000 ) * 30000;
            $scope.residentialProperty  = Math.ceil( newVal / 10000 ) * 300000;
            $scope.residentialPropertyIslamic  = Math.ceil( newVal / 10000 ) * 300000;

        }
    });    

}]);


