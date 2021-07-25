import { Database } from '../interfaces/database';
import { writeFile } from 'fs';
export const updateDatabase = (
  database: Database,
  fullName: string,
  email: string
) => {
  database[fullName] = email;

  writeFile('./src/db.json', JSON.stringify(database), (err) => {
    if (err) return console.log(err);
  });
};
