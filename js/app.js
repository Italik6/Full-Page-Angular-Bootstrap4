(function () {
    var app = angular.module('ContactApp', ['ngMessages', 'ngCookies']);
//Validation by function
    function IbanValidate(iban) {
        if (iban.length != 26) return false;
        var wagi = [1, 10, 3, 30, 9, 90, 27, 76, 81, 34, 49, 5, 50, 15, 53, 45, 62, 38, 89, 17, 73, 51, 25, 56, 75, 71, 31, 19, 93, 57];
        iban = iban.substring(2, 27) + "2521" + iban.substring(0, 2);
        var z = 0;
        for (i = 0; i < 30; i++) {
            z = z + iban[29 - i] * wagi[i];
        }
        return z % 97 === 1
    }
    app.directive('iban', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$validators.iban = function (modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be valid
                        return true;
                    }
                    if (IbanValidate(viewValue)) {
                        // it is valid
                        return true;
                    }
                    // it is invalid
                    return false;
                };
            }
        };
    });
//Get dates from database
    app.controller('Dates', ['$scope', '$http', function ($scope, $http) {
        $scope.apiUrl = "";
        $scope.dates = {};

        $scope.init = function () {
            $http.get($scope.apiUrl)
                .then($scope.succes, $scope.error);
        };

        $scope.succes = function (resp) {
            $scope.dates = resp.data.body;
        };

        $scope.error = function (resp) {

        };

        $scope.init();
    }]);
    
//Contact Controller
    app.controller('Contact', ['$scope', '$http', '$rootScope', '$timeout', function ($scope, $http, $rootScope, $timeout) {
        $scope.apiUrl = "";

        $scope.resultMsg = "";
        $scope.validationMsg = {}; // model binding do viewsa aby wyswietlic pod pola
        $scope.isFormValid = false;
        $scope.isSubmitting = false;
        
        $scope.successCallback = function(resp) {
            
            if(resp.data.status == 0)
            {
                $scope.isFormValid = true;
            }
            else
            {
                
                $scope.resultMsg = resp.data.msg;
                $scope.validationMsg = resp.data.body;
                Recaptcha.reload();

                //console.log(resp);
            }
            //$scope.isFormValid = true;
            $scope.isSubmitting = false;
            
            $timeout(function(){
             $.fn.fullpage.reBuild();
            },0,false);
        };
        
        $scope.errorCallback = function (resp) {

            //console.log(resp);
            $scope.isSubmitting = false;
            Recaptcha.reload();
            
            $timeout(function(){
             $.fn.fullpage.reBuild();
            },0,false);
        };

        $scope.add = function () {
            if ($scope.EmailAddress != $scope.EmailAddressRepeat) {
                $scope.IsMatch = true;
                return false;
            }
            $scope.IsMatch = false;
        }
    }]);
    //Comparison dates
//    
//     $scope.succes = function (resp) {
//            $scope.dates = resp.data.body;
//            
//            var startDateSplitted = resp.data.body.StartDate.split('.');
//            var startDate = new Date(startDateSplitted[2] - 0,startDateSplitted[1] - 1,startDateSplitted[0] - 0);
//            
//            var endDateSplitted = resp.data.body.EndDate.split('.');
//            var endDate = new Date(endDateSplitted[2] - 0,endDateSplitted[1] - 1,endDateSplitted[0] - 0, 23,59,59);
//            
//            var actualDate = new Date();
//            
//            if((actualDate <= endDate) && (actualDate >= startDate))
//           {
//                $scope.IsDateValid = true;
//           }
//            
//            $timeout(function(){
//             $.fn.fullpage.reBuild();
//            },0,false);
//        };
//Cookiess
    app.controller('myCiacho', ['$scope', '$cookies', '$cookieStore', function ($scope, $cookies, $cookieStore) {
        $scope.ifExists = false;
        $scope.ifExists = ($cookies.get('ciacho') == null ? false : true);
        $scope.saveCookie = function () {
            $cookieStore.put('ciacho', 'ciacho');
            $scope.ifExists = true;
        };
    }]);
})();