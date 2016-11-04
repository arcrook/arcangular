import { Component, OnInit, ViewChild, ElementRef, HostListener, Directive, Output, EventEmitter } from '@angular/core';

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

    leftDateInput : string;
    rightDateInput : string;

    leftCalanderRefDate : Moment;
    rightCalanderRefDate : Moment;

    leftCalander : CalanderWeek[];
    rightCalander : CalanderWeek[];



    secondDateSelected : boolean = true;
    
    private visible:boolean = false;

    @ViewChild('inputBox') private inputBoxElement: ElementRef;
    @ViewChild('daterangepicker') private daterangepickerElement: ElementRef;

    mouseOutSidePicker : boolean

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

    //Click behavior : click on input show. Click again hide.
    //               : click within piker. Remain focus on input.
    //               : mouse move outside picker, click hide picker.   
    private onEvent(event: MouseEvent): void { 

        if(event.type === "mouseleave"){
            this.mouseOutSidePicker = true;
        }

        if(event.type === "mouseenter"){
            this.mouseOutSidePicker = false;
        }
        //keep focus on the inputBox as the user is clicking within picker
        if(!this.mouseOutSidePicker){
           
        }
    }

    private close(event : MouseEvent) : void {
         if(!this.visible)
         {
                   return;
         }

         if(this.mouseOutSidePicker){
             this.visible = false;        
         }
    }

    private onClickInput(event: MouseEvent): void {
          this.visible = this.visible ? false : true;
          this.mouseOutSidePicker = false;
    }
    
    private onCalanderDateSelect(calanderDay : CalanderDay, leftCalander : boolean) {

            let monthAdjust : number
            if(calanderDay.date.isBefore(this.leftCalanderRefDate.clone().startOf('month'))) {
                monthAdjust = -1;
            };

            if(calanderDay.date.isAfter(this.rightCalanderRefDate.clone().startOf('month')) 
               && calanderDay.date.isBefore(this.rightCalanderRefDate.clone().endOf('month'))) {
                monthAdjust = 0;
            }

            if(calanderDay.date.isAfter(this.rightCalanderRefDate.clone().endOf('month'))) {
                monthAdjust = 2;
            }
                        
            if(monthAdjust !== 0) {
                this.onChangeDisplayMonth(monthAdjust);
            }
            
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

    onChangeDisplayMonth(month : number){
        this.leftCalander = this.createCalendar(this.leftCalanderRefDate.add(month, 'month'));
        this.rightCalander = this.createCalendar(this.rightCalanderRefDate.add(month, 'month'));
    }

    onDateInputFoucusOut(left : Boolean) : void {

        var parseDateString = left ? this.leftDateInput : this.rightDateInput;
        console.log(parseDateString);
        console.log(navigator.language);
        navigator.geolocation.getCurrentPosition(x => console.log(x.coords));

        var day = utc(parseDateString);
        day
        if(day.isValid()) {
    
        }

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
}


@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {
    constructor(private _elementRef: ElementRef) {
    }

    @Output()
    public clickOutside = new EventEmitter<MouseEvent>();

    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {
        if (!targetElement) {
            return;
        }

        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(event);
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

