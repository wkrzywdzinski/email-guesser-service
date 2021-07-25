import { SeparatedFullName } from '../interfaces/separated-name';

export const getNewUserEmail = (
  fullName: string,
  domain: string,
  shortenFirstNameIndex: number | null = null
): string => {
  const { firstName, lastName } = separateFirstAndLastName(fullName);

  const firstNameString = shortenFirstNameIndex
    ? firstName.slice(0, shortenFirstNameIndex)
    : firstName;

  return `${firstNameString}${lastName}@${domain}`;
};

export const separateFirstAndLastName = (
  fullNameString: string
): SeparatedFullName => {
  const splittedValues = fullNameString.split(' ');
  return {
    firstName: splittedValues[0].toLowerCase(),
    lastName: splittedValues[1].toLowerCase(),
  };
};
