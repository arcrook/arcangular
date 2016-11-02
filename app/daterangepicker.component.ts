import { Component, OnInit } from '@angular/core';
import { Moment , utc, localeData } from 'moment';

@Component({
    moduleId: module.id,
    selector: 'daterangepicker',
    templateUrl: 'daterangepicker.component.html',
    styleUrls: ['daterangepicker.component.css']
})
export class DateRangePickerComponent implements OnInit {
    
    startDate : Moment;
    endDate : Moment;

    leftCalanderRefDate : Moment;
    rightCalanderRefDate : Moment;


    leftCalander : CalanderWeek[];
    rightCalander : CalanderWeek[];

    secondDateSelected : boolean = true;
    
    
    private visible:boolean = false;

    constructor() { 

    }

    ngOnInit() { 
        this.startDate = utc('2016-01-15');
        this.endDate = utc('2016-02-15');

        this.leftCalanderRefDate = utc(this.startDate);
        this.rightCalanderRefDate = utc(this.leftCalanderRefDate).add(1, 'month');

        this.leftCalander = this.createCalendar(this.leftCalanderRefDate);
        this.rightCalander = this.createCalendar(this.rightCalanderRefDate);
    }

    onFocusIn() {
        if (this.visible) {
            return;
        }
        this.visible = true;
    }

    onFocusOut() {
        if (!this.visible) {
            return;
        }
        this.visible = false;
    }

    createCalendar(referanceDate : Moment) : CalanderWeek[] {
            
            var month = referanceDate.month();
            var year = referanceDate.year();
            var daysInMonth = referanceDate.daysInMonth();
            var firstDay = referanceDate.clone().startOf('month');
            var lastDay = referanceDate.clone().endOf('month');
            var lastMonth = referanceDate.clone().subtract(1, 'month').month();
            var lastYear = referanceDate.clone().subtract(1, 'month').year();
            var daysInLastMonth = referanceDate.clone().subtract(1, 'month').daysInMonth();
            var dayOfWeek = firstDay.day();   

            //Sunday first Day of week
            var startDay = daysInLastMonth - dayOfWeek + 1;    

            //initialize a 6 rows x 7 columns array for the calendar
            let calendarMonth : CalanderWeek[] = new Array<CalanderWeek>();

            for (var i = 0; i < 6; i++) {
                calendarMonth[i] = new CalanderWeek();
            }

            //populate the calendar with date objects
            //Sunday first Day of week
            var startDay = daysInLastMonth - dayOfWeek + 1;    
            if (startDay > daysInLastMonth){
                    startDay -= 7;
            }

            if (dayOfWeek == 0)
            {
                   startDay = daysInLastMonth - 6;
            }

            var curDate = utc([lastYear, lastMonth, startDay, 12, 0, 0]); 

            var col : number, row : number;
            for (var i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = curDate.add(24, 'hour')) {
                if (i > 0 && col % 7 === 0) {
                    col = 0;
                    row++;
                }
                calendarMonth[row].weekDates.push(new CalanderDay(curDate.clone(), month));
            }

            return calendarMonth;   
    }

    onChangeDisplayMonth(month : number){
        this.leftCalander = this.createCalendar(this.leftCalanderRefDate.add(month, 'month'));
        this.rightCalander = this.createCalendar(this.rightCalanderRefDate.add(month, 'month'));
    }

    isInRange(calanderDayDate : Moment) : boolean {
            
            if(calanderDayDate.isSame(this.startDate, 'day'))
            {
                return true;
            }

            if(calanderDayDate.isSame(this.endDate, 'day'))
            {
                return true;
            }
            
            
            return calanderDayDate.isBetween(this.startDate, this.endDate, 'day');
             
    }

    isStartDate(calanderDayDate : Moment) : boolean {
        return calanderDayDate.isSame(this.startDate, 'day');
    }

    isEndDate(calanderDayDate : Moment) : boolean {
        return calanderDayDate.isSame(this.endDate, 'day');
    }

    onCalanderDateSelect(calanderDay : CalanderDay) {
            if(this.secondDateSelected){
                this.startDate = calanderDay.date;
                this.endDate = calanderDay.date;
                this.secondDateSelected = false;
            }
            else {
                if(calanderDay.date.isBefore(this.startDate, 'day')){
                    this.startDate = calanderDay.date;
                } else {
                     this.endDate = calanderDay.date;
                }
                
                this.secondDateSelected = true;
            }
    }
}

export class CalanderWeek{
    weekDates : CalanderDay[]

    constructor(){
        this.weekDates = new Array<CalanderDay>();
    }
}

export class CalanderDay{
    date : Moment;
    month : number

    constructor(date : Moment,
                month : number){
        this.date = date;
        this.month = month;
    }

    public getDateString() : string {
        return this.date.format('D');
    }

    public isOff() : boolean {
        return !(this.date.month() === this.month)
    }

    public isAvailable() : boolean {
        // enhance if need to restrict selection?
        return true;
    }
}

