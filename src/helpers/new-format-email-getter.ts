import { getNewUserEmail } from './email-formatter';
import { isEmailValid } from './email-verifier';

export const getEmailInPopularFormats = async (
  domain: string,
  fullName: string
) => {
  // Try email in full first name format as wojciechkrzywdzinski@domain.com
  let email = getNewUserEmail(fullName, domain);
  let isValid = await isEmailValid(email);

  if (isValid) {
    return email;
  }

  // Try email in  first 3 letters from first name format as wojkrzywdzinski@domain.com
  email = getNewUserEmail(fullName, domain, 3);
  isValid = await isEmailValid(email);

  if (isValid) {
    return email;
  }

  // Try email in  first 1 letter from first name format as wojkrzywdzinski@domain.com
  email = getNewUserEmail(fullName, domain, 1);
  isValid = await isEmailValid(email);

  if (isValid) {
    return email;
  }

  // With more time I would check formats more formats, like lastNameFirstName or lastName.FirstName as mine :)
  return null;
};
