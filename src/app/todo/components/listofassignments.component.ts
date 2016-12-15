import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {EquationComponent} from "./equation.component";
import {MathAssignment} from "../models/mathassignment";
import {MathService} from '../services/math.service';

@Component({
  selector: 'app-assignmentlist',
  template: `
  <div class="container">
    <h2>Math Assigments</h2>         
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Difficulty</th>
          <th>Creator</th>
        </tr>
      </thead>
      <tbody>
      
        <tr *ngFor="let x of data; let i = index; trackBy:trackByIndex">
          <td><a [routerLink]="['/assignment', x['key']]">{{x['name']}}</a></td>
          <td>{{x['difficulty']}}</td>
          <td>{{x['creator']}}</td>
        </tr>

      </tbody>
    </table>
  </div>
  `
})

export class ListofassignmentsComponent {


 constructor(private router: Router, private mathservice: MathService) {
   this.data = [];
  }

 id:number;
 data:any;

  @Input() mathassignment: MathAssignment;
  // answer:Answer;

  ngOnInit() {
    // this.answer = new Answer();
    this.id = 42;
    this.getfirebase('https://flickering-inferno-6917.firebaseio.com/assignment.json');
  }

  getfirebase(url: string) {
        this.mathservice.getfirebasedata(url)
            .subscribe(data => { console.log('DATA', data); 
          
                for (var property in data) {
                    // var obj = data[property];
                    if (data.hasOwnProperty(property)) {
                    console.log(property);
                    this.data.push({key:property
                      ,name:data[property].name
                      ,difficulty:data[property].difficulty
                      ,creator:data[property].creator      
                    });
                    // console.log('sdd',data[property]);
                    // this.highscores.push[]
                    }
                }        
      console.log(this.data);
});





  }





}
