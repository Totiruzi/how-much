import { rm } from 'fs/promises';
import { join } from 'path';
import { getConnection } from 'typeorm';

global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (error) {
    // expect(error.message).toEqual('Bad Request');
  }
})

global.afterEach(async () => {
  await getConnection().close();
})