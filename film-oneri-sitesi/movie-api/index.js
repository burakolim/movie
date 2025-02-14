const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();

// CORS ayarları
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
const port = 5000;

// MySQL bağlantısı
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Veritabanı bağlantısını kontrol et
connection.connect((err) => {
  if (err) {
    console.error('MySQL bağlantı hatası:', err.stack);
    return;
  }
  console.log('MySQL veritabanına bağlanıldı');
});

// Tüm filmleri getir
app.get('/movies', (req, res) => {
  const query = 'SELECT * FROM films_posters';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Film getirme hatası:', err);
      return res.status(500).json({ error: 'Veritabanı hatası' });
    }
    console.log(`${results.length} film bulundu`);
    res.json(results);
  });
});

// Belirli bir filmi getir
app.get('/movies/:id', (req, res) => {
  const movieId = req.params.id;
  const query = 'SELECT * FROM films_posters WHERE movieId = ?';
  
  connection.query(query, [movieId], (err, results) => {
    if (err) {
      console.error('Film detay hatası:', err);
      return res.status(500).json({ error: 'Veritabanı hatası' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Film bulunamadı' });
    }
    res.json(results[0]);
  });
});

// Film ara
app.get('/search', (req, res) => {
  const searchQuery = req.query.q;
  const query = 'SELECT * FROM films_posters WHERE title LIKE ? OR description LIKE ?';
  const searchTerm = `%${searchQuery}%`;
  
  connection.query(query, [searchTerm, searchTerm], (err, results) => {
    if (err) {
      console.error('Arama hatası:', err);
      return res.status(500).json({ error: 'Veritabanı hatası' });
    }
    res.json(results);
  });
});

// Kullanıcı girişi
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Giriş denemesi:', { username });

  const query = 'SELECT * FROM users WHERE username = ?';
  connection.query(query, [username], async (err, results) => {
    if (err) {
      console.error('Veritabanı hatası:', err);
      return res.status(500).json({ error: 'Veritabanı hatası' });
    }

    if (results.length === 0) {
      console.log('Kullanıcı bulunamadı:', username);
      return res.status(401).json({ error: 'Kullanıcı adı veya şifre hatalı' });
    }

    const user = results[0];
    
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        console.log('Şifre hatalı:', username);
        return res.status(401).json({ error: 'Kullanıcı adı veya şifre hatalı' });
      }

      console.log('Giriş başarılı:', username);
      res.json({ 
        message: 'Giriş başarılı', 
        username: user.username 
      });
    } catch (error) {
      console.error('Şifre karşılaştırma hatası:', error);
      res.status(500).json({ error: 'Giriş işlemi başarısız' });
    }
  });
});

// Favorilere ekle
app.post('/favorites', (req, res) => {
  const { username, movieId } = req.body;
  const query = 'INSERT INTO favorites (username, movieId) VALUES (?, ?)';
  
  connection.query(query, [username, movieId], (err) => {
    if (err) {
      console.error('Favori ekleme hatası:', err);
      return res.status(500).json({ error: 'Favori eklenemedi' });
    }
    res.status(201).json({ message: 'Favorilere eklendi' });
  });
});

// Favorilerden çıkar
app.delete('/favorites', (req, res) => {
  const { username, movieId } = req.body;
  const query = 'DELETE FROM favorites WHERE username = ? AND movieId = ?';
  
  connection.query(query, [username, movieId], (err) => {
    if (err) {
      console.error('Favori silme hatası:', err);
      return res.status(500).json({ error: 'Favori silinemedi' });
    }
    res.json({ message: 'Favorilerden çıkarıldı' });
  });
});

// Favori kontrolü
app.post('/favorites/check', (req, res) => {
  const { username, movieId } = req.body;
  const query = 'SELECT * FROM favorites WHERE username = ? AND movieId = ?';
  
  connection.query(query, [username, movieId], (err, results) => {
    if (err) {
      console.error('Favori kontrol hatası:', err);
      return res.status(500).json({ error: 'Favori kontrol hatası' });
    }
    res.json({ isFavorite: results.length > 0 });
  });
});

// Kullanıcı kaydı
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const [existingUsers] = await connection.promise().query(
      'SELECT * FROM users WHERE username = ?', 
      [username]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Bu kullanıcı adı zaten kullanımda' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.promise().query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );

    res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi' });
  } catch (error) {
    console.error('Kayıt hatası:', error);
    res.status(500).json({ error: 'Kayıt işlemi başarısız' });
  }
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${port}`);
});