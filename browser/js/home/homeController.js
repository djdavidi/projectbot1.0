app.controller('HomeCtrl', function($scope, AuthService, $state, ApiFactory, RandomFactory) {
    $scope.selectedApis = [];
    $scope.selectedDatasets = [];
    $scope.selectedTools = [];
    $scope.resultObjects = [];

    RandomFactory.getCategories()
        .then(function(cats) {
            $scope.apiCategories = cats[0];
            $scope.datasetCategories = cats[1];

        })
    $scope.changeFocus = function(obj) {
        console.log("obj" + obj)
        $scope.focusedCard = obj;
    }

    $scope.randomize = function(category1, category2, category3) {
        RandomFactory.randomize(category1, category2, category3)
            .then(function(resultArr) {
                var finalArr = [];
                console.log('resultArr' + resultArr)
                    // the find skip limit in backend returns arrays
                    // can take out the http stuff once i get the actual sites, right now its a mix
                resultArr.forEach(function(obj) {
                    obj = obj[0];
                    if (obj.link.indexOf('http://') > -1) obj.link = obj.link.slice(7, -1)
                    if (obj.link.indexOf('https://') > -1) obj.link = obj.link.slice(8, -1)
                    finalArr.push(obj);
                })
                $scope.resultObjects = finalArr;
                console.log(JSON.stringify($scope.resultObjects));
            })

    }

    $scope.addToFavorites = function(itemId) {
        console.log("in addToFavorites" + itemId)

    }

    $scope.addToSelected = function(item) {
        console.log("in addToSelected" + item)
        if (item.class === 'Api') {
            console.log('in api')
            if ($scope.selectedApis.indexOf(item) > -1) return;
            $scope.selectedApis.push(item);
        } else if (item.class === 'Dataset') {
            console.log('in dataset')
            if ($scope.selectedDatasets.indexOf(item) > -1) return;
            $scope.selectedDatasets.push(item);
        }
        console.log($scope.selectedApis)
    }
});
