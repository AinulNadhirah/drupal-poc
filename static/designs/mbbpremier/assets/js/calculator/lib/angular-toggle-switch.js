/* 
 * Ignatius Steven 
 * Tue, 14 Jan 2014 - 5:18:02 PM
 * Big modifications: change ".switch" into ".toggleswitch" due to conflict with datetimepicker.js (they both have .switch class)
 */

angular.module('toggle-switch', ['ng']).directive('toggleSwitch', [ '$timeout', function ( $timeout ) {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
        model: '=',
        onLabel: '@',
        offLabel: '@',
        knobLabel: '@'
    },

    template: '<div class="toggleswitch" ng-click="toggle()"><div ng-class="{\'switch-off\': !model, \'switch-on\': model}"><span class="switch-left" ng-bind-html-unsafe="onLabel">Yes</span><span class="knob" ng-bind="knobLabel">&nbsp;</span><span class="switch-right" ng-bind-html-unsafe="offLabel">No</span></div></div>',
    link: function ($scope, element, attrs) {      

      attrs.$observe('onLabel', function(val) {
        $scope.onLabel = angular.isDefined(val) ? val : 'Yes';
      });

      attrs.$observe('offLabel', function(val) {
        $scope.offLabel = angular.isDefined(val) ? val : 'No';
      });

      attrs.$observe('knobLabel', function(val) {
        $scope.knobLabel = angular.isDefined(val) ? val : '\u00A0';
      });

      $scope.toggle = function toggle() {
        if ( attrs.toggleDisabled === "true" ) {
            return false;
        }
        element.children().addClass('switch-animate');        
        $scope.model = !$scope.model;        
      };
    }
  };
}]);
