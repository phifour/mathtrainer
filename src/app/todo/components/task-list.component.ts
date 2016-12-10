import {Component} from "@angular/core";
import {Task} from "../models/task";
import {OnInit} from "@angular/core";
import {TaskService} from "../services/task-service";
import {TaskComponent} from "./task.component";
import {EquationComponent} from "./equation.component";
import {MathService} from '../services/math.service';
import {MathassignmentComponent} from './mathassignment.component';
import {MathtestComponent} from './mathtest.component';


@Component({
    selector: 'task-list',
    templateUrl: './app/todo/components/task-list.html',
    styleUrls: ['./app/todo/components/task-list.css'],
    providers: [TaskService]
})
export class TaskListComponent implements OnInit {

    todoCount:number;
    selectedTask:Task;
    tasks:Array<Task>;
    eqn:string[];
    data:any[];
    hello:string;

    constructor(private _taskService:TaskService, private mathservice: MathService) {
        this.tasks = _taskService.getTasks();
        this.calculateTodoCount();
        this.eqn = ["E=mc^2", "\\Delta \\phi = -4 \\pi \\rho", "-\\Delta"];
        this.data = [];
        this.hello = "This is a \\beta - problem";
        this.getfirebase();
    }

    ngOnInit() {
        console.log("Todo XXXX initialized with " + this.tasks.length + " tasks.",this.data);
    }

    calculateTodoCount() {
        this.todoCount = this.tasks.filter(t => !t.done).length;
    }

    select(task:Task) {
        this.selectedTask = task;
    }

   getfirebase() {
      this.mathservice.getfirebasedata("https://flickering-inferno-6917.firebaseio.com/assignments.json")
      .subscribe(data => {

        for (var property in data) {
            if (data.hasOwnProperty(property)) {
              this.data.push(data[property].problems[0].eqn);
            }
        }
        console.log('data', this.data);
        });
   }
}
