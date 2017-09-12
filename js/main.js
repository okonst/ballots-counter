

var appCount = angular.module('appCount', []);
 
appCount.controller('countCtrl', function ($scope, $http, $location) {
	$scope.candidates = [];
	$scope.ballots = [];
	$scope.current = {
		"id": 1,
		"ballot":{},
		"totalTicks": 0
	};
	$scope.tmp = {};

	$scope.addBallot = function(){
		// проверка что есть хоть 1 кандидат
		if($scope.candidates.every(function(candidate){
			return candidate.selected == false;
		})){
			alert("Не выбрано ни одного кандидата.");
			return;
		}
		if($scope.candidates.filter(function(candidate){
			return candidate.selected == true;
		}).length > 5){
			alert("Выбрано более 5 кандидатов.");
			return;
		}

		//Создаем новую запись
		$scope.tmp.one = {"id": $scope.current.id, "votes": [], "added": new Date};
		$scope.candidates.forEach(function(candidate){
			if (candidate.selected) {
				$scope.tmp.one.votes.push({"id": candidate.id, "name": candidate.name});
				//candidate.count++;
				candidate.selected = false;
			}
		});
		$scope.ballots.push($scope.tmp.one);
		//$scope.current.ballot = $scope.tmp.one;
		$scope.current.id++;
		$scope.tmp = {};
		$scope.countAll();
		$scope.saveData();
	};

	//удалить бюллетень
	$scope.deleteBallot = function(ballot_id){
		var index = $scope.ballots.findIndex(function(ballot){return ballot.id == ballot_id});
		console.log('Delete: ', index);
		$scope.ballots.splice(index, 1);
		$scope.countAll();
		$scope.saveData();
	};

	// редактировать бюллетень
	$scope.editBallot = function(ballot_id){
		$scope.current.edit = true;
		$scope.current.edit_id = ballot_id;
		var ballot = $scope.ballots.find(function(bal){
			return bal.id == ballot_id;
		});
		ballot.votes.forEach(function(vote){
			$scope.candidates.find(function(candidate){return candidate.id == vote.id}).selected = true;			
		});

	};

	// сохранить бюллетень после редактирования
	$scope.updateBallot = function(){
		// проверка что есть хоть 1 кандидат
		if($scope.candidates.every(function(candidate){
			return candidate.selected == false;
		})){
			alert("Не выбрано ни одного кандидата.");
			return;
		}
		if($scope.candidates.filter(function(candidate){
			return candidate.selected == true;
		}).length > 5){
			alert("Выбрано более 5 кандидатов.");
			return;
		}

		var ballot = $scope.ballots.find(function(bal){
			return bal.id == $scope.current.edit_id;
		});
		ballot.votes = [];
		ballot.editted = new Date;
		$scope.candidates.forEach(function(candidate){
			if (candidate.selected) {
				ballot.votes.push({"id": candidate.id, "name": candidate.name});
				//candidate.count++;
				candidate.selected = false;
			}
		});
		$scope.cancelUpdate();
		$scope.countAll();
		$scope.saveData();

	};
	// отменить редактирование
	$scope.cancelUpdate = function(){
		// анселект всем
		$scope.candidates.forEach(function(candidate){
			candidate.selected = false;
		});
		$scope.current.edit = false;
		$scope.current.edit_id = null;
	};

	// посчитать голоса
	$scope.countAll = function(){
		$scope.candidates.forEach(function(candidate){
			candidate.count = 0;
		});
		$scope.ballots.forEach(function(ballot){
			//console.log("ballot: " + ballot.id);
			ballot.votes.forEach(function(vote){
				//console.log("vote: ", vote);
				$scope.tmp.cand = $scope.candidates.find(function(candidate){
					//console.log(' candidate: ' + candidate.id +' vote: ' + vote.id);
					return candidate.id == vote.id;
				});
				$scope.tmp.cand.count++;
			});
		});
		$scope.current.totalTicks = 0;
		$scope.ballots.forEach(function(ballot){
			$scope.current.totalTicks += ballot.votes.length;
		});
	}
	// Сохранить в файл
	$scope.saveData = function(){
		$http.post('api.php', {"action": "save", "candidates": $scope.candidates, "ballots": $scope.ballots}).success(function(data) {
			console.log("Response: ", data);
		});
	};

	// Очистить файл
	$scope.clearData = function(){
		$http.post('api.php', {"action": "clear"}).success(function(data) {
			console.log("Response: ", data);
		});
	};

	// Загрузить из файла
	$scope.loadData = function(){
		$scope.candidates = [];
		$http.get('js/candidates.js' + '?t=' + Date.now()).success(function(data) {
			console.log("Response: ", data);
			data.forEach(function(item){
				$scope.candidates.push(item);
			});

		});
		$scope.ballots = [];
		$http.get('js/ballots.js' + '?t=' + Date.now()).success(function(data) {
			console.log("Response: ", data);
			data.forEach(function(item){
				$scope.ballots.push(item);
			});
			console.log('Ballots length:  ', $scope.ballots.length);
			$scope.current.id = $scope.ballots[$scope.ballots.length - 1].id + 1;
			$scope.countAll();
		});
		
		

	};

	// Рестарт с очисткой файлов
	$scope.restartAll = function(){
		console.log('restart all');
		$scope.clearData();
		$scope.restart();
	};

	// Рестарт (без очистки файлов)
	$scope.restart = function(){
		console.log('restart');
		$scope.candidates = [];
		$scope.ballots = [];
		$scope.current = {
			"id": 1,
			"ballot":{},
			"totalTicks": 0
		};
		$scope.tmp = {};
		data.forEach(function(item){
			$scope.candidates.push(angular.copy(item));
		});
		/*$http.get('js/data.json').success(function(data) {
			data.forEach(function(item){
				$scope.candidates.push(item);
			});
		});	*/
	};
	$scope.restart();
});