import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { MathassignmentComponent } from "./mathassignment.component";
import { MathAssignment } from "../models/mathassignment";
import { MathService } from '../services/math.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationComponent } from "./formvalidation.component";

@Component({
    selector: 'app-mathtest',
    template: `
    <div *ngIf="!testcomplete" class="container">
        <div class="center">
            <h2>{{nameofassignment}}</h2>
        </div>
    <div *ngFor="let x of mathassignments; let i = index; trackBy:trackByIndex">
        <div class="well">
            <app-assignment [(mathassignment)]="mathassignments[i]" [pos]="i" [mode]="0"></app-assignment>
        </div>
    </div>
    
    <button type="button" (click)="submittest()" class="btn btn-primary btn-block">Submit assignment</button>

    </div>

    <div *ngIf="testcomplete" class="container">
    <h1>Your total Score: {{totalscore}}</h1>
    <table class="table table-hover">
        <thead>
        <tr>
        <th>Problemset</th>
        <th>Score</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let y of problemsetscore;let i = index;">
        <td> problemset {{i}} </td>
        <td> {{y}} </td>
        </tr>
        </tbody>
    </table>

    <h2>Your Feedback helps us to improve the quality of Mathtrainer</h2>
    <button type="button" (click)="survey()" class="btn btn-primary btn-block">Continue to survey</button>
    <button type="button" (click)="continue()" class="btn btn-primary btn-block">Continue without survey</button>
    </div>

    `
})
export class MathtestComponent {
    @Input() test: string;
    mathassignments: MathAssignment[];
    nameofassignment: string;
    problemsetscore: number[];
    id: string;
    testcomplete: boolean;
    myscore: number[];
    totalscore: number;
    ii: number;

    constructor(private route: ActivatedRoute, private router: Router, private mathservice: MathService) {
        this.ii = 0;
    }

    loadTest() {
        console.log('Loading Test');
    }

    wa(input: number) {
        return input;
    }

    ngOnInit() {
        this.myscore = [];
        this.totalscore = 0;
        this.problemsetscore = [];
        this.testcomplete = false;
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.id = id;
            });

        this.getfirebase('https://flickering-inferno-6917.firebaseio.com/assignment/' + this.id + '.json');
        this.mathassignments = [];
        // new MathAssignment('assignment1', 15, '$a+b$=', 'a', 'b', 'c', 'd', true, false, false, false),
        // new MathAssignment('assignment2', 25, '$a^2+b^2=$', 'a', 'b', 'c', 'this is the end', true, false, false, false)
    }

    getfirebase(url: string) {
        this.mathservice.getfirebasedata(url)
            .subscribe(data => {
                console.log('XSXSD',data);
                var assignment = data['mathassignment']; 
                this.nameofassignment = data['name']; 
                assignment.forEach((x, index) => {
                    console.log('item', x); // 9, 2, 5
                    console.log(index); // 0, 1, 2
                    this.mathassignments.push(new MathAssignment("name", 15, x['problem'], x['sol1'], x['sol2'], x['sol3'], x['sol4'], x['a1'], x['a2'], x['a3'], x['a4']));
                });
                console.log('THIS Math Assignment', this.mathassignments);
            });
    }

    submittest() {

        var myscore = 0;
        var scores = [];
        this.mathassignments.forEach(function (arrayElem) {
            myscore = myscore + arrayElem.getscore();
            scores.push(arrayElem.getscore());
            // console.log('Your score2', arrayElem.getscore());
         });
        this.totalscore = myscore;
        this.testcomplete = true;
        this.problemsetscore = scores;

        //this.router.navigate(['/listofassignments']);

    }

    continue() {
        //var x = { username: this.username, score: myscore };
        //this.mathservice.sendData(x)
        //    .subscribe(data => { console.log('DATA', data); });
        this.router.navigate(['/listofassignments']);
    }

survey() {
    this.router.navigate(['/survey']);
}

}


