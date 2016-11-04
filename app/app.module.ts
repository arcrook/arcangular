import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DateRangePickerComponent, ClickOutsideDirective} from './daterangepicker.component'
import { AppComponent }  from './app.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent , DateRangePickerComponent, ClickOutsideDirective ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
