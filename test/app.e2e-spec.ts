import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { SignUpDto } from '../src/auth/dto';
import { AuthRole } from '../src/auth/types';
import { UpdateUserDataDto } from 'src/user/dto';

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
    describe('signUp', () => {
      it('should throw error if email is empty', () => {
        return pactum
          .spec()
          .post(`/auth/signup`)
          .withBody({ password: '123456' })
          .expectStatus(400);
      });
      it('should throw error if password is empty', () => {
        return pactum
          .spec()
          .post(`/auth/signup`)
          .withBody({ email: 'test1@gmail.com' })
          .expectStatus(400);
      });
      it('should throw error if no body', () => {
        return pactum.spec().post(`/auth/signup`).expectStatus(400);
      });
      it('should signup', () => {
        const dto: SignUpDto = {
          email: 'test@gmail.com',
          password: '123456',
          username: 'test',
          role: AuthRole.USER,
        };
        return pactum
          .spec()
          .post(`/auth/signup`)
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('signin', () => {
      describe('signup', () => {
        it('should throw error if email is empty', () => {
          return pactum
            .spec()
            .post(`/auth/signup`)
            .withBody({ password: '123456' })
            .expectStatus(400);
        });
        it('should throw error if password is empty', () => {
          return pactum
            .spec()
            .post(`/auth/signup`)
            .withBody({ email: 'test@gmail.com' })
            .expectStatus(400);
        });
        it('should throw error if no body', () => {
          return pactum.spec().post(`/auth/signup`).expectStatus(400);
        });
        it('should signin', () => {
          return pactum
            .spec()
            .post(`/auth/login`)
            .withBody({ email: 'test@gmail.com', password: '123456' })
            .expectStatus(200)
            .stores('userAt', 'access_token');
        });
      });
    });
  });

  describe('User', () => {
    describe('getMe', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get(`/user/me`)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });

    describe('updateUser', () => {
      it('should update user', () => {
        const dto: UpdateUserDataDto = {
          username: 'test',
          email: 'test1@gmail.com',
        };
        return pactum
          .spec()
          .patch(`/user/update`)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200);
      });
    });
  });

  describe('Reviews', () => {
    describe('Create Review', () => {
      it('should throw error if dataItemId is empty', () => {
        return pactum
          .spec()
          .post(`/review/create`)
          .withBody({ userId: 1, rating: 5, comment: 'test' })
          .expectStatus(400);
      });

      it('should throw error if userId is empty', () => {
        return pactum
          .spec()
          .post(`/review/create`)
          .withBody({ dataItemId: 1, rating: 5, comment: 'test' })
          .expectStatus(400);
      });

      it('should throw error if rating is empty', () => {
        return pactum
          .spec()
          .post(`/review/create`)
          .withBody({ dataItemId: 1, userId: 1, comment: 'test' })
          .expectStatus(400);
      });

      // TODO: after creating test cases of Data item
      // it('should create review', () => {
      //   return pactum
      //     .spec()
      //     .post(`/review/create`)
      //     .withHeaders({
      //       Authorization: 'Bearer $S{userAt}',
      //     })
      //     .withBody({dataItemId: 1, userId: 1, rating: 5, comment: 'test'})
      //     .expectStatus(201);
      // });

      // it('should throw error if dataItem is empty', () => {
      //   return pactum
      //     .spec()
      //     .get(`/review/get-reviews-by-data-item/dataItemId/`)
      //     .expectStatus(400);
      // });

      // it('should get reviews by dataItemId', () => {
      //   return pactum
      //     .spec()
      //     .get(`/review/get-reviews-by-data-item/dataItemId/1`)
      //     .expectStatus(200);
      // });

      //   it('should throw error if reviewId is empty', () => {
      //     return pactum.spec().delete(`/review/get-review/`).expectStatus(400);
      //   });

      //   it('should throw error if reviewId is empty', () => {
      //     return pactum
      //       .spec()
      //       .delete(`/review/delete/`)
      //       .withBody({ rating: 5, comment: 'test' })
      //       .expectStatus(400);
      //   });

      //   it('should delete review', () => {
      //     return pactum
      //       .spec()
      //       .delete(`/review/delete/1`)
      //       .withHeaders({
      //         Authorization: 'Bearer $S{userAt}',
      //       })
      //       .withBody({ rating: 5, comment: 'test' })
      //       .expectStatus(200);
      //   });

      //   it('should throw error if reviewId is empty', () => {
      //     return pactum
      //       .spec()
      //       .patch(`/review/update/`)
      //       .withHeaders({
      //         Authorization: 'Bearer $S{userAt}',
      //       })
      //       .withBody({ rating: 5, comment: 'test' })
      //       .expectStatus(400);
      //   });

      //   it('should throw error if rating is empty', () => {
      //     return pactum
      //       .spec()
      //       .patch(`/review/update/1`)
      //       .withHeaders({
      //         Authorization: 'Bearer $S{userAt}',
      //       })
      //       .withBody({ comment: 'test' })
      //       .expectStatus(400);
      //   });

      //   it('should throw if comment is empty', () => {
      //     return pactum
      //       .spec()
      //       .patch(`/review/update/1`)
      //       .withHeaders({
      //         Authorization: 'Bearer $S{userAt}',
      //       })
      //       .withBody({ rating: 5 })
      //       .expectStatus(400);
      //   });

      //   it('should update review', () => {
      //     return pactum
      //       .spec()
      //       .patch(`/review/update/1`)
      //       .withHeaders({
      //         Authorization: 'Bearer $S{userAt}',
      //       })
      //       .withBody({ rating: 5, comment: 'test' })
      //       .expectStatus(200);
      //   });
    });
  });
});
