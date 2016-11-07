import { DateRangePickerComponent, ClickOutsideDirective} from './daterangepicker.component'
import { Moment , utc, localeData } from 'moment';

import { TestBed, async, ComponentFixture }      from '@angular/core/testing';


describe('AppComponent with TCB', function () {

  let fixture : ComponentFixture<DateRangePickerComponent>;
 

  beforeEach(async(() => {
                TestBed.configureTestingModule({declarations: [ DateRangePickerComponent]})
                .compileComponents().then( () => {
                fixture = TestBed.createComponent(DateRangePickerComponent);    
            });
        }));

  it('should instantiate component', () => {   
    expect(fixture.componentInstance instanceof DateRangePickerComponent)
    .toBe(true, 'should create DateRangePickerComponent');
  });


});