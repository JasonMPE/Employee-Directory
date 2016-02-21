/**
 * Created by Jason on 2015/11/21.
 */
var app = angular.module("myApp",['ngRoute']);


/*=====================================myCtrl==================================================================*/
app.controller("myCtrl", function($scope, $location, $rootScope, $window, employeeService){
    $scope.firstName = '';
    $scope.lastName = '';
    $scope.title = '';
    $scope.pic = '';
    $scope.directReports = '';
    $scope.managerId = '';
    $scope.manager = '';
    $scope.city = '';
    $scope.startDate = '';
    $scope.officePhone = '';
    $scope.cellPhone = '';
    $scope.SMS = '';
    $scope.email = '';

    $scope.incomplete = false;

    $scope.employees = employeeService.getEmployee();

    $scope.go = function(path){
        $location.path(path);
    };

    $rootScope.back = function(){
        $window.history.back();
    };

});

/*======================================detailCtrl=============================================================*/
app.controller("detailCtrl", function($scope, $routeParams, employeeService){
    $scope.employee = employeeService.getByID(parseInt($routeParams.id));
});

/*=========================================reports=============================================================*/
app.controller('reportsCtrl', function($scope, $routeParams, employeeService){
    $scope.employeeDetail = employeeService.getByID($routeParams.id);
    $scope.reportEmployee = employeeService.getByManageId(parseInt($routeParams.id));
});

/*============================================newEmployee=======================================================*/
app.controller('newEmployeeCtrl', function($scope, employeeService){

    $scope.saveNew = function(){
        employeeService.saveNew($scope.firstName, $scope.lastName, $scope.title, $scope.manager, $scope.managerId, $scope.directReports, $scope.pic, $scope.city, $scope.startDate, $scope.officePhone, $scope.cellPhone, $scope.SMS, $scope.email);
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.title = '';
        $scope.pic = '';
        $scope.directReports = '';
        $scope.managerId = '';
        $scope.manager = '';
        $scope.city = '';
        $scope.startDate = '';
        $scope.officePhone = '';
        $scope.cellPhone = '';
        $scope.SMS = '';
        $scope.email = '';
    };
    /*-------------------------watch to Validate-----------------------------------------------*/
    $scope.$watch('firstName', function(){$scope.save();});
    $scope.$watch('lastName', function(){$scope.save();});
    $scope.$watch('title', function(){$scope.save();});
    $scope.$watch('pic', function(){$scope.save();});
    $scope.$watch('directReports', function(){$scope.save();});
    $scope.$watch('managerId', function(){$scope.save();});
    $scope.$watch('manager', function(){$scope.save();});
    $scope.$watch('city', function(){$scope.save();});
    $scope.$watch('startDate', function(){$scope.save();});
    $scope.$watch('officePhone', function(){$scope.save();});
    $scope.$watch('cellPhone', function(){$scope.save();});
    $scope.$watch('SMS', function(){$scope.save();});
    $scope.$watch('email', function(){$scope.save();});

    $scope.save = function(){
        $scope.incomplete = false;
        if(!$scope.firstName.length || !$scope.lastName.length || !$scope.title.length || !$scope.manager.length ||
            !$scope.managerId.length || !$scope.directReports.length || !$scope.pic.length || !$scope.city.length ||
            !$scope.startDate.length || !$scope.officePhone.length || !$scope.cellPhone.length || !$scope.SMS.length
            || !$scope.email.length){

            $scope.incomplete = true;
        }
    };

});

