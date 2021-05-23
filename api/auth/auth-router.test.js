const request = require("supertest");
const server = require("../server");
const db = require("../data/db-config");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async (done) => {
  await db.destroy();
  done();
});

const registerEP = "api/auth/register";
const loginEP = "api/auth/login";

const user1 = {
  user_username: "mariomario",
  user_password: "Its_a_m3",
  user_email: "mario@mushroom.kdm",
};
const user2 = {
  user_username: "luigi_mario",
  user_password: "00Wu!g33",
  user_email: "luigi@mushroom.kdm",
};

const user3 = {
  user_username: "<wario_yosh=",
  user_password: "wah",
  user_email: "wariomushroom.kdm",
};

// eslint-disable-next-line no-unused-vars
const { user_password, ...userNoPwd } = user1;
// eslint-disable-next-line no-unused-vars
const { user_username, ...userNoName } = user1;
// eslint-disable-next-line no-unused-vars
const { user_email, ...userNoEmail } = user1;

describe("/auth", () => {
  //\\\\\\\\\\\\\\\\\\\ REGISTER ENDPOINT \\\\\\\\\\\\\\\\\\\\\
  describe(`[POST] ${registerEP}`, () => {
    describe(`Happy Path`, () => {
      let res;
      beforeEach(async () => {
        res = await request(server).post(registerEP).send(user1);
      });

      it("responds with 201", () => {
        expect(res.status).toEqual(201);
      });

      it("responds with new user", () => {
        expect(res.body).toMatchObject(userNoPwd);
      });

      it("responds with user id", () => {
        expect(res.body).toHaveProperty("user_id");
      });

      it("responds with hashed password", () => {
        expect(res.body.user_password).not.toEqual(user1.user_password);
      });

      it.todo(
        "adds user to the database"
        //, ()=>{

        //}
      );
    }); //Happy Path

    //\\\\\\\\\\\\\\\\\\\  \\\\\\\\\\\\\\\\\\\\\

    describe(`Sad Path: Bad inputs`, () => {
      describe(`Bad Username`, () => {
        describe(`Duplicate Username`, () => {
          let res;
          const userSameName = { ...user2, user_username: user1.user_username };
          beforeEach(async () => {
            await request(server).post(registerEP).send(userSameName);
          });
          beforeEach(async () => {
            res = await request(server).post(registerEP).send(user1);
          });

          it("responds with 400", () => {
            expect(res.status).toEqual(400);
          });

          it("responds with proper error", () => {
            expect(res.body.message).toMatch(/username unavailable/i);
          });
        }); //Duplicate Username

        describe(`Missing Username`, () => {
          let res;
          beforeEach(async () => {
            res = await request(server).post(userNoName);
          });

          it("responds with 400", () => {
            expect(res.status).toEqual(400);
          });

          it("responds with proper error", () => {
            expect(res.body.message).toMatch(/username required/i);
          });
        }); //Missing Username

        describe(`Username Contains Characters Other [a-z0-9_-]`, () => {
          let res;
          const userBadName = { ...user1, user_username: user3.user_username };
          beforeEach(
            async () => (res = await request(server).post(userBadName))
          );

          it("responds with 400", async () => {
            expect(res.status).toEqual(400);
          });

          it("responds with proper error", () => {
            expect(res.body.message).toMatch(/invalid username/i);
          });
        }); //Username Contains Characters
      }); //Bad Username

      //\\\\\\\\\\\\\\\\\\\  \\\\\\\\\\\\\\\\\\\\\

      describe(`Bad Password`, () => {
        describe(`Missing Password`, () => {
          let res;
          beforeEach(async () => {
            res = await request(server).post(userNoPwd);
          });

          it("responds with 400", () => {
            expect(res.status).toEqual(400);
          });

          it("responds with proper error", () => {
            expect(res.body.message).toMatch(/Password required/i);
          });
        }); //Missing Password

        describe(`Password Too Short`, () => {
          let res;
          const userBadPwd = { ...user1, user_Password: user3.user_Password };
          beforeEach(
            async () => (res = await request(server).post(userBadPwd))
          );

          it("responds with 400", async () => {
            expect(res.status).toEqual(400);
          });

          it("responds with proper error", () => {
            expect(res.body.message).toMatch(/invalid Password/i);
          });
        }); //Password Too Short
      }); //Bad Password

      //\\\\\\\\\\\\\\\\\\\  \\\\\\\\\\\\\\\\\\\\\

      describe(`Bad Email`, () => {
        describe(`Duplicate Email`, () => {
          let res;
          const userSameEmail = { ...user2, user_email: user1.user_email };
          beforeEach(async () => {
            await request(server).post(registerEP).send(userSameEmail);
          });
          beforeEach(async () => {
            res = await request(server).post(registerEP).send(user1);
          });

          it("responds with 400", () => {
            expect(res.status).toEqual(400);
          });

          it("responds with proper error", () => {
            expect(res.body.message).toMatch(/Email already registered/i);
          });
        }); //Duplicate Email

        describe(`Missing Email`, () => {
          let res;
          beforeEach(async () => {
            res = await request(server).post(userNoEmail);
          });

          it("responds with 400", () => {
            expect(res.status).toEqual(400);
          });

          it("responds with proper error", () => {
            expect(res.body.message).toMatch(/Email required/i);
          });
        }); //Missing Email

        describe(`Email is valid`, () => {
          let res;
          const userBadEmail = { ...user1, user_email: user3.user_email };
          beforeEach(
            async () => (res = await request(server).post(userBadEmail))
          );

          it("responds with 400", async () => {
            expect(res.status).toEqual(400);
          });

          it("responds with proper error", () => {
            expect(res.body.message).toMatch(/invalid Email/i);
          });
        }); //Email Contains Characters
      }); //Bad Email
    }); //Sad Path: Bad inputs
  }); //[POST] ${register}
}); ///auth
