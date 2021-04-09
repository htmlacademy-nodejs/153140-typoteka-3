'use strict';

const express = require(`express`);
const request = require(`supertest`);
const categories = require(`./categories`);
const DataService = require(`../data-service/categories`);
const {HttpCode} = require(`../../constants`);

const mockData = [{"id": `fxEvVr`, "title": `Лучшие рок-музыканты 20-века`, "createdDate": `2021-01-09 14:27:55`, "announce": `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Как начать действовать? Для начала просто соберитесь. Из под его пера вышло 8 платиновых альбомов. Первая большая ёлка была установлена только в 1938 году.`, "fullText": `Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Он написал больше 30 хитов. Золотое сечение — соотношение двух величин, гармоническая пропорция.`, "category": [`Железо`, `Разное`, `Музыка`, `Без рамки`, `Деревья`, `Кино`, `Животные`], "comments": [{"id": `k18qq6`, "text": `Совсем немного... Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`}, {"id": `9eTR3w`, "text": `Хочу такую же футболку :-) Это где ж такие красоты? Планируете записать видосик на эту тему?`}, {"id": `MddvCY`, "text": `Согласен с автором!`}, {"id": `YAQtw2`, "text": `Хочу такую же футболку :-) Плюсую, но слишком много буквы!`}]}, {"id": `iQmWrI`, "title": `Как начать программировать`, "createdDate": `2021-01-09 14:27:55`, "announce": `Он написал больше 30 хитов. Vue, React или Angular? Выбор за вами. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`, "fullText": `Ёлки — это не просто красивое дерево. Это прочная древесина. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Достичь успеха помогут ежедневные повторения.`, "category": [`Кино`, `Деревья`, `IT`, `За жизнь`, `Музыка`], "comments": [{"id": `nrjuWG`, "text": `Мне кажется или я уже читал это где-то? Хочу такую же футболку :-)`}, {"id": `kfnMxE`, "text": `Согласен с автором!`}]}, {"id": `9xDq8M`, "title": `Что такое золотое сечение`, "createdDate": `2021-01-09 14:27:55`, "announce": `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Это один из лучших рок-музыкантов. Из под его пера вышло 8 платиновых альбомов.`, "fullText": `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Простые ежедневные упражнения помогут достичь успеха. Кошка — самое грациозное животное в мире. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Первая большая ёлка была установлена только в 1938 году. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Как начать действовать? Для начала просто соберитесь. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`, "category": [`Железо`, `Без рамки`, `Кино`, `Музыка`, `Программирование`, `Животные`, `IT`, `За жизнь`], "comments": [{"id": `yFCLKG`, "text": `Это где ж такие красоты?`}, {"id": `-SeDu_`, "text": `Хочу такую же футболку :-) Плюсую, но слишком много буквы! Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`}, {"id": `NVj5ID`, "text": `Планируете записать видосик на эту тему? Совсем немного...`}, {"id": `0hhuRy`, "text": `Совсем немного...`}]}];

const app = express();
app.use(express.json());
categories(app, new DataService(mockData));

// GET /api/categories — возвращает список категорий
describe(`API returns category list`, () => {
  let response;
  beforeAll(async () => {
    response = await request(app).get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 10 categories`, () => expect(response.body.length).toBe(10));
  test(`Category names are "Железо", "Разное", "Музыка", "Без рамки", "Деревья", "Кино", "Животные", "IT", "За жизнь", "Программирование"`, () => expect(response.body).toEqual(expect.arrayContaining([`Железо`, `Разное`, `Музыка`, `Без рамки`, `Деревья`, `Кино`, `Животные`, `IT`, `За жизнь`, `Программирование`])));
});