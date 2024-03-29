INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
('ivanov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Иван', 'Иванов', 'avatar1.jpg'),
('popova@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Елена', 'Попова', 'avatar2.jpg'),
('petrov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Петр', 'Петров', 'avatar3.jpg');

INSERT INTO categories(name) VALUES
('Деревья'),
('За жизнь'),
('Разное'),
('IT'),
('Музыка'),
('Кино'),
('Программирование'),
('Железо'),
('Животные'),
('Без рамки');

ALTER TABLE articles DISABLE TRIGGER ALL;
INSERT INTO articles(title, announce, fullText, picture, createdDate, user_id) VALUES
('Все о британской короткошерстной породе кошек', 'Достичь успеха помогут ежедневные повторения. Собрать камни бесконечности легко, если вы прирожденный герой.', 'Это один из лучших рок-музыкантов. Программировать не настолько сложно, как об этом говорят. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Ёлки — это не просто красивое дерево. Это прочная древесина. Из под его пера вышло 8 платиновых альбомов. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Простые ежедневные упражнения помогут достичь успеха. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Первая большая ёлка была установлена только в 1938 году. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.', 'image1.jpg', 1636451400, 1),
('Как собрать камни бесконечности', 'Vue, React или Angular? Выбор за вами.', 'Собрать камни бесконечности легко, если вы прирожденный герой. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.', 'image2.jpg', 1636454400, 2),
('Борьба с прокрастинацией', 'Программировать не настолько сложно, как об этом говорят.', 'Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Золотое сечение — соотношение двух величин, гармоническая пропорция.', 'image3.jpg', 1636794000, 3),
('Рок — это протест', 'Ёлки — это не просто красивое дерево. Это прочная древесина.', 'Достичь успеха помогут ежедневные повторения. Он написал больше 30 хитов. Из под его пера вышло 8 платиновых альбомов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.', 'image4.jpg', 1636325100, 1);
ALTER TABLE articles ENABLE TRIGGER ALL;

ALTER TABLE article_categories DISABLE TRIGGER ALL;
INSERT INTO article_categories(article_id, category_id) VALUES
(1, 9),
(1, 2),
(2, 6),
(2, 10),
(3, 4),
(3, 7),
(4, 1),
(4, 5),
(4, 10);
ALTER TABLE article_categories ENABLE TRIGGER ALL;

ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO COMMENTS(text, createdDate, article_id, user_id) VALUES
('Согласен с автором!', 1636331400, 1, 2),
('Плюсую, но слишком много букв!', 1636333200, 1, 3),
('Мне кажется или я уже читал это где-то?', 1636333200, 1, 1),
('Хочу такую же футболку :-)', 1636336800, 2, 1),
('Это где ж такие красоты?', 1636336800, 2, 3),
('Планируете записать видосик на эту тему?', 1636341000, 3, 2),
('Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.', 1636343400, 3, 1),
('Совсем немного...', 1636350000, 3, 2),
('Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.', 1636352700, 4, 3),
('Планируете записать видосик на эту тему?', 1636354800, 4, 2);
ALTER TABLE comments ENABLE TRIGGER ALL;
