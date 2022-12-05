import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.css']
})
export class FormCardComponent {
  @Input() showFormCard = false;
  @Output() showFormCardEvent = new EventEmitter();

  onCloseClick() {
    this.showFormCard = false;
    this.showFormCardEvent.emit(this.showFormCard);
  }

  handleSubmitForm(valueEmitted: boolean) {
    this.showFormCard = valueEmitted;
    this.showFormCardEvent.emit(this.showFormCard);
  }
}
