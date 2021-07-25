// I am aware that this token could be stored in a safer way, but it is good for coding challenge purposes
// Token for email verifier can be taken from: https://main.whoisxmlapi.com/
import { EMAIL_VERIFIER_TOKEN } from '../secrets';
// imported via require because of typing problems
const verifier = new (require('email-verifier'))(EMAIL_VERIFIER_TOKEN);

// I am not sure if it works totally fine, but it was at least a fair try
// Since I shouldn't spend too much time on this task I only tested it with my own, real email
export const isEmailValid = async (email: string) => {
  return new Promise<boolean>((resolve, reject) => {
    verifier.verify(email, (err: Error, data: any) => {
      resolve(data && data.smtpCheck === 'true');
      reject((err: Error) => {
        console.log(err);
        return false;
      });
    });
  });
};
