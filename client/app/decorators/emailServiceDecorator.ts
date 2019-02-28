import { EmailService } from '../services/email.service';

export const emailServiceDecorator = ['$provide', ($provide) => {

  $provide.decorator(EmailService.NAME, [
    '$delegate',
    ($delegate) => {
      $delegate.setContent = setContent($delegate);
      $delegate.setTo = setTo($delegate);
      $delegate.setFrom = setFrom($delegate);
      $delegate.setSignature = setSignature($delegate);
      $delegate.sendFromDecorator = sendFromDecorator($delegate);
      return $delegate;
    }

  ]);
}];
const DECORATORNAME = 'emailServiceDecorator';
const setContent = ($delegate) => {
  return (content: string) => {
    $delegate.loggingService.log(DECORATORNAME, 'Set Content');
    $delegate.content = content;
  };
};

const setTo = ($delegate) => {
  return (to: string[]) => {
    $delegate.loggingService.log(DECORATORNAME, 'Set To');
    $delegate.to = $delegate.to ? $delegate.to.concat(to) : to;
  };
};

const setFrom = ($delegate) => {
  return (from: string) => {
    $delegate.from = from;
    $delegate.loggingService.log(DECORATORNAME, 'Set From');
  };
};

const setSignature = ($delegate) => {
  return (signature: string) => {
    $delegate.signature = signature;
    $delegate.loggingService.log(DECORATORNAME, 'Set Signature');
  };
};

const sendFromDecorator = ($delegate) => {
  return (from: string, to: string[], signature: string) => {
    let toMail = to.filter((mail: string) => mail !== '' && mail.indexOf('failed') === -1);
    if (toMail.length === 0 && $delegate.to) {
      toMail = $delegate.to.filter((mail: string) => mail !== '' && mail.indexOf('failed') === -1);
    }
    if (toMail.length === 0 || (!$delegate.from && !from)) {
      $delegate.loggingService.log(DECORATORNAME, 'Send Mail Error');

    } else {

      $delegate.loggingService.log(DECORATORNAME, `Sanded Feedback from decorator: ${JSON.stringify({
        from: from !== '' ? from : $delegate.from,
        to: toMail[0],
        content: $delegate.content,
        signature: signature !== '' ? signature : $delegate.signature
      })}`);
      $delegate.loggingService.log(DECORATORNAME, ' Send Email SUCCESS');
    }
  };
};
