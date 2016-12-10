import {Routes, RouterModule} from "@angular/router";
import {TaskListComponent} from "./todo/components/task-list.component";
import {AboutComponent} from "./about/components/about.component";
import {ModuleWithProviders} from "@angular/core";
import {ListofassignmentsComponent} from "./todo/components/listofassignments.component";
import {HighScoreComponent} from "./todo/components/highscore.component";
import {MathtestComponent} from "./todo/components/mathtest.component";
import {AddassignmentComponent} from "./todo/components/addassignment.component";
import {SurveyComponent} from "./todo/components/survey.component";


const appRoutes: Routes = [
    {path: '', redirectTo: 'listofassignments', pathMatch: 'full'},
    {path: 'tasks', component: TaskListComponent, data: {title: 'TaskList'}},
    {path: 'listofassignments', component: ListofassignmentsComponent, data: {title: 'List of Assignments'}},
    {path: 'about', component: HighScoreComponent, data: {title: 'Top Scores'}},
    {path: 'add', component: AddassignmentComponent, data: {title: 'Add Assignment'}},
    {path: 'survey', component: SurveyComponent, data: {title: 'Survey'}},
    {path: 'assignment/:id', component: MathtestComponent, data: {title: 'Your Assignment'}}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
