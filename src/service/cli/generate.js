'use strict';

const fs = require(`fs`);
const {getRandomInt, shuffle} = require(`../../utils`);
const {ExitCode} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`
];

const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];

const subtractDays = (date, days) => {
  const newDate = date.setDate(date.getDate() - days);
  return (new Date(newDate).toISOString()).split('.')[0].split('T').join(' ');
}

const generateMocks = (count) => (
  new Array(count).fill({}).map(() => {
    const announce = shuffle(SENTENCES).slice(0, getRandomInt(1, 5));
    const fullText = shuffle(SENTENCES.filter(item => (!announce.includes(item)) ? item : false));
    return {
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
      createdDate: subtractDays(new Date(), 90),
      announce: announce.join(` `),
      fullText: fullText.slice(0, getRandomInt(1, fullText.length)).join(` `),
      сategory: shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length))
    }
  })
);

module.exports = {
  name: `--generate`,
  description: `формирует файл mocks.json`,
  run(args) {
    const [count] = args;
    const countMocks = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countMocks > MAX_COUNT) {
      console.error(`Не больше ${MAX_COUNT} объявлений`);
      process.exit(ExitCode.error);
    }
    const content = JSON.stringify(generateMocks(countMocks));
    fs.writeFile(FILE_NAME, content, (err) => { //  The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView
      if (err) {
        console.error(`Can't write data to file...`);
        process.exit(ExitCode.error);
      }

      console.info(`Operation success. File created.`);
      process.exit(ExitCode.success);
    });
  }
};
