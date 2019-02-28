import { LoggingService } from '../utils/loggingService';

export interface FeedbackType {
  from: string;
  to: string;
  content: string;
  signature?: string;
}

export class EmailService {
  static $inject = [LoggingService.NAME];
  static NAME: string = 'emailService';

  constructor(private loggingService: LoggingService) {
  }

  SendEmail(email: FeedbackType): void {
    if (email.to === '' || email.from === '') {
      this.loggingService.log(EmailService.NAME, 'SEND MAIL FROM SERVICE ERROR');
    } else {
      console.log(`Sanded Feedback From Service: ${JSON.stringify(email)}`);
      this.loggingService.log(EmailService.NAME, 'SEND MAIL FROM SERVICE SUCCESS');
    }
  }

}
