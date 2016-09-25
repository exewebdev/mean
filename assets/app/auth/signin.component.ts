import { Component, OnInit } from "@angular/core";
import {FormBuilder, Validators, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "./user";
import {AuthService} from "./auth.service";
import {ErrorService} from "../errors/error.service";

@Component({
    selector: 'my-signin',
    template: `
        <section class="col-md-8 col-md-offset-2">
            <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
                <div class="form-group">
                    <label for="email">Mail</label>
                    <input [formControl]="myForm.controls['email']" type="email" id="email" class="form-control">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input [formControl]="myForm.controls['password']" type="password" id="password" class="form-control">
                </div>
                <button type="submit" class="btn btn-primary" [disabled]="!myForm.valid">Sign In</button>
            </form>
        </section>
    `
})
export class SigninComponent implements OnInit {
    myForm: FormGroup;

    constructor(private _fb:FormBuilder, private _authService: AuthService, private _router: Router, private _errorService: ErrorService) {}

    ngOnInit() {
        this.myForm = this._fb.group({
            email: ['', Validators.compose([
                Validators.required,
                this.isEmail
            ])],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        const user = new User(this.myForm.value.email, this.myForm.value.password);
        this._authService.signin(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userid', data.userId);
                    this._router.navigateByUrl('/');
                },
                error => this._errorService.handleError(error)
            )
    }

    private isEmail(control: FormControl): {[s: string]: boolean} {
        if (!control.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")) {
            return {invalidMail: true};
        }
    }
}