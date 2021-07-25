import { getNewUserEmail } from './email-formatter';

describe('HELPER: email-formatter', () => {
  it('getNewUserEmail should create email based on fullname and domain name and not shorten first name when not specified', () => {
    const result = getNewUserEmail('Jane Doe', 'domain.com');

    expect(result).toBe('janedoe@domain.com');
  });

  it('getNewUserEmail create email with shortened first name when it was specified', () => {
    const result = getNewUserEmail('Jane Doe', 'domain.com', 1);

    expect(result).toBe('jdoe@domain.com');
  });
});
