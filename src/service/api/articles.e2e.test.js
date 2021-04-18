'use strict';

const express = require(`express`);
const request = require(`supertest`);
const articles = require(`./articles`);
const DataService = require(`../data-service/articles`);
const CommentService = require(`../data-service/comments`);
const {HttpCode} = require(`../../constants`);

const mockData = [{"id": `pCNKeL`, "title": `Что нужно знать frontend-разработчику в 2021 году`, "createdDate": `2021-01-09 14:34:33`, "announce": `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Достичь успеха помогут ежедневные повторения. Это один из лучших рок-музыкантов. Программировать не настолько сложно, как об этом говорят.`, "fullText": `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Простые ежедневные упражнения помогут достичь успеха. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Кошка — самое грациозное животное в мире. Золотое сечение — соотношение двух величин, гармоническая пропорция.`, "category": [`Музыка`, `Разное`], "comments": [{"id": `aS2O6s`, "text": `Хочу такую же футболку :-) Мне кажется или я уже читал это где-то? Плюсую, но слишком много буквы!`}, {"id": `VZptoK`, "text": `Это где ж такие красоты? Согласен с автором! Мне кажется или я уже читал это где-то?`}, {"id": `HtA0r5`, "text": `Плюсую, но слишком много буквы!`}, {"id": `brRTCN`, "text": `Это где ж такие красоты? Совсем немного...`}]}, {"id": `PUZSnQ`, "title": `Что нужно знать frontend-разработчику в 2021 году`, "createdDate": `2021-01-09 14:34:33`, "announce": `Ёлки — это не просто красивое дерево. Это прочная древесина. Собрать камни бесконечности легко, если вы прирожденный герой. Из под его пера вышло 8 платиновых альбомов. Кошка — самое грациозное животное в мире.`, "fullText": `Vue, React или Angular? Выбор за вами. Достичь успеха помогут ежедневные повторения. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Золотое сечение — соотношение двух величин, гармоническая пропорция. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`, "category": [`Железо`, `За жизнь`, `Программирование`], "comments": [{"id": `-5ctws`, "text": `Совсем немного... Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то?`}, {"id": `HBbr6v`, "text": `Согласен с автором! Планируете записать видосик на эту тему? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`}, {"id": `HacpbX`, "text": `Планируете записать видосик на эту тему?`}]}, {"id": `8otDN1`, "title": `Самый лучший музыкальный альбом этого года`, "createdDate": `2021-01-09 14:34:33`, "announce": `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Как начать действовать? Для начала просто соберитесь.`, "fullText": `Простые ежедневные упражнения помогут достичь успеха. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Кошка — самое грациозное животное в мире. Собрать камни бесконечности легко, если вы прирожденный герой.`, "category": [`IT`, `Животные`, `За жизнь`], "comments": [{"id": `ZB32Nk`, "text": `Хочу такую же футболку :-) Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`}]}, {"id": `oxtUTU`, "title": `Рок — это протест`, "createdDate": `2021-01-09 14:34:33`, "announce": `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`, "fullText": `Ёлки — это не просто красивое дерево. Это прочная древесина. Как начать действовать? Для начала просто соберитесь. Он написал больше 30 хитов. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Это один из лучших рок-музыкантов. Кошка — самое грациозное животное в мире. Простые ежедневные упражнения помогут достичь успеха.`, "category": [`Без рамки`], "comments": [{"id": `m70rzE`, "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Согласен с автором! Совсем немного...`}, {"id": `XyaO3R`, "text": `Плюсую, но слишком много буквы! Хочу такую же футболку :-) Согласен с автором!`}, {"id": `nm91Fl`, "text": `Согласен с автором!`}]}];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  articles(app, new DataService(cloneData), new CommentService(cloneData));
  return app;
};

// GET /api/articles - возвращает список публикаций
describe(`API returns a list of all articles`, () => {
  const app = createAPI();
  let response;
  beforeAll(async () => {
    response = await request(app).get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns a list of 4 offers`, () => expect(response.body.length).toBe(4));
  test(`First offer's id equals "pCNKeL"`, () => expect(response.body[0].id).toBe(`pCNKeL`));
});

// GET /api/articles/:articleId — возвращает полную информацию о публикации
describe(`API returns an article with given id`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles/pCNKeL`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Article's title is "Что нужно знать frontend-разработчику в 2021 году"`, () => expect(response.body.title).toBe(`Что нужно знать frontend-разработчику в 2021 году`));
});

// POST /api/articles — создаёт новую публикацию
describe(`API creates an article if data is valid`, () => {
  const newArticle = {
    "category": [`Разное`, `За жизнь`],
    "title": `Прыжок с парашютом - как это было.`,
    "announce": `Я наконец решилась прыгнуть в бездну.`,
    "fullText": `Восторг, эйфория - эмоции не описать словами!`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).post(`/articles`).send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
  test(`Articles count is changed`, () => request(app).get(`/articles`).expect((res) => expect(res.body.length).toBe(5)));
});

describe(`API refuses to create an article if data is invalid`, () => {
  const newArticle = {
    category: [`Разное`, `За жизнь`],
    title: `Прыжок с парашютом - как это было.`,
    announce: `Я наконец решилась прыгнуть в бездну.`,
    fullText: `Восторг, эйфория - эмоции не описать словами!`
  };
  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = {...newArticle};
      delete badArticle[key];
      await request(app).post(`/articles`).send(badArticle).expect(HttpCode.BAD_REQUEST);
    }
  });
});

