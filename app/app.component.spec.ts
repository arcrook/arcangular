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

