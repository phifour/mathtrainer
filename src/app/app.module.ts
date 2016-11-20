import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from "./app.component";
import {TaskListComponent} from "./todo/components/task-list.component";
import {AboutComponent} from "./about/components/about.component";
import {TaskComponent} from "./todo/components/task.component";
import {EquationComponent} from "./todo/components/equation.component";
import {MathService} from "./todo/services/math.service";

import { HttpModule } from '@angular/http';

import {routing, appRoutingProviders} from './app.routing';
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        TaskComponent,
        TaskListComponent,
        TaskComponent,
        EquationComponent,
        AboutComponent
    ],
    providers: [
        appRoutingProviders,
        MathService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}