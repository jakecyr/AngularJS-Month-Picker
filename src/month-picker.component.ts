///<reference path="month-picker.controller.ts"/>

let MonthPickerComponent = {
	bindings:{
		onSelect: '&',
		onBlur: '&',
		default: '<'
	},
	controller: MonthPickerController,
	template: `
		<style>
			#datePickerContainer{
				padding: 5px;
			}
		</style>

		<div id="datePickerContainer">
			<input value="{{$ctrl.monthNames[$ctrl.monthIndex] + ' ' + $ctrl.yearIndex}}" class="form-control dropdown-toggle" data-toggle="dropdown" readonly>
			
			<div class="dropdown-menu keepopen" style="padding:5px;">
				<div class="row">
					<div class="col-lg-1">
						<a ng-click="$ctrl.monthIndex=$ctrl.monthIndex-1;$ctrl.updateMonth()" style="cursor:pointer"><i class="fa fa-arrow-left"></i></a>
					</div>
					<div class="col-lg-5">
						<select ng-change="$ctrl.updateMonth();$ctrl.selectDate()" ng-model="$ctrl.monthIndex">
							<option ng-repeat="month in $ctrl.monthNames" ng-value="{{::$index}}">{{::month}}</option>
						</select>
					</div>
					<div class="col-lg-4">
						<select ng-change="$ctrl.updateMonth();$ctrl.selectDate()" ng-model="$ctrl.yearIndex">
							<option ng-repeat="year in $ctrl.availableYears" ng-value="{{::year}}">{{::year}}</option>	
						</select>
					</div>
					<div class="col-lg-1">
						<a ng-click="$ctrl.monthIndex=$ctrl.monthIndex+1;$ctrl.updateMonth()" style="cursor:pointer"><i class="fa fa-arrow-right"></i></a>
					</div>
				</div>
			</div>
		</div>
	`
};