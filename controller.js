myApp.controller('mainController', function($scope, storage) {
    $scope.split = function() {
        var originalParagraphs = $scope.paragraphs.map(function(_) {return _.original;});
        var translatedParagraphs = $scope.paragraphs.map(function(_) {return _.translated;});

        var nextParagraphs = [];
        for (var i = 0; i < originalParagraphs.length; i++) {
            if (originalParagraphs[i].indexOf('\n\n') !== -1) {
                var split = originalParagraphs[i].split('\n\n');
                nextParagraphs.push({
                    original: split[0],
                    translated: translatedParagraphs[i]
                });
                for (var j = 1; j < split.length; j++) {
                    nextParagraphs.push({
                        original: split[j],
                        translated: ''
                    });
                }
            } else {
                nextParagraphs.push({
                    original: originalParagraphs[i],
                    translated: translatedParagraphs[i]
                });
            }
        }

        $scope.paragraphs = nextParagraphs;

        $scope.isLocked = Array.from(Array($scope.paragraphs.length)).map(function() {return false;});
        $scope.isTurned = Array.from(Array($scope.paragraphs.length)).map(function() {return false;});
    };
    $scope.join = function() {
        var originalParagraphs = $scope.paragraphs.map(function(_) {return _.original;});
        var translatedParagraphs = $scope.paragraphs.map(function(_) {return _.translated;});

        $scope.joinedOriginal = originalParagraphs.join('\n\n');
        $scope.joinedTranslated = translatedParagraphs.join('\n\n');

        $scope.isLocked = [false];
        $scope.isTurned = [false];
    };
    $scope.lock = function(id) {
        angular.element(document.getElementById('original' + id)).attr('readonly', true);
        $scope.isLocked[id] = true;
    };
    $scope.unlock = function(id) {
        angular.element(document.getElementById('original' + id)).attr('readonly', false);
        $scope.isLocked[id] = false;
    };
    $scope.turn = function(id) {
        $scope.isTurned[id] = !$scope.isTurned[id];
    };
    $scope.lockAll = function() {
        for (var i = 0; i < $scope.isLocked.length; i++) {
            $scope.lock(i);
        }
    };
    $scope.clear = function() {
        if (confirm('Do you really want to clear all textarea?')) {
            $scope.isLocked = [false];
            $scope.isTurned = [false];
            $scope.paragraphs = [{original: '', translated: ''}];
        }
    }
    $scope.joinedOriginal = '';
    $scope.joinedTranslated = '';
    storage.bind($scope, 'isLocked', {defaultValue: [false]});
    storage.bind($scope, 'isTurned', {defaultValue: [false]});
    storage.bind($scope, 'paragraphs', {defaultValue: [{original: '', translated: ''}]});
});
