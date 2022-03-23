import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const email = 'merciful7@lord.com' 
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({email, password: 'come'})
      .expect(201)
      .then(res => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toBe(email);
      })
  });

  it('signup as a new user and gets the curently logged in user', async () => {
    const email = 'greacious@lord.com'
    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({email, password: 'graceful '})

    const cookie = response.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200)

    expect(body.email).toBe(email);
  })
});
