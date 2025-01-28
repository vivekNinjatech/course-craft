import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { RegisterDto } from '../src/auth/dto';
import { AuthRole } from '../src/auth/type';
import { UpdateUserDataDto } from '../src/user/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3000);

    prisma = app.get(PrismaService);
    prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3000');
  });

  afterAll(async () => {
    app.close();
  });

  describe('Auth', () => {
    describe('register user', () => {
      it('should throw error if email is empty', () => {
        return pactum
          .spec()
          .post(`/users/register`)
          .withBody({ password: '123456' })
          .expectStatus(400);
      });
      it('should throw error if password is empty', () => {
        return pactum
          .spec()
          .post(`/users/register`)
          .withBody({ email: 'test1@gmail.com' })
          .expectStatus(400);
      });
      it('should throw error if no body', () => {
        return pactum.spec().post(`/users/reg`).expectStatus(404);
      });
      it('should register', () => {
        const dto: RegisterDto = {
          email: 'test@gmail.com',
          password: '123456',
          username: 'test',
          role: AuthRole.USER,
        };
        return pactum
          .spec()
          .post(`/users/register`)
          .withBody(dto)
          .expectStatus(201);
      });
      it('should register superadmin', () => {
        const dto: RegisterDto = {
          email: 'superadmin@gmail.com',
          password: '123456',
          username: 'superadmin',
          role: AuthRole.SUPERADMIN,
        };
        return pactum
          .spec()
          .post(`/users/register`)
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('login user', () => {
      it('should throw error if email is empty', () => {
        return pactum
          .spec()
          .post(`/users/register`)
          .withBody({ password: '123456' })
          .expectStatus(400);
      });
      it('should throw error if password is empty', () => {
        return pactum
          .spec()
          .post(`/users/register`)
          .withBody({ email: 'test@gmail.com' })
          .expectStatus(400);
      });
      it('should throw error if no body', () => {
        return pactum.spec().post(`/auth/register`).expectStatus(404);
      });
      it('should signin', () => {
        return pactum
          .spec()
          .post(`/users/login`)
          .withBody({ email: 'test@gmail.com', password: '123456' })
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
      it('should signin superadmin', () => {
        return pactum
          .spec()
          .post(`/users/login`)
          .withBody({ email: 'superadmin@gmail.com', password: '123456' })
          .expectStatus(200)
          .stores('superadminAt', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('get profile', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get(`/users/profile`)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });

    describe('update profile', () => {
      it('should update user', () => {
        const dto: UpdateUserDataDto = {
          username: 'test',
          email: 'test1@gmail.com',
        };
        return pactum
          .spec()
          .put(`/users/profile`)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200);
      });
    });
  });

  describe('Admin', () => {
    describe('register admin', () => {
      it('should throw if no Bearer token provided', () => {
        return pactum
          .spec()
          .post('/admin/register')
          .withBody({ password: '123456' })
          .expectStatus(401);
      });

      it('should throw forbidden error if normal user try to register', () => {
        return pactum
          .spec()
          .post(`/admin/register`)
          .withBearerToken('$S{userAt}')
          .withBody({ password: '123456' })
          .expectStatus(403);
      });

      it('should register admin', () => {
        return pactum
          .spec()
          .post(`/admin/register`)
          .withBearerToken('$S{superadminAt}')
          .withBody({
            email: 'admin@gmail.com',
            username: 'admin',
            password: '123456',
            role: AuthRole.ADMIN,
          })
          .expectStatus(201);
      });

      it('should throw error if email is empty', () => {
        return pactum
          .spec()
          .post(`/admin/register`)
          .withBody({ password: '123456' })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(400);
      });

      it('should throw error if password is empty', () => {
        return pactum
          .spec()
          .post(`/admin/register`)
          .withBody({ email: 'test@gmail.com' })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(400);
      });
    });
  });

  describe('Data Category', () => {
    describe('create data category', () => {
      it('should throw error if name is empty', () => {
        return pactum
          .spec()
          .post(`/data-categories`)
          .withBody({ description: 'test' })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(400);
      });

      it('should throw error if description is empty', () => {
        return pactum
          .spec()
          .post(`/data-categories`)
          .withBody({ name: 'test' })
          .expectStatus(401);
      });

      it('should create data category', () => {
        return pactum
          .spec()
          .post(`/data-categories`)
          .withBody({ name: 'test', description: 'test' })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(201);
      });
      it('should create data category', () => {
        return pactum
          .spec()
          .post(`/data-categories`)
          .withBody({ name: 'test-1', description: 'test-1' })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(201);
      });
    });
    describe('get data categories', () => {
      it('should get all data categories', () => {
        return pactum
          .spec()
          .get(`/data-categories`)
          .withBearerToken('$S{superadminAt}')
          .expectStatus(200);
      });

      it('should get data category by id', () => {
        return pactum
          .spec()
          .get(`/data-categories/1`)
          .withBearerToken('$S{superadminAt}')
          .expectStatus(200);
      });
    });
    describe('update data category', () => {
      it('should update data category', () => {
        return pactum
          .spec()
          .put(`/data-categories/1`)
          .withBody({ name: 'test', description: 'test' })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(200);
      });
    });
    describe('delete data category', () => {
      it('should delete data category', () => {
        return pactum
          .spec()
          .delete(`/data-categories/1`)
          .withBearerToken('$S{superadminAt}')
          .expectStatus(200);
      });
    });
  });

  describe('Data Item', () => {
    describe('create data item', () => {
      it('should throw error if title is empty', () => {
        return pactum
          .spec()
          .post(`/data-items`)
          .withBody({
            description: 'test',
            price: 100,
            fileUrl: 'test',
            categoryId: 2,
          })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(400);
      });

      it('should throw error if description is empty', () => {
        return pactum
          .spec()
          .post(`/data-items`)
          .withBody({
            title: 'test',
            fileUrl: 'test',
            price: 100,
            categoryId: 2,
          })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(400);
      });

      it('should throw error if price is empty', () => {
        return pactum
          .spec()
          .post(`/data-items`)
          .withBody({
            title: 'test',
            description: 'test',
            fileUrl: 'test',
            categoryId: 2,
          })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(400);
      });

      it('should throw error if fileUrl is empty', () => {
        return pactum
          .spec()
          .post(`/data-items`)
          .withBody({
            title: 'test',
            description: 'test',
            price: 100,
            categoryId: 2,
          })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(400);
      });

      it('should throw error if dataCategoryId is empty', () => {
        return pactum
          .spec()
          .post(`/data-items`)
          .withBody({
            title: 'test',
            description: 'test',
            price: 100,
            fileUrl: 'test',
          })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(400);
      });

      it('should create data item', () => {
        return pactum
          .spec()
          .post(`/data-items`)
          .withBody({
            title: 'test',
            description: 'test',
            price: 100,
            fileUrl: 'test',
            categoryId: 2,
          })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(201);
      });

      it('should create data item', () => {
        return pactum
          .spec()
          .post(`/data-items`)
          .withBody({
            title: 'test-1',
            description: 'test-1',
            price: 100,
            fileUrl: 'test',
            categoryId: 2,
          })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(201);
      });
    });

    describe('get data items', () => {
      it('should get all data items', () => {
        return pactum
          .spec()
          .get(`/data-items`)
          .withBearerToken('$S{superadminAt}')
          .expectStatus(200);
      });

      it('should get data item by id', () => {
        return pactum
          .spec()
          .get(`/data-items/1`)
          .withBearerToken('$S{superadminAt}')
          .expectStatus(200);
      });
    });

    describe('update data item', () => {
      it('should update data item', () => {
        return pactum
          .spec()
          .put(`/data-items/1`)
          .withBody({ description: 'test' })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(200);
      });
    });

    describe('delete data item', () => {
      it('should delete data item', () => {
        return pactum
          .spec()
          .delete(`/data-items/2`)
          .withBearerToken('$S{superadminAt}')
          .expectStatus(200);
      });
    });
  });

  describe('Orders', () => {
    describe('create order', () => {
      it('should throw error if orderId is empty', () => {
        return pactum
          .spec()
          .post(`/orders`)
          .withBody({ dataItemId: 1, userId: 1 })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(400);
      });
      it('should throw error if dataItemId is empty', () => {
        return pactum
          .spec()
          .post(`/orders`)
          .withBody({ userId: 1 })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(400);
      });
      it('should throw error if userId is empty', () => {
        return pactum
          .spec()
          .post(`/orders`)
          .withBody({ dataItemId: 1 })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(400);
      });
      it('should throw if amount is empty', () => {
        return pactum
          .spec()
          .post(`/orders`)
          .withBody({ dataItemId: 1, userId: 1 })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(400);
      });
      it('should throw error if status is empty', () => {
        return pactum
          .spec()
          .post(`/orders`)
          .withBody({ dataItemId: 1, userId: 1, amount: 1 })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(400);
      });
      it('should create order', () => {
        return pactum
          .spec()
          .post(`/orders`)
          .withBody({
            orderId: '1234',
            dataItemId: 1,
            userId: 1,
            amount: 1,
            status: 'pending',
          })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(201);
      });
    });
    describe('get orders', () => {
      it('should get all orders', () => {
        return pactum
          .spec()
          .get(`/orders`)
          .withBearerToken('$S{superadminAt}')
          .expectStatus(200);
      });
      it('should get order by id', () => {
        return pactum
          .spec()
          .get(`/orders/1`)
          .withBearerToken('$S{superadminAt}')
          .expectStatus(200);
      });
      it('should get order of user', () => {
        return pactum
          .spec()
          .get(`/orders/user/1`)
          .withBearerToken('$S{superadminAt}')
          .expectStatus(200);
      });
      it('should query order by any field', () => {
        return pactum
          .spec()
          .get(`/orders?amount=1&status=pending`)
          .withBearerToken('$S{superadminAt}')
          .expectStatus(200);
      });
    });
    describe('change order status', () => {
      it('should change order status', () => {
        return pactum
          .spec()
          .patch(`/orders/1234`)
          .withBody({ status: 'completed' })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(200);
      });
    });
  });

  describe('Payments', () => {
    describe('create payment', () => {
      it('should throw error if orderId is empty', () => {
        return pactum
          .spec()
          .post(`/payments`)
          .withBody({ amount: 1, paymentMethod: 'cash' })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(400);
      });
      it('should throw error if amount is empty', () => {
        return pactum
          .spec()
          .post(`/payments`)
          .withBody({ orderId: 1, paymentMethod: 'cash' })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(400);
      });
      it('should throw error if paymentMethod is empty', () => {
        return pactum
          .spec()
          .post(`/payments`)
          .withBody({ orderId: 1, amount: 1 })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(400);
      });
      it('should throw error if status is empty', () => {
        return pactum
          .spec()
          .post(`/payments`)
          .withBody({ orderId: 1, amount: 1, paymentMethod: 'cash' })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(400);
      });
      it('should create payment', () => {
        return pactum
          .spec()
          .post(`/payments`)
          .withBody({
            orderId: 1,
            amount: 1,
            paymentMethod: 'cash',
            status: 'pending',
          })
          .withBearerToken('$S{superadminAt}')
          .expectStatus(201);
      });
    });
    describe('get payments', () => {
      it('should get all payments', () => {
        return pactum
          .spec()
          .get(`/payments`)
          .withBearerToken('$S{superadminAt}')
          .expectStatus(200);
      });
      it('should get payment by id', () => {
        return pactum
          .spec()
          .get(`/payments/1`)
          .withBearerToken('$S{superadminAt}')
          .expectStatus(200);
      });
      it('should get payment of order', () => {
        return pactum
          .spec()
          .get(`/payments/order/1`)
          .withBearerToken('$S{superadminAt}')
          .expectStatus(200);
      });
    });
  });

  describe('Download', () => {
    describe('create download', () => {
      it('should throw error if userId is empty', () => {
        return pactum
          .spec()
          .post(`/downloads`)
          .withBody({ dataItemId: 1, downloadCount: 1 })
          .withBearerToken('$S{userAt}')
          .expectStatus(400);
      });
      it('should throw error if dataItemId is empty', () => {
        return pactum
          .spec()
          .post(`/downloads`)
          .withBody({ userId: 1, downloadCount: 1 })
          .withBearerToken('$S{userAt}')
          .expectStatus(400);
      });
      it('should throw error if downloadCount is empty', () => {
        return pactum
          .spec()
          .post(`/downloads`)
          .withBody({ userId: 1, dataItemId: 1 })
          .withBearerToken('$S{userAt}')
          .expectStatus(400);
      });
      it('should create download', () => {
        return pactum
          .spec()
          .post(`/downloads`)
          .withBody({ userId: 1, dataItemId: 1, downloadCount: 1 })
          .withBearerToken('$S{userAt}')
          .expectStatus(201);
      });
    });
    describe('get downloads', () => {
      it('should get user downloads', () => {
        return pactum
          .spec()
          .get(`/downloads/user/1`)
          .withBearerToken('$S{superadminAt}')
          .expectStatus(200);
      });
      it('should get data item downloads', () => {
        return pactum
          .spec()
          .get(`/downloads/data-item/2`)
          .withBearerToken('$S{superadminAt}')
          .expectStatus(200);
      });
      it('should get downloads by data item id', () => {
        return pactum
          .spec()
          .get(`/downloads/download-count/1`)
          .withBearerToken('$S{superadminAt}')
          .expectStatus(200);
      });
    });
  });

  describe('Reviews', () => {
    describe('create review', () => {
      it('should throw error if dataItemId is empty', () => {
        return pactum
          .spec()
          .post(`/reviews`)
          .withBody({ userId: 1, rating: 5, comment: 'test' })
          .expectStatus(401);
      });

      it('should throw error if userId is empty', () => {
        return pactum
          .spec()
          .post(`/reviews`)
          .withBody({ dataItemId: 1, rating: 5, comment: 'test' })
          .expectStatus(401);
      });

      it('should throw error if rating is empty', () => {
        return pactum
          .spec()
          .post(`/reviews`)
          .withBody({ dataItemId: 1, userId: 1, comment: 'test' })
          .expectStatus(401);
      });

      it('should throw error if comment is empty', () => {
        return pactum
          .spec()
          .post(`/reviews`)
          .withBody({ dataItemId: 1, userId: 1, rating: 5 })
          .expectStatus(401);
      });

      it('should create review', () => {
        return pactum
          .spec()
          .post(`/reviews`)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({ dataItemId: 1, userId: 1, rating: 5, comment: 'test' })
          .expectStatus(201);
      });
    });
    describe('get reviews', () => {
      it('should get all reviews', () => {
        return pactum
          .spec()
          .get(`/reviews`)
          .withBearerToken('$S{superadminAt}')
          .expectStatus(200);
      });
      it('should get review by id', () => {
        return pactum
          .spec()
          .get(`/reviews/1`)
          .withBearerToken('$S{superadminAt}')
          .expectStatus(200);
      });
      it('should get review by user id', () => {
        return pactum
          .spec()
          .get(`/reviews/user/1`)
          .withBearerToken('$S{superadminAt}')
          .expectStatus(200);
      });
      it('should get review by data item id', () => {
        return pactum
          .spec()
          .get(`/reviews/data-item/1`)
          .withBearerToken('$S{superadminAt}')
          .expectStatus(200);
      });
    });
    describe('update review', () => {
      it('should update review', () => {
        return pactum
          .spec()
          .put(`/reviews/1`)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({ rating: 5, comment: 'test' })
          .expectStatus(200);
      });
    });
    describe('delete review', () => {
      it('should delete review', () => {
        return pactum
          .spec()
          .delete(`/reviews/1`)
          .withBearerToken('$S{superadminAt}')
          .expectStatus(200);
      });
    });
  });
});