// PUT /api/articles/:articleId - редактирует определённую публикацию
describe(`API changes existent article`, () => {
  const newArticle = {
    category: [`Разное`, `Животные`],
    title: `Ева - британская короткошерстная кошка.`,
    announce: `Какими по характеру могут быть британцы?`,
    fullText: `Ева - кошка с мягким характером.`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).put(`/articles/pCNKeL`).send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
  test(`Article is really changed`, () => request(app).get(`/articles/pCNKeL`).expect((res) => expect(res.body.title).toBe(`Ева - британская короткошерстная кошка.`)));
});

describe(`API refuses to change existent article`, () => {
  const app = createAPI();
  const validArticle = {
    category: [`Разное`, `Животные`],
    title: `Ева - британская короткошерстная кошка.`,
    announce: `Какими по характеру могут быть британцы?`,
    fullText: `Ева - кошка с мягким характером.`
  };
  const invalidArticle = {
    title: `Ева - британская короткошерстная кошка.`,
    announce: `Какими по характеру могут быть британцы?`,
    fullText: `Ева - кошка с мягким характером.`
  };

  test(`API returns status code 404 when trying to change non-existent article`, () => request(app).put(`/articles/NOEXST`).send(validArticle).expect(HttpCode.NOT_FOUND));
  test(`API returns status code 400 when trying to change an article with invalid data`, () => request(app).put(`/articles/NOEXST`).send(invalidArticle).expect(HttpCode.BAD_REQUEST));
});

// DELETE /api/articles/:articleId - удаляет определённую публикацию
describe(`API correctly deletes an article`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/articles/pCNKeL`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns deleted article`, () => expect(response.body.id).toBe(`pCNKeL`));
  test(`Article count is 3 now`, () => request(app).get(`/articles`).expect((res) => expect(res.body.length).toBe(3)));
});

describe(`API refuses to delete an article`, () => {
  const app = createAPI();
  test(`API refuses to delete non-existent article`, () => request(app).delete(`/articles/NOEXST`).expect(HttpCode.NOT_FOUND));
});

// GET /api/articles/:articleId/comments — возвращает список комментариев определённой публикации
describe(`API returns a list of comments to given article`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles/pCNKeL/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 4 comment`, () => expect(response.body.length).toBe(4));
  test(`First comment's id is "aS2O6s"`, () => expect(response.body[0].id).toBe(`aS2O6s`));
});

// POST /api/articles/:articleId/comments — создаёт новый комментарий
describe(`API creates a comment if data is valid`, () => {
  const newComment = {
    text: `Валидному комментарию достаточно этого поля`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).post(`/articles/pCNKeL/comments`).send(newComment);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));
  test(`Comments count is changed`, () => request(app).get(`/articles/pCNKeL/comments`).expect((res) => expect(res.body.length).toBe(5)));
});

describe(`API refuses to create a comment`, () => {
  const app = createAPI();

  test(`API refuses to create a comment to non-existent article and returns status code 404`, () => request(app).post(`/articles/NOEXST/comments`).send({text: `Неважно`}).expect(HttpCode.NOT_FOUND));
  test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => request(app).post(`/articles/pCNKeL/comments`).send({}).expect(HttpCode.BAD_REQUEST));
});

// DELETE /api/articles/:articleId/comments/:commentId — удаляет из определённой публикации комментарий с идентификатором
describe(`API correctly deletes a comment`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/articles/pCNKeL/comments/aS2O6s`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns comment deleted`, () => expect(response.body.id).toBe(`aS2O6s`));
  test(`Comments count is 3 now`, () => request(app).get(`/articles/pCNKeL/comments`).expect((res) => expect(res.body.length).toBe(3)));
});

describe(`API refuses to delete a comment`, () => {
  const app = createAPI();

  test(`API refuses to delete non-existent comment`, () => request(app).delete(`/articles/pCNKeL/comments/NOEXST`).expect(HttpCode.NOT_FOUND));
  test(`API refuses to delete a comment to non-existent article`, () => request(app).delete(`/articles/NOEXST/comments/aS2O6s`).expect(HttpCode.NOT_FOUND));
});
