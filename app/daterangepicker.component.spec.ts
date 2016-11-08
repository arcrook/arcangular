import { DateRangePickerComponent, ClickOutsideDirective, CalanderDay} from './daterangepicker.component'
import { Moment , utc, localeData } from 'moment';

import { TestBed, async, ComponentFixture }      from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';


describe('DateRangePickerComponent with Angular', function () {

  let fixture : ComponentFixture<DateRangePickerComponent>; 

  beforeEach(async(() => {
                TestBed.configureTestingModule({declarations: [ DateRangePickerComponent]})
                .compileComponents().then( () => {
                fixture = TestBed.createComponent(DateRangePickerComponent);
                fixture.autoDetectChanges(); 
            });
        }));

  it('should instantiate component', () => {   
    expect(fixture.componentInstance instanceof DateRangePickerComponent)
    .toBe(true, 'should create DateRangePickerComponent');
  });
});

describe('DateRangePickerComponent Unit Tests', function () {

  let fixture : DateRangePickerComponent;
  let start = utc('15/01/2016', 'DD/MM/YYYY');
  let end = utc('15/02/2016', 'DD/MM/YYYY'); 

  beforeEach(async(() => {
                fixture = new DateRangePickerComponent();
                fixture.startDate = start;
                fixture.endDate = end;
        }));


  it('should daterange display now if no inputs set', () => {
        //reset fixture
        fixture = new DateRangePickerComponent();
        fixture.ngOnChanges();  
        let now = utc().startOf('day');
        expect(fixture.startDate.unix()).toBe(now.unix());
        expect(fixture.endDate.unix()).toBe(now.unix());

        expect(fixture.leftDateDisplay).toBe(now.format("DD-MMM-YYYY"));
        expect(fixture.rightDateDisplay).toBe(now.format("DD-MMM-YYYY"));

        expect(fixture.leftCalanderRefDate.unix()).toBe(now.unix());
        expect(fixture.rightCalanderRefDate.unix()).toBe(now.add(1, 'month').unix());

        //test left calender
        expect(fixture.leftCalander.length).toBe(6);    
        for (let i= 0; i < fixture.leftCalander.length; i++){
            expect(fixture.leftCalander[i].weekDates.length).toBe(7);
            expect(fixture.leftCalander[i].weekDates[0].date.isoWeekday()).toBe(7);
            expect(fixture.leftCalander[i].weekDates[6].date.isoWeekday()).toBe(6);
        }

        //test right calender
        expect(fixture.rightCalander.length).toBe(6);    
        for (let i= 0; i < fixture.rightCalander.length; i++){
            expect(fixture.rightCalander[i].weekDates.length).toBe(7);
            expect(fixture.rightCalander[i].weekDates[0].date.isoWeekday()).toBe(7);
            expect(fixture.rightCalander[i].weekDates[6].date.isoWeekday()).toBe(6);
        }
  });

  it('should daterange display set range  inputs set', () => {
      fixture.ngOnChanges();  
      expect(fixture.startDate.unix()).toBe(start.unix());
      expect(fixture.endDate.unix()).toBe(end.unix());

      expect(fixture.leftDateDisplay).toBe(start.format("DD-MMM-YYYY"));
      expect(fixture.rightDateDisplay).toBe(end.format("DD-MMM-YYYY"));

      expect(fixture.leftCalanderRefDate.unix()).toBe(start.unix());
      expect(fixture.rightCalanderRefDate.unix()).toBe(start.add(1, 'month').unix());
      
      //test left calender
      expect(fixture.leftCalander.length).toBe(6);    
      for (let i= 0; i < fixture.leftCalander.length; i++){
          expect(fixture.leftCalander[i].weekDates.length).toBe(7);
          expect(fixture.leftCalander[i].weekDates[0].date.isoWeekday()).toBe(7);
          expect(fixture.leftCalander[i].weekDates[6].date.isoWeekday()).toBe(6);
      }
      expect(fixture.leftCalander[0].weekDates[0].date.unix).toBe(utc("27/12/2015", "DD-MMM-YYYY").unix);

      //test right calender
      expect(fixture.rightCalander.length).toBe(6);    
      for (let i= 0; i < fixture.rightCalander.length; i++){
            expect(fixture.rightCalander[i].weekDates.length).toBe(7);
            expect(fixture.rightCalander[i].weekDates[0].date.isoWeekday()).toBe(7);
            expect(fixture.rightCalander[i].weekDates[6].date.isoWeekday()).toBe(6);
      }    
  });

    it('onEvent should set mouseOutSidePicker to true on mouseleave MouseEvent', () => {
          let mouseEvent : MouseEvent = new MouseEvent("mouseleave");
          expect(fixture.mouseOutSidePicker).toBe(false);
          fixture.onEvent(mouseEvent);
          expect(fixture.mouseOutSidePicker).toBe(true);
    });
    
    it('onEvent should set mouseOutSidePicker to true on mouseenter MouseEvent', () => {
          let mouseEvent : MouseEvent = new MouseEvent("mouseenter");
           expect(fixture.mouseOutSidePicker).toBe(false);
          fixture.onEvent(mouseEvent);
          expect(fixture.mouseOutSidePicker).toBe(false);
    });


    it('close should set visible to false on fire if visible set to true', () => {
          let mouseEvent : MouseEvent = new MouseEvent("");
          fixture.visible = true;
          fixture.close(mouseEvent);
          expect(fixture.visible).toBe(true);
    });

    it('close should not change state of visible on fire if visible set to false', () => {          
          fixture.visible = false;
          fixture.close(null);
          expect(fixture.visible).toBe(false);
    });

    it('onClickInput should change state of visible on fire, mouseOutSidePicker always false', () => {
          //inital state
          expect(fixture.mouseOutSidePicker).toBe(false);
          expect(fixture.visible).toBe(false);

          //onClickInput first fire state
          fixture.onClickInput(null);
          expect(fixture.mouseOutSidePicker).toBe(false);
          expect(fixture.visible).toBe(true);

          //onClickInput second fire state
          fixture.onClickInput(null);
          expect(fixture.mouseOutSidePicker).toBe(false);
          expect(fixture.visible).toBe(false);
    });

    it('onCalanderDateSelect fire on leftCalander, calanderDay isBefore leftCalanderRefDate month, expect select and shift calenders back one month', () => {
          fixture.ngOnChanges();
          let dateSelected : Moment = utc("27/12/2015", "DD-MMM-YYYY");
          let calanderDay : CalanderDay = new CalanderDay(utc(dateSelected), 1);

          fixture.onCalanderDateSelect(calanderDay, true);
                    
          expect(fixture.startDate.unix).toBe(dateSelected.unix);
          expect(fixture.endDate.unix).toBe(dateSelected.unix);

          expect(fixture.leftCalander[0].weekDates[0].date.unix).toBe(utc("29/11/2015", "DD-MMM-YYYY").unix);
          expect(fixture.rightCalander[0].weekDates[0].date.unix).toBe(utc("27/12/2015", "DD-MMM-YYYY").unix);
    });
});




