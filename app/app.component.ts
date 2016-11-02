import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `<h1>My First Angular App</h1>



    <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
    <div class="form-group">
    <label for="exampleInputDatePick">Password</label>
    <daterangepicker></daterangepicker>
  </div>
  <div class="form-group">
    <label for="exampleInputFile">File input</label>
    <input type="file" id="exampleInputFile">
    <p class="help-block">Example block-level help text here.</p>
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox"> Check me out
    </label>
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>

    
    
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
