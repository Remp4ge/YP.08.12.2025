
-- 1. Таблица меню
CREATE TABLE menu (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    calories INTEGER,
    image_url VARCHAR(200)
);

-- 2. Таблица галереи
CREATE TABLE gallery (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    image_url VARCHAR(200) NOT NULL
);

-- 3. Таблица событий
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    date VARCHAR(50)
);

-- 4. Таблица пользователей
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'guest'
);

-- 5. Добавляем тестовые данные в меню
INSERT INTO menu (name, description, price, calories, image_url) VALUES
('Бургер "Деликатес"', 'Сочная говяжья котлета, сыр чеддер, свежие овощи', 450, 650, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600'),
('Салат "Цезарь"', 'Куриное филе, салат айсберг, пармезан, гренки', 320, 280, 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600'),
('Тирамису', 'Классический итальянский десерт с кофе', 280, 420, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600'),
('Латте арт', 'Кофе с молоком и рисунком на пенке', 220, 180, 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600');

-- 6. Добавляем галерею
INSERT INTO gallery (title, image_url) VALUES
('Интерьер кофейни', 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8'),
('Наш кофе', 'https://images.unsplash.com/photo-1498804103079-a6351b050096'),
('Уютная атмосфера', 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb');

-- 7. Добавляем события
INSERT INTO events (title, description, date) VALUES
('Новое летнее меню', 'Добавили освежающие коктейли и салаты', '15 мая 2025'),
('Счастливые часы', 'Скидка 20% с 15:00 до 18:00', 'Ежедневно'),
('Вечеринка 5 лет', 'Живая музыка и дегустация блюд', '30 мая 2025');

-- 8. Добавляем пользователей
INSERT INTO users (username, password, role) VALUES
('admin', 'admin123', 'admin'),
('manager', 'manager123', 'manager'),
('guest', 'guest123', 'guest');

-- 9. Проверяем, что всё добавилось
SELECT 'Меню:' as table_name, COUNT(*) as count FROM menu
UNION ALL
SELECT 'Галерея:', COUNT(*) FROM gallery
UNION ALL
SELECT 'События:', COUNT(*) FROM events
UNION ALL
SELECT 'Пользователи:', COUNT(*) FROM users;