describe('DateRangePickerComponent getMomentFromDateString Unit Tests', function () {
  let fixture = new DateRangePickerComponent();

  it('should return 01/01/2016 datestring as date', () => {
    expect(fixture.getMomentFromDateString('01/01/2016').unix()).toBe(utc('01/01/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 01-01-2016 datestring as date', () => {
    expect(fixture.getMomentFromDateString('01-01-2016').unix()).toBe(utc('01/01/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 01.01.2016 datestring as date', () => {
    expect(fixture.getMomentFromDateString('01.01.2016').unix()).toBe(utc('01/01/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 01 01 2016 datestring as date', () => {
    expect(fixture.getMomentFromDateString('01 01 2016').unix()).toBe(utc('01/01/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 01 JAN 2016 datestring as date', () => {
    expect(fixture.getMomentFromDateString('01 JAN 2016').unix()).toBe(utc('01/01/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 01-JAN-2016 datestring as date', () => {
    expect(fixture.getMomentFromDateString('01-JAN-2016').unix()).toBe(utc('01/01/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 01.JAN.2016 datestring as date', () => {
    expect(fixture.getMomentFromDateString('01.JAN.2016').unix()).toBe(utc('01/01/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 01/JAN/2016 datestring as date', () => {
    expect(fixture.getMomentFromDateString('01/JAN/2016').unix()).toBe(utc('01/01/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 20/09/2016 datestring as date', () => {
    expect(fixture.getMomentFromDateString('20/09/2016').unix()).toBe(utc('20/09/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 20-09-2016 datestring as date', () => {
    expect(fixture.getMomentFromDateString('20-09-2016').unix()).toBe(utc('20/09/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 20.09.2016 datestring as date', () => {
    expect(fixture.getMomentFromDateString('20.09.2016').unix()).toBe(utc('20/09/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 20 09 2016 datestring as date', () => {
    expect(fixture.getMomentFromDateString('20 09 2016').unix()).toBe(utc('20/09/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 20-SEP-2016 datestring as date', () => {
    expect(fixture.getMomentFromDateString('20-SEP-2016').unix()).toBe(utc('20/09/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 20-SEP-16 datestring as date', () => {
    expect(fixture.getMomentFromDateString('20-SEP-16').unix()).toBe(utc('20/09/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 01-01-16 datestring as date', () => {
    expect(fixture.getMomentFromDateString('01-01-16').unix()).toBe(utc('01/01/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 01-wib-16 datestring invalid date', () => {
    expect(fixture.getMomentFromDateString('01-wib-16').format("DD-MMM-YYYY")).toBe("Invalid date");
  });

  it('should return undefined datestring invalid date', () => {
    expect(fixture.getMomentFromDateString(null).format("DD-MMM-YYYY")).toBe("Invalid date");
  });

  it('should return blank datestring invalid date', () => {
    expect(fixture.getMomentFromDateString('').format("DD-MMM-YYYY")).toBe("Invalid date");
  });
});