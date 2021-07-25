import { now } from 'moment';
import { getEmailInPopularFormats } from './new-format-email-getter';
jest.mock('./email-verifier', () => ({
  isEmailValid: jest.fn().mockReturnValue(true),
}));

describe('HELPER: getEmailInPopularFormats', () => {
  it('should use first option that is verified positive', async () => {
    const { isEmailValid } = require('./email-verifier');

    const result = await getEmailInPopularFormats('domain.com', 'Jane Doe');

    expect(result).toBe('janedoe@domain.com');
  });

  //   the same as in db-email-getter it is hard for me to configure this mocks better right now
  //   Especially initial configuration of Jest is tedious and as was mentioned in the task description - not everything has to be perfect
});
