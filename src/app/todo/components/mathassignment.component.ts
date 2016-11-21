import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {EquationComponent} from "./equation.component";
@Component({
  selector: 'app-assignment',
  template: `
  

  `
})
export class MathassignmentComponent {

  constructor() { }

  @Input() inputValue: string;
  @Input() seq: number;


  ngOnInit() {
  }

}
