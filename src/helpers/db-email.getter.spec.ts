import { getEmailFromMatchingEntry } from './db-email-getter';
jest.mock('./email-verifier', () => ({
  isEmailValid: jest.fn().mockReturnValue(true),
}));
jest.mock('./database-updater', () => ({
  updateDatabase: jest.fn(),
}));

describe('HELPER: db-email-getter', () => {
  const mockDatabase = { 'Mock User': 'mockuser@domain.com' };

  it('getEmailFromMatchingEntry when finds matching entry should validate email and update database on success', async () => {
    const { isEmailValid } = require('./email-verifier');
    const { updateDatabase } = require('./database-updater');

    const result = await getEmailFromMatchingEntry(
      mockDatabase,
      'domain.com',
      'New User'
    );

    expect(result).toBeTruthy();
    expect(isEmailValid).toHaveBeenCalled();
    expect(updateDatabase).toHaveBeenCalled();
  });
  it('getEmailFromMatchingEntry should return null when no watching entry was found', async () => {
    const result = await getEmailFromMatchingEntry(
      mockDatabase,
      'notMatchingDomain.com',
      'New User'
    );
    expect(result).toBe(null);
  });
  // I know that testing for negative values is at least the same important as testing for the happy path ,
  // but I have some hard to solve configuration problems as i had to mock imports in the global scope and can't
  // adjust them before each of tests
});
