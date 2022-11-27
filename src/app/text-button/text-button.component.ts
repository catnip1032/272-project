import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.css']
})
export class TextButtonComponent {
  buttonText = "Create a Pig Report";
  @Input() showFormCard:boolean = false;
  @Output() showFormCardEvent = new EventEmitter()


  onCreatePigReport(){
    // create a modal
    this.showFormCard = true;
    this.showFormCardEvent.emit(this.showFormCard);
    // create a form
  }
}
