import { Component, Input, DoCheck, OnChanges, OnInit } from "@angular/core";
import { MathassignmentComponent } from "./mathassignment.component";
import { MathAssignment } from "../models/mathassignment";
import { MathService } from '../services/math.service';
import { ActivatedRoute, Router } from '@angular/router';
import {FormValidationComponent} from "./formvalidation.component";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AssignmentComponent} from "./newassignment.component";

@Component({
    selector: 'app-addassignment',
    template: `
    <div class="container">
    <h3>Create your own assignment</h3>

    <form [formGroup]="complexForm" (ngSubmit)="submitForm(complexForm.value)">
      <div class="form-group" [ngClass]="{'has-error':!complexForm.controls['name'].valid && complexForm.controls['name'].touched}">
        <label>Name of assignment:</label>
        <input class="form-control" type="text" placeholder="Basic Algebra" [formControl]="complexForm.controls['name']">
        <div *ngIf="complexForm.controls['name'].hasError('required') && complexForm.controls['name'].touched" class="alert alert-danger">You must include a assignment name.</div>
      </div>


    <div class="form-group" [ngClass]="{'has-error':!complexForm.controls['creator'].valid && complexForm.controls['creator'].touched}">
        <label>Your Name:</label>
        <input class="form-control" type="text" placeholder="Prof. X" [formControl]="complexForm.controls['creator']">
        <div *ngIf="complexForm.controls['creator'].hasError('required') && complexForm.controls['creator'].touched" class="alert alert-danger">You must include your name.</div>
        <div *ngIf="complexForm.controls['creator'].hasError('minlength') && complexForm.controls['creator'].touched" class="alert alert-danger">Your name must be at least 5 characters long.</div>
        <div *ngIf="complexForm.controls['creator'].hasError('maxlength') && complexForm.controls['creator'].touched" class="alert alert-danger">Your name cannot exceed 10 characters.</div>
    </div>

      <div class="form-group">
        <label>Difficulty</label>
        <div class="alert alert-danger" *ngIf="!complexForm.controls['difficulty'].valid && complexForm.controls['difficulty'].touched">You must select a difficulty.</div>
      </div>
      <div class="radio">
        <label>
          <input type="radio" name="difficulty" value="Easy" [formControl]="complexForm.controls['difficulty']">
          Easy
        </label>
      </div>
      <div class="radio">
        <label>
          <input type="radio" name="difficulty" value="Hard" [formControl]="complexForm.controls['difficulty']">
          Hard
        </label>
      </div>
    </form>

    <new-assignment [(mathassignment)]="mathassignment"></new-assignment>

    <div class="form-group">
        <button type="button" class="btn btn-primary btn-block" (click)="submittest()">Add problemset</button>
    </div>
    
    <div *ngFor="let x of mathassignments; let i = index; trackBy:trackByIndex">
            <div class="well">
            <app-assignment [(mathassignment)]="mathassignments[i]" [pos]="i" [mode]="1"></app-assignment>
            <button type="button" (click)="removeassignment(mathassignments[i])" class="btn btn-primary btn-block">Remove problemset</button>
            </div>
    </div>


    <div *ngIf="mathassignments.length<1" class="alert alert-danger">You need to add at least one problemset.</div>


    <div class="form-group">
        <button type="submit" class="btn btn-primary btn-block" [disabled]="check(complexForm.valid,mathassignments.length)">Submit</button>
    </div>

    <button type="button" (click)="uploadassignment()" class="btn btn-primary btn-block">Upload to Mathtrainer</button>

    </div>

    `
})
export class AddassignmentComponent implements DoCheck, OnChanges, OnInit {
    @Input() test: string;
    name: string;
    problemsetscore: number[];
    mathassignments: MathAssignment[];
    mathassignment: MathAssignment;
    id:string;
    testcomplete:boolean;
    myscore:number[];
    totalscore:number;
    difficulty:string;
    creator:string;
    complexForm : FormGroup;
    valid:boolean; 

    constructor(private route: ActivatedRoute, private router: Router, private mathservice: MathService, private fb: FormBuilder) {
    this.valid = false;
    
    this.complexForm = fb.group({
      'name' : [null, Validators.required],
      'creator': [null,  Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      'difficulty' : [null, Validators.required]
    });

    this.complexForm.valueChanges.subscribe( (form: any) => {
      console.log('form changed to2:', form);
      this.name = form.name;
      this.difficulty = form.difficulty;
      this.creator = form.creator;
      console.log('complexForm.valid',this.complexForm.valid);

      if (this.complexForm.valid === true && this.mathassignments.length > 1) {
          this.valid = true;
      } else {
          this.valid = false;
      }

      console.log('parameters', this.valid, this.mathassignments.length);

    });



    }

    check(b:boolean, n:number) {
        if (b===true && n>0) {
            return false;
        } else {
            return true;
        }
    }


    loadTest() {
        console.log('Loading Test');
    }


	// ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
	// 	console.log('Change detected:', changes[person].currentValue);
	// }

    removeassignment(element:MathAssignment) {
        var index = this.mathassignments.indexOf(element, 0);
        if (index > -1) {
        this.mathassignments.splice(index, 1);
        }
    }

    ngOnInit() {
        this.myscore = [];
        this.problemsetscore = [];
        this.totalscore = 0;
        this.testcomplete = false;
        this.mathassignment = new MathAssignment('assignment1', 15, '$a^2+b^2=c^2$', 'possible answer 1', 'possible answer 2', 'possible answer 3', 'possible answer 4', true, false, false, false);
        this.route.params
        .map(params => params['id'])
        .subscribe((id) => {
           this.id = id;
        });

        this.mathassignments = [];
    }

  ngOnChanges() {
    console.log('OnChanges called !?!?!?');
    //throw new Error('ngOnChanges called; should not be when ngDoCheck is defined!');
  }

  ngDoCheck() {
        console.log('ngDoCheck');
  }



    submittest() {
        console.log('This Assignment', this.mathassignments);
        console.log('ma',this.mathassignment);
        var copy = this.deepCopy(this.mathassignment);
        copy.points = Number(copy.points); // 1234
        this.mathassignments.push(copy);
        MathJax.Hub.Typeset();
    }

    public deepCopy(oldObj: any) {
        var newObj = oldObj;
        if (oldObj && typeof oldObj === "object") {
            newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
            for (var i in oldObj) {
                 if (oldObj.hasOwnProperty(i)) {
                    newObj[i] = this.deepCopy(oldObj[i]);
                  }
            }
        }
        return newObj;
    }

    uploadassignment() {
            this.mathservice.uploadassignment(
                {name: this.name,
                creator: this.creator,
                difficulty: this.difficulty,
                mathassignment:this.mathassignments
                })
            .subscribe(data => { console.log('DATA', data); });
            this.router.navigate(['/listofassignments']);
    }

}
