import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { MathService } from '../services/math.service';

@Component({
    template: `
        <div class="container">
            <h2>Highscores</h2>
            <table class="table table-hover">
            <thead>
                <tr>
                <th>Name</th>
                <th>Score</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let x of highscores; let i = index; trackBy:trackByIndex">
                <td> {{x.score}} </td>
                <td>{{x.username}}</td>
                </tr>
            </tbody>
            </table>
        </div>
    `
})
export class HighScoreComponent implements OnInit {

    highscores: any[];

    constructor(private mathservice: MathService) {
        this.highscores = [];
    }

    getfirebase(url: string) {
        this.mathservice.getfirebasedata(url)
            .subscribe(data => {
                // console.log('DATA', data);
                for (var property in data) {
                    // var obj = data[property];
                    if (data.hasOwnProperty(property)) {
                    this.highscores.push(data[property]);
                    // console.log('sdd',data[property]);
                    // this.highscores.push[]
                    }
                }
                console.log('highscores',this.highscores);
                // this.highscores = data;
            });
    }

    ngOnInit() {
        this.getfirebase('https://flickering-inferno-6917.firebaseio.com/highscore.json');
    }
}