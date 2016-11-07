import { DateRangePickerComponent, ClickOutsideDirective} from './daterangepicker.component'
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
  });

  it('should daterange display set range  inputs set', () => {
     fixture = new DateRangePickerComponent();
    fixture.startDate = start;
    fixture.endDate = end;

    fixture.ngOnChanges();  
    expect(fixture.startDate.unix()).toBe(start.unix());
    expect(fixture.endDate.unix()).toBe(end.unix());

    expect(fixture.leftDateDisplay).toBe(start.format("DD-MMM-YYYY"));
    expect(fixture.rightDateDisplay).toBe(end.format("DD-MMM-YYYY"));
  });
});