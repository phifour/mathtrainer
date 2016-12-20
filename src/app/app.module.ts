import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import {TaskListComponent} from "./todo/components/task-list.component";
import {AboutComponent} from "./about/components/about.component";
import {TaskComponent} from "./todo/components/task.component";
import {EquationComponent} from "./todo/components/equation.component";
import {MathassignmentComponent} from "./todo/components/mathassignment.component";
import {ListofassignmentsComponent} from "./todo/components/listofassignments.component";
import {AssignmentComponent} from "./todo/components/newassignment.component";
import {MathtestComponent} from "./todo/components/mathtest.component";
import {HighScoreComponent} from "./todo/components/highscore.component";
import {FormValidationComponent} from "./todo/components/formvalidation.component";
import {MathService} from "./todo/services/math.service";
import {HttpModule} from '@angular/http';
import {routing, appRoutingProviders} from './app.routing';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddassignmentComponent} from "./todo/components/addassignment.component";
import {SurveyComponent} from "./todo/components/survey.component";
import { AgmCoreModule } from 'angular2-google-maps/core';
// import { AngularFireModule } from 'angularfire2';



// Must export the config
// export const firebaseConfig = {
//   apiKey: 'AIzaSyAjHkePzrBpZVIA6EkBgMmExjmTDFacfz4',
//   authDomain: 'flickering-inferno-6917',
//   databaseURL: 'https://flickering-inferno-6917.firebaseio.com/',
//   storageBucket: ''
// };




@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDzYFOCzw9rhp161yZx2xjbX5Du3wJtH4I'
        })
        // AngularFireModule.initializeApp(firebaseConfig)

    ],
    declarations: [
        AppComponent,
        TaskComponent,
        TaskListComponent,
        TaskComponent,
        EquationComponent,
        MathassignmentComponent,
        MathtestComponent,
        AssignmentComponent,
        FormValidationComponent,
        ListofassignmentsComponent,
        HighScoreComponent,
        AddassignmentComponent,
        AboutComponent,
        SurveyComponent
    ],
    providers: [
        appRoutingProviders,
        MathService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}