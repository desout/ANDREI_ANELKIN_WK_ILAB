import { EmailService } from '../services/email.service';

export const emailServiceDecorator = ['$provide', function ($provide) {

  $provide.decorator(EmailService.NAME, [
    '$delegate',
    function emailServiceDecorator($delegate) {

      $delegate.setContent = setContent($delegate);
      $delegate.setTo = setTo($delegate);
      $delegate.setFrom = setFrom($delegate);
      $delegate.setSignature = setSignature($delegate);
      $delegate.sendFromDecorator = sendFromDecorator($delegate);
      return $delegate
    }

  ]);
}];

const setContent = ($delegate) => {
  return (content: string) => {

    console.debug(`EmailServiceDecorator: Set Content`);
    $delegate.content = content;
  }
};

const setTo = ($delegate) => {
  return (to: string[]) => {
    console.debug(`EmailServiceDecorator: Set To`);
    $delegate.to = $delegate.to ? $delegate.to.concat(to) : to;
  }
};

const setFrom = ($delegate) => {
  return (from: string) => {
    $delegate.from = from;
    console.debug(`EmailServiceDecorator: Set From`);
  }
};

const setSignature = ($delegate) => {
  return (signature: string) => {
    $delegate.signature = signature;
    console.debug(`EmailServiceDecorator: Set Signature`);
  }
};

const sendFromDecorator = ($delegate) => {
  return (from: string, to: string[], signature: string) => {
    let toMail = to.filter((mail: string) => mail !== '' && mail.indexOf('failed') === -1);
    if (toMail.length === 0 && $delegate.to) {
      toMail = $delegate.to.filter((mail: string) => mail !== '' && mail.indexOf('failed') === -1);
    }
    if (toMail.length === 0 || (!$delegate.from && !from)) {
      console.debug(`EmailServiceDecorator: Send Mail Error`);

    } else {
      console.debug(`Sanded Feedback from decorator: ${JSON.stringify({
        from: from !== '' ? from : $delegate.from,
        to: toMail[0],
        content: $delegate.content,
        signature: signature !== '' ? signature : $delegate.signature
      })}`);
      console.debug(`EmailServiceDecorator: Send Email SUCCESS`);

    }
  }
};