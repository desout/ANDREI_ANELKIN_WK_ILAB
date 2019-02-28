import {module } from 'angular';
import { EmailService } from './services/email.service';
import { emailServiceDecorator } from './utils/emailServiceDecorator';
import { FeedbackComponent } from './components/feedback/feedback.component';


export const feedback = module('feedback', [])
  .service(EmailService.NAME, EmailService)
  .config(emailServiceDecorator)
  .component(FeedbackComponent.NAME, new FeedbackComponent())
  .config(['$stateProvider', '$urlRouterProvider', ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
      $stateProvider
        .state({
          name: 'feedback',
          url: '/feedback',
          component: FeedbackComponent.NAME
        })
    }]
  );
