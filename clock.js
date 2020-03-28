var app = angular.module('app', []);

app.controller("AppController", function($scope, $interval){
	$scope.breakTime = 5;
	$scope.sessionTime = 25;
	var start = false;
	$scope.ses_brk = "Session";

	$scope.display = $scope.sessionTime;
	var time = $scope.sessionTime * 60;
	var totalTime = $scope.sessionTime * 60;
	$scope.mycolor = "#7FFF00";
	$scope.myheight = "0%";
	var interval;
	$scope.myfont_size = 7 + "em";

	$scope.updateBreak = function(val){
		if (start == false){
			$scope.breakTime += val;
			if ($scope.breakTime>60){
				$scope.breakTime = 60;
			}
			if ($scope.breakTime<1){
				$scope.breakTime = 1;
			}
			if ($scope.ses_brk == "Break"){
				$scope.display = $scope.breakTime;
				time = $scope.breakTime * 60;
				totalTime = $scope.breakTime * 60;
			}
		}
	};

	$scope.updateSession = function(val){
		if (start == false){
			$scope.sessionTime += val;
			if ($scope.sessionTime<1){
				$scope.sessionTime = 1;
			}
			if ($scope.ses_brk == "Session"){
				$scope.display = $scope.sessionTime;
				time = $scope.sessionTime * 60;
				totalTime = $scope.sessionTime * 60;
			}
		}
	};

	$scope.reset = function(){
		if (start == false){
			$scope.breakTime = 5;
			$scope.sessionTime = 25;
			$scope.display = $scope.sessionTime;
			time = $scope.sessionTime * 60;
			totalTime = $scope.sessionTime * 60;
			$scope.mycolor = "#7FFF00";
			$scope.myheight = "0%";
			$scope.ses_brk = "Session";
		}
	};

	function timer(time){
		var hour = Math.floor(time/3600)<10?"0"+Math.floor(time/3600):Math.floor(time/3600);
		var min = Math.floor(time/60)<10?"0"+Math.floor(time/60):Math.floor(time/60);
		var sec = time%60 <10?"0"+time%60:time%60;
		console.log(hour+":"+min+":"+sec);
		var temp = "";
		if (hour <= 0){
			temp = min + ":" + sec;
			$scope.myfont_size = 7 + "em";
		} else {
			temp = hour + ":" + min + ":" + sec;
			$scope.myfont_size = 5 + "em";
		}
		return temp;
	}

	

	$scope.toggle = function(){
		start = !start;
		
		if (start == true){
			interval = $interval(function(){
				if (time <= 0){
					if ($scope.ses_brk == "Session"){
						$scope.ses_brk = "Break";
						time = $scope.breakTime * 60;
						totalTime = $scope.breakTime * 60;
						$scope.mycolor = "#B22222";
					} else {
						$scope.ses_brk = "Session";
						time = $scope.sessionTime * 60;
						totalTime = $scope.sessionTime * 60;
						$scope.mycolor = "#7FFF00";
					}
			}		
				$scope.display = timer(time);
				var percentage = Math.abs(time/totalTime*100-100);
				$scope.myheight = percentage + "%";
				time--;	
			}, 1000);
		} else {
			$interval.cancel(interval);
		}
	}

	
	

});