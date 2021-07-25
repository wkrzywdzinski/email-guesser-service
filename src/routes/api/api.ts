import { Request, Response, Router } from 'express';
import { readFileSync } from 'fs';
import { getEmailFromMatchingEntry } from '../../helpers/db-email-getter';
import { errorHandler } from '../../helpers/error-handler';
import { getEmailInPopularFormats } from '../../helpers/new-format-email-getter';

const router: Router = Router();

router.post('*', async (req: Request, res: Response) => {
  try {
    const { fullName, domain } = req.body;

    if (!fullName || !domain) {
      errorHandler(res, 'Wrong request, data missing');
      return;
    }

    let rawData = readFileSync('./src/db.json') as unknown as string;
    let parsedData = JSON.parse(rawData);
    let email = await getEmailFromMatchingEntry(parsedData, domain, fullName);
    email ?? (await getEmailInPopularFormats(domain, fullName));

    if (!email) {
      errorHandler(res, `Email resolution for ${fullName} failed `);
      return;
    }

    res.json({
      email,
      status: 200,
      message: `Email ${email} successfully found for ${fullName}`,
    });
  } catch (err) {
    errorHandler(res, `Unexpected error: ${err}`);
  }
});
module.exports = router;
