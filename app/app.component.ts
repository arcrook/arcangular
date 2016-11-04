import { Component } from '@angular/core';

import { Moment , utc, localeData } from 'moment';

@Component({
    selector: 'my-app',
    template: `
    
    
<div class=container>       
    <h1>My First Angular App</h1>

<div class="row">
    <form class="form-horizontal">
    <div class="form-group">
    <label for="exampleInputDatePick" class="col-sm-2 control-label">DatePicker</label>
     <div class="col-sm-5">

    <daterangepicker></daterangepicker>
    </div>
  </div>
 
  <button class="btn btn-default">Submit</button>
</form>
</div>

  <div class="row">
    <a class="btn btn-default" (click)="onDateParsing()">Date</a>

    <pre>{{collection | json}}</pre>
  </div>

</div>
    
    
        `
})
export class AppComponent { 
    collection: string[] = [];

    constructor() {
          
      
    }


    onDateParsing(){
        this.format("01/01/2016");
        this.format("01 01 2016");
        this.format("01/01/16");
        this.format("01 01 16");
        this.format("01 Jan 16");
        this.format("01 Jan 2016");
        this.format("01-Jan-2016");
        this.format("01-Jan-2016");
        this.format("01-Jan-2016");
        this.format("2016-01-01");
        this.format("2016 01 01");
        this.format("2016.01.01");
        this.format("01.01.2016");
        this.format("01.01.16");


        this.format("13/04/2016");
        this.format("13 04 2016");
        this.format("13/04/16");
        this.format("13 04 16");
        this.format("13 Apr 16");
        this.format("13 Apr 2016");
        this.format("13-Apr-2016");
        this.format("13-Apr-2016");
        this.format("13-Apr-2016");
        this.format("2016-04-13");
        this.format("2016 04 13");
        this.format("2016.04.13");
        this.format("13.04.2016");
        this.format("13.04.16");


        this.format("01-JANY-2016");
        this.format("Wibble");
    }

    format(format: string) : void {
        let d = Date.parse(format);
        var md = utc(d);
        this.collection.push(format  + " : " + d + " : " + md.format('DD-MMM-YYYY')  + " : " + md.toISOString());
    }

}
