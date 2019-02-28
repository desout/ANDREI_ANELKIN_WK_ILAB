import { equals } from 'angular';
import { FeedbackType } from '../../services/email.service';
import { feedback } from './feedbackModule';

class FeedbackController implements ng.IController {
  static $inject = ['emailService'];

  feedback: FeedbackType = {content: '', from: '', signature: '', to: ''};

  constructor(private emailService) {
  }

  onSubmit(form: HTMLFormElement): void {
    this.emailService.SendEmail(this.feedback);
  }

  sendToDecorator(): void {
    this.emailService.sendFromDecorator(this.feedback.from, this.feedback.to.split(';'), this.feedback.signature);
  }

  setFrom(from: string): void {
    this.emailService.setFrom(from);
  }

  setTo(to): void {
    this.emailService.setTo(to.split(';'));

  }

  setContent(content: string): void {
    this.emailService.setContent(content);
  }

  setSignature(signature: string): void {
    this.emailService.setSignature(signature);
  }

  isEmptyObject = (obj): boolean => equals({}, obj);
}

export class FeedbackComponent implements ng.IComponentOptions {
  static NAME: string = 'feedback';
  controller: any;
  templateUrl: any;
  data: any;

  constructor() {
    this.controller = FeedbackController;
    this.templateUrl = require('./feedback.component.html');
    this.data = {
      'noLogin': true
    };
  }
}
