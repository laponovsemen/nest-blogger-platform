import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './app.module';
import { appSetup } from './setup/app.setup';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const testingModuleBuilder = Test.createTestingModule({
      imports: [AppModule],
    });

    const testingAppModule: TestingModule =
      await testingModuleBuilder.compile();

    app = testingAppModule.createNestApplication();

    // Применяем глобальную конфигурацию (prefix "api", pipes и т.д.)
    appSetup(app);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('GET /api/users → 1234', async () => {
    const server = app.getHttpServer();

    const res = await request(server).get('/api/users');

    expect(res.status).toBe(200);
    expect(res.text).toBe('1234');
  });

  it('GET /unknown → 404', async () => {
    const res = await request(app.getHttpServer()).get('/unknown-route');
    expect(res.status).toBe(404);
  });
});
