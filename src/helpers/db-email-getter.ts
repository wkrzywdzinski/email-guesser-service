import { Database } from '../interfaces/database';
import { updateDatabase } from './database-updater';
import { getNewUserEmail, separateFirstAndLastName } from './email-formatter';
import { isEmailValid } from './email-verifier';

type ParsedDataBaseEntry = [string, string];

export const getEmailFromMatchingEntry = async (
  database: Database,
  domain: string,
  fullName: string
) => {
  const entryWithMatchingDomain = Object.entries(database).find(
    (entry: ParsedDataBaseEntry) => entry[1].includes(domain)
  );
  if (!entryWithMatchingDomain) {
    return null;
  }

  const email = await getEmailBySimilarEntryPattern(
    entryWithMatchingDomain,
    fullName,
    domain
  );

  const validEmail = await isEmailValid(email);

  if (!validEmail) {
    throw new Error('Email resolving based on DB entry failed');
  }

  updateDatabase(database, fullName, email);
  return email;
};

const getEmailBySimilarEntryPattern = (
  matchingEntry: ParsedDataBaseEntry,
  fullName: string,
  domain: string
): string => {
  // This function could be more complicated, but based on DB entries I optimistically assumed that
  // email address will always consist whole last name. Could be improved!
  const matchingEntryFullName = matchingEntry[0];
  const matchingEntryEmail = matchingEntry[1];

  const { firstName } = separateFirstAndLastName(matchingEntryFullName);
  const lengthOfFirstNameInEmail = getLengthOfFirstNameInEmail(
    firstName,
    matchingEntryEmail
  );

  return getNewUserEmail(fullName, domain, lengthOfFirstNameInEmail);
};

const getLengthOfFirstNameInEmail = (fullNameString: string, email: string) => {
  const firstNameLetters: string[] = fullNameString.split('');

  let lastMatchingLetterIndex: number | null = null;
  firstNameLetters.forEach((letter, index) => {
    if (letter !== email[index] && !lastMatchingLetterIndex) {
      lastMatchingLetterIndex = index;
    }
  });
  return lastMatchingLetterIndex;
};
