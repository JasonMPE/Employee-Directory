/**
 * Created by Jason on 2015/11/22.
 */
app.config(['$routeProvider',
    function($routeProvider){
        //noinspection JSUnresolvedFunction
        $routeProvider.
            when('/', {
                templateUrl:'view/employeelist.html',
                controller: 'myCtrl'
            }).
            when('/employees/:id', {
                templateUrl:'view/detail.html',
                controller:'detailCtrl'
            }).
            when('/employees/:id/reports', {
                templateUrl:'view/reports.html',
                controller:'reportsCtrl'
            }).
            when('/newEmployee',{
                templateUrl:'view/new.html',
                controller:'newEmployeeCtrl'
            }).
            when('/editEmployee/:id',{
                templateUrl:'view/edit.html',
                controller:'editEmployeeCtrl'
            }).
            otherwise({
            redirectTo: '/'
        });
    }]);
