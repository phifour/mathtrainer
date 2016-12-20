import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {EquationComponent} from "./equation.component";
import {MathAssignment} from "../models/mathassignment";
import {MathService} from '../services/math.service';
import { AgmCoreModule } from 'angular2-google-maps/core';

@Component({
  selector: 'app-assignmentlist',
  template: `
  <div class="container">


<div class="form-group row">
  <label for="example-text-input" class="col-xs-2 col-form-label">Name of Event</label>
  <div class="col-xs-10">
  <input class="form-control" type="text" name="myDecimal" [(ngModel)]="name" placeholder="Rechte Wienzeile 39/24" />
  </div>
</div>

<div class="form-group row">
  <label for="optiontype" class="col-xs-2 col-form-label">Option Type</label>
    <div class="col-xs-10">
    <select aria-label="Search by type" class="form-control" [(ngModel)]="type" id="optiontype">
                <option>European Call</option>
                <option>European Put</option>
    </select>
    </div>
</div>

<div class="form-group row">
  <label for="example-text-input" class="col-xs-2 col-form-label">Address of Event</label>
  <div class="col-xs-10">
  <input class="form-control" type="text" name="myDecimal" [(ngModel)]="address" placeholder="Rechte Wienzeile 39/24" />
  </div>
</div>


 <div class="form-group row">
   <label for="example-date-input" class="col-xs-2 col-form-label">Date</label>
   <div class="col-xs-10">
     <input class="form-control" type="date" value="2011-08-19" id="example-date-input">
   </div>
 </div>




    <table class="table table-hover">
        <thead>
        <tr>
        <th>Name</th>
        <th>Coordinates</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let y of data;let i = index;">
        <td>  {{y.name}} </td>
        <td> {{y.lat}}, {{y.lng}}  </td>
        <td> <button type="button" (click)="deleteevent(y.key)" class="btn btn-primary">Delte Event</button></td>
        </tr>
        </tbody>
    </table>


  <button type="button" (click)="submitevent()" class="btn btn-primary">Submit Event</button>

  <sebm-google-map [latitude]="lat" [longitude]="lng">
    <div *ngFor="let x of data; let i = index;">
      <sebm-google-map-marker [latitude]="x.lat" [longitude]="x.lng" [label]="x.name"></sebm-google-map-marker>
    </div>
  </sebm-google-map>

  </div>
  `,
    styles:[
      `h1 { color: green;}`,`h2 { color: red;background-color: lightblue;}`,`.sebm-google-map-container {height: 800px;width : 800px;}`
      ]
})

export class ListofassignmentsComponent {

 constructor(private router: Router, private mathservice: MathService) {
  this.data = [];
  }
// 

  id:number;
  data:any;
  lat: number = 51.678418;
  lng: number = 7.809007;
  name:string;
  type:string;
  address:string;
  label:string = "Hallo Welt";

  @Input() mathassignment: MathAssignment;
  // answer:Answer;

  ngOnInit() {
    // this.answer = new Answer();
    this.id = 42;
    this.getfirebase('https://flickering-inferno-6917.firebaseio.com/histevents.json');
    // this.getcoordinates('Rechte WIenzeile 39/34');

  }

  getfirebase(url: string) {
        this.mathservice.getfirebasedata(url)
            .subscribe(data => { console.log('DATA', data); 
          
                for (var property in data) {
                    // var obj = data[property];
                    if (data.hasOwnProperty(property)) {
                    //console.log(property);
                    this.data.push({key:property
                      ,name:data[property].name
                      ,lat:data[property].lat,
                       lng:data[property].lng
                    });
                    // console.log('sdd',data[property]);
                    // this.highscores.push[]
                    }
                }        
      console.log(this.data);
});
}

  deleteevent(key:string) {
        this.mathservice.deletevent(key)
         .subscribe(data => { console.log('DELETE', data);});
  }
    uploadassignment(event:any) {
            this.mathservice.uploadevent(event)
            .subscribe(data => { console.log('DATA', data); });
    }



  getcoordinates(loc: string) {
        this.mathservice.getcoordinates(loc)
            .subscribe(data => { console.log('LOC', data); 
          
            console.log('lat',data.results[0].geometry.location.lat);
            console.log('lng',data.results[0].geometry.location.lng);

                // for (var property in data) {
                //     // var obj = data[property];
                //     if (data.hasOwnProperty(property)) {
                //     console.log(property);
                //     this.data.push({key:property
                //       ,name:data[property].name
                //       ,difficulty:data[property].difficulty
                //       ,creator:data[property].creator      
                //     });
                //     // console.log('sdd',data[property]);
                //     // this.highscores.push[]
                //     }
                // }        
      console.log(this.data);
});}

  submitevent() {
        this.mathservice.getcoordinates(this.address)
            .subscribe(data => { console.log('LOC', data); 
            console.log('lat',data.results[0].geometry.location.lat);
            console.log('lng',data.results[0].geometry.location.lng);
            var tmpevnt = {name:this.name, type: this.type, address: this.address, lat:data.results[0].geometry.location.lat, lng:data.results[0].geometry.location.lng};
            this.uploadassignment(tmpevnt);
  });

}



}