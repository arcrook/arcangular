/* tslint:disable:no-unused-variable */
import { AppComponent } from './app.component';
import { DateRangePickerComponent, ClickOutsideDirective} from './daterangepicker.component'
import { Moment , utc, localeData } from 'moment';

import { TestBed, async, ComponentFixture }      from '@angular/core/testing';

import { By }           from '@angular/platform-browser';

////////  SPECS  /////////////

/// Delete this
describe('Smoke test', () => {
  it('should run a passing test', () => {
    expect(true).toEqual(true, 'should pass');
  });
});

describe('AppComponent with TCB', function () {

  let fixture : ComponentFixture<AppComponent>;
 

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [AppComponent,  DateRangePickerComponent]})
    .compileComponents().then( () => {
    fixture = TestBed.createComponent(AppComponent);
    
  });
  }));


  it('should instantiate component', () => {
   
    expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
  });

  it('should have expected <h1> text', () => {
    
    fixture.detectChanges();

    let h1 = fixture.debugElement.query(el => el.name === 'h1').nativeElement;  // it works

        h1 = fixture.debugElement.query(By.css('h1')).nativeElement;            // preferred

    expect(h1.innerText).toMatch(/angular app/i, '<h1> should say something about "Angular App"');
  });
});


describe('Test AppComponent stateless functions', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  let component = new AppComponent();
  it('should return 01/01/2016 datestring as date', () => {
    expect(component.getMomentFromDateString('01/01/2016').unix()).toBe(utc('01/01/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 01-01-2016 datestring as date', () => {
    expect(component.getMomentFromDateString('01-01-2016').unix()).toBe(utc('01/01/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 01.01.2016 datestring as date', () => {
    expect(component.getMomentFromDateString('01.01.2016').unix()).toBe(utc('01/01/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 01 01 2016 datestring as date', () => {
    expect(component.getMomentFromDateString('01 01 2016').unix()).toBe(utc('01/01/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 01 JAN 2016 datestring as date', () => {
    expect(component.getMomentFromDateString('01 JAN 2016').unix()).toBe(utc('01/01/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 01-JAN-2016 datestring as date', () => {
    expect(component.getMomentFromDateString('01-JAN-2016').unix()).toBe(utc('01/01/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 01.JAN.2016 datestring as date', () => {
    expect(component.getMomentFromDateString('01.JAN.2016').unix()).toBe(utc('01/01/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 01/JAN/2016 datestring as date', () => {
    expect(component.getMomentFromDateString('01/JAN/2016').unix()).toBe(utc('01/01/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 20/09/2016 datestring as date', () => {
    expect(component.getMomentFromDateString('20/09/2016').unix()).toBe(utc('20/09/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 20-09-2016 datestring as date', () => {
    expect(component.getMomentFromDateString('20-09-2016').unix()).toBe(utc('20/09/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 20.09.2016 datestring as date', () => {
    expect(component.getMomentFromDateString('20.09.2016').unix()).toBe(utc('20/09/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 20 09 2016 datestring as date', () => {
    expect(component.getMomentFromDateString('20 09 2016').unix()).toBe(utc('20/09/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 20-SEP-2016 datestring as date', () => {
    expect(component.getMomentFromDateString('20-SEP-2016').unix()).toBe(utc('20/09/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 20-SEP-16 datestring as date', () => {
    expect(component.getMomentFromDateString('20-SEP-16').unix()).toBe(utc('20/09/2016', 'DD/MM/YYYY').unix());
  });

  it('should return 01-01-16 datestring as date', () => {
    expect(component.getMomentFromDateString('01-01-16').unix()).toBe(utc('01/01/2016', 'DD/MM/YYYY').unix());
  });
});
