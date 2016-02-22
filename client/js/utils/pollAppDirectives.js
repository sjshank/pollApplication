define(['angular',
		'angularAMD',
		'angRoute'],
	function(angular,
			 angularAMD,
			 angRoute){

	return function(pollsApp){
		

		pollsApp.directive('modal', function() {
        return {
          template: '<div class="modal fade">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<h4 class="modal-title"><strong>{{ title }}</strong></h4>' +
            '</div>' +
            '<div class="modal-body" ng-transclude></div>' +
            '</div>' +
            '</div>' +
            '</div>',
          restrict: 'E',
          transclude: true,
          replace: true,
          scope: true,
          link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function(value) {
              if (value == true)
                $(element).modal('show');
              else
                $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function() {
              scope.$apply(function() {
                scope.$parent[attrs.visible] = true;
              });
            });

            $(element).on('hidden.bs.modal', function() {
              scope.$apply(function() {
                scope.$parent[attrs.visible] = false;
              });
            });
          }
        };
    });

// Directive for convert ISO date into Date String
     pollsApp.directive("ngchartDisplay", function() {
          return  {
              link : function(scope, element, attrs, controller) {
                var myDataSource = scope.myDataSource;
                element.html("<canvas id='pollDoughnut' class='chart chart-doughnut' ng-class='chartClass' chart-data='myDataSource.data' chart-colours='myDataSource.colors' chart-labels='myDataSource.labels' chart-series='myDataSource.labels'></canvas>");
              }
          };
    });



	};
});