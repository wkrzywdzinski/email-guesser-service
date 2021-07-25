import { errorHandler } from './error-handler';

describe('HELPER: error-handler', () => {
  it('Should set response status to 400 and send provided message', () => {
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    const mockResp = { status: mockStatus } as any;

    errorHandler(mockResp, 'mockMessage');

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      status: 400,
      message: 'mockMessage',
    });
  });
});
