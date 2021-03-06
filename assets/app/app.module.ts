import {NgModule}                   from '@angular/core';
import {BrowserModule}              from '@angular/platform-browser';
import {FormsModule}                from '@angular/forms';
import {ReactiveFormsModule}        from '@angular/forms';
import {RouterModule}               from "@angular/router";
import {HttpModule}                 from "@angular/http";
import {routing}                    from "./app.routes"

import {AppComponent}               from './app.component';
import {MessageComponent}           from "./messages/message.component";
import {MessageListComponent}       from "./messages/message-list.component";
import {MessageInputComponent}      from "./messages/message-input.component";
import {MessagesComponent}          from "./messages/messages.component";
import {HeaderComponent}            from "./header.component";
import {AuthenticationComponent}    from "./auth/authentication.component";
import {SigninComponent}            from "./auth/signin.component";
import {SignupComponent}            from "./auth/signup.component";
import {LogoutComponent}            from "./auth/logout.component";
import {ErrorComponent}             from "./errors/error.component";

import {MessageService}             from "./messages/message.service";
import {AuthService}                from "./auth/auth.service";
import {ErrorService}               from "./errors/error.service";
import {HashLocationStrategy}       from "@angular/common";
import {LocationStrategy}           from "@angular/common";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
        HeaderComponent,
        AuthenticationComponent,
        SigninComponent,
        SignupComponent,
        LogoutComponent,
        ErrorComponent
    ],
    bootstrap: [ AppComponent ],
    providers:     [
        MessageService,
        AuthService,
        ErrorService,
        [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
    ]
})
export class AppModule { }
