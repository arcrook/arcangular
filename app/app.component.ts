import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    
    
<div class=container>       
    <h1>My First Angular App</h1>

<div class="row">
    <form class="form-horizontal">
  <div class="form-group">
    <label for="exampleInputEmail1" class="col-sm-2 control-label">Email address</label>
     <div class="col-sm-10">
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
    </div>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1" class="col-sm-2 control-label">Password</label>
     <div class="col-sm-10">
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
    </div>
  </div>
    <div class="form-group">
    <label for="exampleInputDatePick" class="col-sm-2 control-label">DatePicker</label>
     <div class="col-sm-5">

    <daterangepicker></daterangepicker>
    </div>
  </div>
 
  <button type="submit" class="btn btn-default">Submit</button>
</form>
</div>
</div>
    
    
        `
})
export class AppComponent { 
    collection: string[] = [];

    constructor() {
            for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
        }
    }

}
