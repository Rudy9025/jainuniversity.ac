var app = angular.module('juJainApp', []);
app.controller('juJainCtrl', function($scope, $window, $http, $location, $timeout) {
    $scope.showMoreEvents = 0;
    $scope.site_url = site_url;
    $scope.bouchuredownLoadPdf = downLoadPdf;
    $scope.utm_source = utmSource;
    $scope.utm_medium = utmMedium;
    $scope.utm_campaign = utmCampaign;
    $scope.utm_term = utmTerm;
    $scope.utm_content = utmContent;
    $scope.url = currentUrl;
    $scope.programes = function() {
        $http.get($scope.site_url + "getallprograms").then(function(response) {
            $scope.programs = response.data;
        });
    };

    $scope.getState = function() {
        $http.get($scope.site_url + "getState").then(function(response) {
            $scope.states = response.data;
        });
    };
    $scope.stateName;
    $scope.getCity = function(state) {
        $http.get($scope.site_url + "getCity/" + state).then(function(response) {
            $scope.cities = response.data;
        });
        $http.get($scope.site_url + "getStateName/" + state).then(function(response) {
            $scope.stateName = response.data.name;
        });
    };

    $scope.eventSubmitFunction = function() {
        if ($scope.enq_form.$valid) {
            $scope.Program_type = $("#Program_type").val();
            $scope.Program = $("#Program").val();
            $scope.Course = $("#Course").val();
            var enquiryFormData = {
                'FirstName': $scope.txtName,
                'Email': $scope.txtEmail,
                'MobileNumber': $scope.txtMobile,
                'Course': $scope.Program_type,
                'Center': $scope.Program,
                'Location': $scope.Course,
                'City': $scope.txtcity,
                'State': $scope.stateName,
                'Remarks': $scope.comments
            };
            $http({
                method: 'POST',
                url: $scope.site_url + 'save_equiry_form',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $.param(enquiryFormData)
            }).then(function(response) {
                window.location = $scope.site_url + 'thank-you';

            });
        }
    };



    $scope.brochureDownload = function() {
        if ($scope.brochureDownloadForm.$valid) {
            $scope.source = "JU Brochure Download";
            $scope.plumbSource = "Brochure Download";
            $scope.subsource = "mx_sub_source";
            var broucherFormData = {
                'Name': $scope.name,
                'Email': $scope.email,
                'Number': $scope.mobile,
                'Program': $scope.ProgramName,
                'ProgramCode': $scope.Program_Code,
                'Course': $scope.Course_name,
                'CourseCode': $scope.Course_Code,
                'Slug': window.location.href,
                'State': $scope.stateName,
                'City': $scope.city,
                'source': $scope.source,
                'subsource': $scope.subsource,
                'URL': $scope.url,
                'UTMSource': $scope.utm_source,
                'UTMMedium': $scope.utm_medium,
                'UTMCampaign': $scope.utm_campaign,
                'UTMTerm': $scope.utm_term,
                'UTMContent': $scope.utm_content,
            };

            $scope.prgm = $scope.ProgramDegree + ' ' + $scope.ProgramName;


            var leadsquaredFormData = {
                'Name': $scope.name,
                'Email': $scope.email,
                'Mobile': $scope.mobile,
                'Program': $scope.prgm,
                'ProgramCode': $scope.Program_Code,
                'Specialization': $scope.Course_name,
                'CourseCode': $scope.Course_Code,
                'Slug': window.location.href,
                'State': $scope.stateName,
                'City': $scope.city,
                'source': $scope.source,
                'subsource': $scope.subsource,
                'URL': $scope.url,
                'UTMSource': $scope.utm_source,
                'UTMMedium': $scope.utm_medium,
                'UTMCampaign': $scope.utm_campaign,
                'UTMTerm': $scope.utm_term,
                'UTMContent': $scope.utm_content,
            };

            var online_PlumbData = {
                'Name': $scope.name,
                'Email': $scope.email,
                'Mobile': $scope.mobile,
                'State': $scope.stateName,
                'City': $scope.city,
                'Program': $scope.prgm,
                'Specialization': $scope.Course_name,
                'source': $scope.plumbSource,
            };

            if ($scope.prgm === 'Bachelor of Arts' ||
                $scope.prgm === 'Bachelor of Arts (for Professional Courses)' ||
                $scope.prgm === 'Bachelor of Business Administration' ||
                $scope.prgm === 'Bachelor of Business Administration Global Qualification' ||
                $scope.prgm === 'Bachelor of Commerce (Honours / Honours with Research) (for Professional Courses)' ||
                $scope.prgm === 'Bachelor of Commerce (Honours / Honours with Research) (Regular)' ||
                $scope.prgm === 'Bachelor of Commerce (Honours / Honours with Research) with Global Qualification' ||
                $scope.prgm === 'Bachelor of Computer Application (BCA - Specialization)' ||
                $scope.prgm === 'Bachelor of Design' ||
                $scope.prgm === 'Bachelor of Fine Arts (Honours)' ||
                $scope.prgm === 'Bachelor of Management Studies (BMS)' ||
                $scope.prgm === 'Bachelor of Optometry (B. Optom)' ||
                $scope.prgm === 'Bachelor of Physical Education and Sports' ||
                $scope.prgm === 'Bachelor of Physiotherapy' ||
                $scope.prgm === 'Bachelor of Science (B.Sc)' ||
                $scope.prgm === 'Bachelor of Science (for Professional Courses)' ||
                $scope.prgm === 'Bachelor of Science with Global Qualification' ||
                $scope.prgm === 'Bachelor of Sports Sciences' ||
                $scope.prgm === 'Master of Arts' ||
                $scope.prgm === 'Master of Design' ||
                $scope.prgm === 'Master of Performing Arts' ||
                $scope.prgm === 'Master of Science' ||
                $scope.prgm === 'Post Graduate Diploma') {
                $http({
                    method: 'POST',
                    url: $scope.site_url + "download_PlumbLeads",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param(online_PlumbData)
                });
            }
            if ($scope.prgm == 'Bachelor of Technology (B.Tech)' || $scope.prgm == 'Bachelor of Technology (Lateral Entry)' ||
                $scope.prgm == 'Master of Technology (M.Tech)' || $scope.prgm == 'Bachelor of Computer Application (BCA-Electives)' ||
                $scope.prgm == 'Bachelor of Computer Application (BCA - Specialization)') {
                $http({
                    method: 'POST',
                    url: $scope.site_url + "ajax_dschoolenquiry_leads",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param(leadsquaredFormData)
                });
            } else if ($scope.prgm == 'Bachelor of Design' || $scope.prgm == 'Bachelor of Management Studies (BMS)' ||
                $scope.prgm == 'Master of Design' ||
                $scope.prgm == 'Master of Arts' ||
                $scope.prgm == 'Master of Arts (MA)' ||
                $scope.prgm == 'Master of Arts (English)' ||
                $scope.prgm == 'Master of Performing Arts (MPA)' ||
                $scope.prgm == 'Master of Library and Information Science' ||
                $scope.prgm == 'Master of Science' ||
                $scope.prgm == 'Master of Commerce' ||
                $scope.prgm == 'Master of Commerce (Specialisation)' ||
                $scope.prgm == 'Master of Computer Applications with Specialization' ||
                $scope.prgm == 'Master of Computer Applications with Electives' ||
                $scope.prgm == 'Postgraduate Diploma Programs') {
                $http({
                    method: 'POST',
                    url: $scope.site_url + "leadsquaredleads",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param(leadsquaredFormData)
                }).then(function(response) {

                });
            } else {

            }
            // basha
            if ($scope.Course_name === 'Data Science and Analytics') {
                $http({
                    method: 'POST',
                    url: $scope.site_url + "leadsquaredleads",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param(leadsquaredFormData)
                }).then(function(response) {
                    $window.open($scope.bouchuredownLoadPdf, '_blank');
                    window.location = $scope.site_url + 'thank-you';
                });
            }

            // basha
            $http({
                method: 'POST',
                url: $scope.site_url + 'downloadBroucherForm',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $.param(broucherFormData)
            }).then(function(response) {
                $window.open($scope.bouchuredownLoadPdf, '_blank');
                window.location = $scope.site_url + 'thank-you';

            });
            $http({
                method: 'POST',
                url: 'https://script.google.com/macros/s/AKfycbwHU08XHm-x-amOwxHKmXd38IcTCW6a0MNs0ah6KRulKyKy3_LjNpN2YUgTBvGHdMRL/exec',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $.param(broucherFormData)
            });
        }
        return false;
    };

});
app.controller('searchCtrl', function($scope, $http) {
    $scope.searchBlog = function($id) {
        if ($id == 1) {
            $http.get(site_url + "event/searchingPages").then(function(response) {
                $scope.pages = response.data;
            });
        }
        if ($id == 2) {
            $http.get(site_url + "event/searchingPrograms").then(function(response) {
                $scope.programs = response.data;
            });
        }
        if ($id == 3) {
            $http.get(site_url + "event/searchingCourses").then(function(response) {
                $scope.course = response.data;
            });
        }
    };
});

app.directive('numbersOnly', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
app.controller('thankUCtrl', function($scope, $http, $location, $timeout) {
    $scope.site_url = site_url;
    $timeout(function() {
        window.location = $scope.site_url;
    }, 5000);
});