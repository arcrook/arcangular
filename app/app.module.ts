import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DateRangePickerComponent} from './daterangepicker.component'
import { AppComponent }  from './app.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent , DateRangePickerComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
