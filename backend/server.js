const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Настройка подключения к PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'coffee_shop',
    password: '123', // Поменяйте на ваш пароль
    port: 5432,
});

// Middleware
app.use(cors());
app.use(express.json());

// Проверка подключения к базе
pool.connect((err, client, release) => {
    if (err) {
        console.error('Ошибка подключения к PostgreSQL:', err);
    } else {
        console.log('Подключено к PostgreSQL!');
        release();
    }
});

// ========== API ДЛЯ МЕНЮ ==========

// Получить всё меню
app.get('/api/menu', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM menu ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Добавить блюдо
app.post('/api/menu', async (req, res) => {
    const { name, description, price, calories } = req.body;
    
    try {
        const result = await pool.query(
            'INSERT INTO menu (name, description, price, calories) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, price, calories]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при добавлении' });
    }
});

// Удалить блюдо
app.delete('/api/menu/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM menu WHERE id = $1', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при удалении' });
    }
});

// ========== API ДЛЯ СОБЫТИЙ ==========

// Получить все события
app.get('/api/events', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM events ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Добавить событие
app.post('/api/events', async (req, res) => {
    const { title, description } = req.body;
    
    try {
        const result = await pool.query(
            'INSERT INTO events (title, description, date) VALUES ($1, $2, $3) RETURNING *',
            [title, description, new Date().toLocaleDateString('ru-RU')]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при добавлении' });
    }
});

// ========== API ДЛЯ ГАЛЕРЕИ ==========

// Получить галерею
app.get('/api/gallery', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM gallery');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// ========== АУТЕНТИФИКАЦИЯ ==========

// Вход пользователя
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE username = $1 AND password = $2',
            [username, password]
        );
        
        if (result.rows.length > 0) {
            const user = result.rows[0];
            // Не храним пароль в ответе
            delete user.password;
            res.json({ success: true, user });
        } else {
            res.json({ success: false, message: 'Неверный логин или пароль' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
});