/*===========================================editEmployee======================================================*/
app.controller('editEmployeeCtrl', function($scope, $routeParams, employeeService){
    $scope.editEmployee = employeeService.getByID(parseInt($routeParams.id));

    $scope.id = parseInt($routeParams.id);
    $scope.email = $scope.editEmployee.email;
    $scope.SMS = $scope.editEmployee.SMS;
    $scope.cellPhone = $scope.editEmployee.cellPhone;
    $scope.officePhone = $scope.editEmployee.officePhone;
    $scope.startDate = $scope.editEmployee.startDate;
    $scope.city = $scope.editEmployee.city;
    $scope.manager = $scope.editEmployee.manager;
    $scope.managerId = $scope.editEmployee.managerId;
    $scope.directReports = $scope.editEmployee.directReports;
    $scope.pic = $scope.editEmployee.pic;
    $scope.title = $scope.editEmployee.title;
    $scope.lastName = $scope.editEmployee.lastName;
    $scope.firstName = $scope.editEmployee.firstName;

    $scope.saveChanges = function(){
        employeeService.saveChanges($scope.id, $scope.firstName, $scope.lastName, $scope.title, $scope.manager, $scope.managerId, $scope.directReports, $scope.pic, $scope.city, $scope.startDate, $scope.officePhone, $scope.cellPhone, $scope.SMS, $scope.email);
    };

    /*-------------------------watch to Validate-----------------------------------------------*/
    $scope.$watch('firstName', function(){$scope.save();});
    $scope.$watch('lastName', function(){$scope.save();});
    $scope.$watch('title', function(){$scope.save();});
    $scope.$watch('pic', function(){$scope.save();});
    $scope.$watch('directReports', function(){$scope.save();});
    $scope.$watch('managerId', function(){$scope.save();});
    $scope.$watch('manager', function(){$scope.save();});
    $scope.$watch('city', function(){$scope.save();});
    $scope.$watch('startDate', function(){$scope.save();});
    $scope.$watch('officePhone', function(){$scope.save();});
    $scope.$watch('cellPhone', function(){$scope.save();});
    $scope.$watch('SMS', function(){$scope.save();});
    $scope.$watch('email', function(){$scope.save();});

    $scope.save = function(){
        $scope.incomplete = false;
        if(!$scope.firstName.length || !$scope.lastName.length || !$scope.title.length || !$scope.manager.length ||
            !$scope.managerId.length || !$scope.directReports.length || !$scope.pic.length || !$scope.city.length ||
            !$scope.startDate.length || !$scope.officePhone.length || !$scope.cellPhone.length || !$scope.SMS.length
            || !$scope.email.length){

            $scope.incomplete = true;
        }
    };
});

/*==========================================Services==========================================================*/
app.factory('employeeService', function($http){
    var id, firstName, lastName, title, manager, managerId, directReports, pic, city, startDate, officePhone, cellPhone, SMS, email, employees;

    $http.get("/api/employees").success(function(res){
        employees = res;
    });

    return {
        getEmployee: function(){
            return employees;
        },

        getByID: function(id){
            return employees[id - 1];
        },

        getByManageId: function(id){
           return employees.filter(function(element){
                return id === Number(element.managerId);
            });
        },
        saveNew: function(firstName, lastName, title, manager, managerId, directReports, pic, city, startDate, officePhone, cellPhone, SMS, email){
            var employeeId = employees.length + 1;
            var newEmployee = {
                id: employeeId,
                firstName : firstName,
                lastName : lastName,
                title : title,
                manager : manager,
                managerId : managerId,
                directReports : directReports,
                pic : pic,
                city : city,
                startDate : startDate,
                officePhone : officePhone,
                cellPhone : cellPhone,
                SMS : SMS,
                email : email
            };

            employees.push(newEmployee);

            $http.post('/api/employees', newEmployee).success(function(res){
                console.log(res);
            });

            //Direct Report Number changed!
            var DR = parseInt(employees[parseInt(managerId) - 1].directReports);
            employees[parseInt(managerId) - 1].directReports = (DR + 1).toString();
            $http.put('/api/employees/'+ managerId,employees[parseInt(managerId) - 1]).success(function(res){
                console.log(res);
            });
        },

        saveChanges: function(id, firstName, lastName, title, manager, managerId, directReports, pic, city, startDate, officePhone, cellPhone, SMS, email){
            //Direct Report Number changed!
            var oldManagerId = employees[id - 1].managerId;
            var DR = parseInt(employees[parseInt(oldManagerId) - 1].directReports);
            employees[parseInt(oldManagerId) - 1].directReports = (DR - 1).toString();
            $http.put('/api/employees/'+ oldManagerId,employees[parseInt(oldManagerId) - 1]).success(function(res){
                console.log(res);
            });
            employees[id - 1].email = email;
            employees[id - 1].SMS = SMS;
            employees[id - 1].cellPhone = cellPhone;
            employees[id - 1].officePhone = officePhone;
            employees[id - 1].startDate = startDate;
            employees[id - 1].city = city;
            employees[id - 1].manager = manager;
            employees[id - 1].managerId = managerId;
            employees[id - 1].directReports = directReports;
            employees[id - 1].pic = pic;
            employees[id - 1].title = title;
            employees[id - 1].lastName = lastName;
            employees[id - 1].firstName = firstName;

            $http.put('/api/employees/' + id, employees[id - 1]).success(function(res){
                console.log(res);
            });
            //Direct Report Number changed!
            var DR1 = parseInt(employees[parseInt(managerId) - 1].directReports);
            employees[parseInt(managerId) - 1].directReports = (DR1 + 1).toString();
            $http.put('/api/employees/'+ managerId,employees[parseInt(managerId) - 1]).success(function(res){
                console.log(res);
            });
        }

    };
});
