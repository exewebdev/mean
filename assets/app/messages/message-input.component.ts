import {Component, OnInit} from "@angular/core";
import {MessageService} from "./message.service";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {Message} from "./message";
import {ErrorService} from "../errors/error.service";

@Component({
    selector: 'my-message-input',
    template: `
        <section class="col-md-8 col-md-offset-2">
            <form #messageForm="ngForm" (ngSubmit)="onSubmit()">
                <div class="form-group">
                    <label for="content">Content</label>
                    <input type="text" class="form-control" id="content" name="content" required [ngModel]="content" #content="ngModel">
                </div>
                <button type="submit" class="btn btn-primary">{{ !message ? 'Send Message' : 'Save Message' }}</button>
                <button type="button" class="btn btn-danger" (click)="onCancel()" *ngIf="message"> Cancel </button>
             </form>
        </section>
    `
})

 export class MessageInputComponent implements OnInit {

    messageForm: FormGroup;
    message: Message = null;
    content: FormControl;

    constructor(private _fb:FormBuilder, private _messageService: MessageService, private _errorService: ErrorService) {}

    ngOnInit() {

        this.content = new FormControl('', Validators.required);

        this.messageForm = this._fb.group({
            content: this.content
        });

        this._messageService.messageIsEdit.subscribe(
            message => {
                this.message = message;
            }
        );
    }

    onCancel() {
        this.message = null;
    }

    onSubmit() {
        if (this.message) {
            // Edit
            this.message.content = this.messageForm.get('content').value;
            this._messageService.updateMessage(this.message)
                .subscribe(
                    data => console.log(data),
                    error => this._errorService.handleError(error)
                );
            this.message = null;
        } else {
            const message:Message = new Message(this.messageForm.get('content').value, null, 'Dummy', null);
            this._messageService.addMessage(message)
                .subscribe(
                    data => {
                        console.log(data);
                        this._messageService.messages.push(data);
                    },
                    error => this._errorService.handleError(error)
                );
        }
    }
}