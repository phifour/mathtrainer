import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-equation',
  template: `{{inputValue}}
  `
})
export class EquationComponent {
  resultElement: ElementJax;

  @ViewChild('result') result: ElementRef;

  constructor() { }

  @Input() inputValue: string;
  @Input() seq: number;


  ngOnInit() {
    // console.log('seq',this.seq,this.inputValue);
    // if (this.seq==1){
    //   var seq = 1;
    // }else{
    //   var seq = 2
    // },

    MathJax.Hub.Typeset();

    // var seq = this.seq;


    // var self = this;
    // MathJax.Hub.Queue(
    //   ["Typeset", MathJax.Hub, "result"],
    //   function () {
    //   self.resultElement = MathJax.Hub.getAllJax("result")[seq];
    //     self.updateResult();
    //   }
    // );

  }

  updateResult() {
    console.log('update');
    //if (MathJax.Hub.getAllJax("result")[this.seq] != null) {
      MathJax.Hub.Queue(["Text", this.resultElement, this.inputValue]);
    //}

  }

}
