/// <reference path="../assert/assert.class.ts"/>

class MonthPickerController{
	public yearIndex:number;
	public monthIndex:number;
	public defaultDate:{month:number, year:number, day:number};
	public dayIndex:number;

	public onSelect:any;
	public onBlur:any;
	
	public default:string;

	public availableYears:number[];
	public monthNames:string[] = [
		'January','February','March',
		'April','May','June','July',
		'August','September','October','November','December'
	];

	public updateDateFromDefault(){
		if (this.default) {
		    if (this.default.indexOf('-') > 0) {
		        let values = this.default.split('-');
		        if (values.length == 3) {
		            this.yearIndex = parseInt(values[0]) || 0;
		            this.monthIndex = parseInt(values[1]) - 1 || 0;
		            this.dayIndex = 1;
		        } else{
		        	return;
		        }
		    }
		    else if (this.default.indexOf('/') > 0) {
		        let values = this.default.split('/');
		        if (values.length == 3) {
		            this.monthIndex = parseInt(values[0]) || 0;
		            this.dayIndex = 1;
		            this.yearIndex = parseInt(values[2]) || 0;
		        } else{
		        	return;
		        }
		    }
		} else{
			let tempDate = new Date();
			this.monthIndex = tempDate.getMonth();
			this.yearIndex = tempDate.getFullYear();
			this.dayIndex = 1;
			this.updateMonth();
		}
	}
	public $onChanges(){
		this.updateDateFromDefault();
	}
	public $onInit(){
		this.updateDateFromDefault();
		this.getYears();
		$('.dropdown-menu.keepopen').on('click',(e)=>e.stopPropagation());
	}
	public updateMonth(){
		if(this.monthIndex > 11){
			this.monthIndex = 0;
			this.yearIndex = this.yearIndex + 1;
		} else if(this.monthIndex < 0){
			this.monthIndex = 11;
			this.yearIndex = this.yearIndex - 1;
		}

	}
	private toString(year:number, month:number, day:number, formatType?:number){
		if(year < 2000) return '';

		let formattedMonth = ('0' + month).slice(-2);
		let formattedDay = ('0' + day).slice(-2);

		if(formatType == 0 || !formatType){
			return `${year}-${formattedMonth}-${formattedDay}`;
		} else{
			return `${formattedMonth}/${formattedDay}/${year}`;
		}
	}
	public getYears():void{
		this.availableYears = [];
		let date:Date = new Date();

		for(let i = date.getFullYear() - 10; i < date.getFullYear() + 10; i++){
			this.availableYears.push(i);
		}
	}
	public onInputBlur(){
		assert.isDefined(this.onBlur)
		this.onSelect({date:{dateString: this.default}})
	}
	public selectDate():void{
		let dateString = this.toString(this.yearIndex, this.monthIndex + 1, 1);
		this.default = dateString;

		this.onSelect({
			date:{
				dateString: this.default,
				year: this.yearIndex,
				month: this.monthIndex + 1
			}
		});
	}
}