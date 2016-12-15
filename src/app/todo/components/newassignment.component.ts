import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { EquationComponent } from "./equation.component";
import { MathAssignment } from "../models/mathassignment";

@Component({
    selector: 'new-assignment',
    template: `
      <div class="container">
        <div class="panel panel-default">
        <div class="panel-body">
        Problemset (LaTeX):             
        <span class="input-group-addon beautiful">
            <input type="text" class="form-control" [(ngModel)]="mathassignment.problem">
        </span>
        <label for="frmtype">Points</label>
            <select aria-label="Search by type" class="form-control" [(ngModel)]="mathassignment.points" id="frmtype">
                <option>15</option>
                <option>30</option>
                <option>60</option>
            </select>
        </div>

            <ul class="list-group">
            <li class="list-group-item">
            <span class="input-group-addon beautiful">
                Correct <input type="checkbox" [(ngModel)]="mathassignment.a1">
            </span>
            <span class="input-group-addon beautiful">
                <input type="text" class="form-control" [(ngModel)]="mathassignment.sol1">
            </span>     
            </li>
            <li class="list-group-item">
            <span class="input-group-addon beautiful">
                Correct <input type="checkbox" [(ngModel)]="mathassignment.a2">
            </span>
            <span class="input-group-addon beautiful">
                <input type="text" class="form-control" [(ngModel)]="mathassignment.sol2">
            </span>     
            </li>
            <li class="list-group-item">
            <span class="input-group-addon beautiful">
                Correct <input type="checkbox" [(ngModel)]="mathassignment.a3">
            </span>
            <span class="input-group-addon beautiful">
                <input type="text" class="form-control" [(ngModel)]="mathassignment.sol3">
            </span>     
            </li>
            <li class="list-group-item">
            <span class="input-group-addon beautiful">
                Correct <input type="checkbox" [(ngModel)]="mathassignment.a4">
            </span>
            <span class="input-group-addon beautiful">
                <input type="text" class="form-control" [(ngModel)]="mathassignment.sol4">
            </span>     
            </li>
            </ul>

        </div>
  `
})

export class AssignmentComponent {

    @Input() mathassignment: MathAssignment;

    ngOnInit() {
        // this.answer = new Answer();
    }


}
