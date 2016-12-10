import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { EquationComponent } from "./equation.component";
import { MathAssignment } from "../models/mathassignment";

@Component({
    selector: 'app-assignment',
    template: `
    <div *ngIf="mode==0" class="container">
            <h4>Problemset {{pos}} :{{mathassignment['problem']}} </h4>
            <ul class="list-group">
            <li class="list-group-item"><input type="checkbox" [(ngModel)]="mathassignment.ua1">{{mathassignment['sol1']}}</li>
            <li class="list-group-item"><input type="checkbox" [(ngModel)]="mathassignment.ua2">{{mathassignment['sol2']}} </li>
            <li class="list-group-item"><input type="checkbox" [(ngModel)]="mathassignment.ua3">{{mathassignment['sol3']}}</li>
            <li class="list-group-item"><input type="checkbox" [(ngModel)]="mathassignment.ua4">{{mathassignment['sol4']}}</li>
            </ul>
    </div>

    <div *ngIf="mode==1" class="container">
            <h4>Problemset {{pos}} :{{mathassignment['problem']}} </h4>
            <ul class="list-group">
            <li *ngIf="mathassignment['a1']==true" class="list-group-item list-group-item-success">{{mathassignment['sol1']}}</li>
            <li *ngIf="mathassignment['a1']==false||undefined" class="list-group-item list-group-item-danger">{{mathassignment['sol1']}}</li>
            <li *ngIf="mathassignment['a2']==true" class="list-group-item list-group-item-success">{{mathassignment['sol2']}}</li>
            <li *ngIf="mathassignment['a2']==false||undefined" class="list-group-item list-group-item-danger">{{mathassignment['sol2']}}</li>
            <li *ngIf="mathassignment['a3']==true" class="list-group-item list-group-item-success">{{mathassignment['sol3']}}</li>
            <li *ngIf="mathassignment['a3']==false||undefined" class="list-group-item list-group-item-danger">{{mathassignment['sol3']}}</li>
            <li *ngIf="mathassignment['a4']==true" class="list-group-item list-group-item-success">{{mathassignment['sol4']}}</li>
            <li *ngIf="mathassignment['a4']==false||undefined" class="list-group-item list-group-item-danger">{{mathassignment['sol4']}}</li>
            </ul>
    </div>

  `
})

export class MathassignmentComponent {

    view_ready:boolean;

    // resultElement: ElementJax;
    // @ViewChild('result') result: ElementRef;

    constructor() {
        this.view_ready = false;
    }

    @Input() mathassignment: MathAssignment;
    @Input() mode: number;
    @Input() pos: number;

    // answer:Answer;

    setcolor(input) {
        console.log('input',input);
        if (input) {
            return "list-group-item list-group-item-success";
        } else {
            return "list-group-item list-group-item-danger";
        }
    }

    continue() {
        MathJax.Hub.Typeset();
    }

    ngOnInit() {
      setTimeout(() => {
          console.log('finished loading');
          MathJax.Hub.Typeset();
            // run jQuery stuff here
        }, 0);
    }


}
