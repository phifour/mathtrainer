import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'form-validation',
  template : `
  <div class="jumbotron">
    <h3>Tell us a littlebit about your background</h3>
    <form [formGroup]="complexForm" (ngSubmit)="submitForm(complexForm.value)">
      <div class="form-group" [ngClass]="{'has-error':!complexForm.controls['firstName'].valid && complexForm.controls['firstName'].touched}">
        <label>First Name:</label>
        <input class="form-control" type="text" placeholder="John" [formControl]="complexForm.controls['firstName']">
        <div *ngIf="complexForm.controls['firstName'].hasError('required') && complexForm.controls['firstName'].touched" class="alert alert-danger">You must include a first name.</div>
      </div>
      <div class="form-group" [ngClass]="{'has-error':!complexForm.controls['lastName'].valid && complexForm.controls['lastName'].touched}">
        <label>Last Name</label>
        <input class="form-control" type="text" placeholder="Doe" [formControl]="complexForm.controls['lastName']">
        <div *ngIf="complexForm.controls['lastName'].hasError('required') && complexForm.controls['lastName'].touched" class="alert alert-danger">You must include a last name.</div>
        <div *ngIf="complexForm.controls['lastName'].hasError('minlength') && complexForm.controls['lastName'].touched" class="alert alert-danger">Your last name must be at least 5 characters long.</div>
        <div *ngIf="complexForm.controls['lastName'].hasError('maxlength') && complexForm.controls['lastName'].touched" class="alert alert-danger">Your last name cannot exceed 10 characters.</div>
      </div>
      <div class="form-group">
        <label>Degree</label>
        <div class="alert alert-danger" *ngIf="!complexForm.controls['degree'].valid && complexForm.controls['degree'].touched">You must select a degree.</div>
      </div>
      <div class="radio">
        <label>
          <input type="radio" name="degree" value="highschool" [formControl]="complexForm.controls['degree']">
          High school
        </label>
      </div>
      <div class="radio">
        <label>
          <input type="radio" name="degree" value="university" [formControl]="complexForm.controls['degree']">
          University
        </label>
      </div>
      <div class="form-group">
        <label>Activities</label>
      </div>

      <div class="form-group">
        <label for="comment">Your Feedback:</label>
        <textarea class="form-control" rows="5" [formControl]="complexForm.controls['feedback']"></textarea>
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-primary" [disabled]="!complexForm.valid">Submit</button>
      </div>
    </form>
  </div>
  `
})
export class FormValidationComponent {
  complexForm : FormGroup;

  constructor(fb: FormBuilder) {
    this.complexForm = fb.group({
      'firstName' : [null, Validators.required],
      'lastName': [null,  Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      'degree' : [null, Validators.required],
      'feedback' : [null, Validators.required]
    });
    console.log(this.complexForm);
    this.complexForm.valueChanges.subscribe( (form: any) => {
      console.log('form changed to2:', form);
    }
    );
  }

  submitForm(value: any) {
    console.log(value);
  }
}