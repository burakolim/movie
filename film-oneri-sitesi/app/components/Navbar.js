'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Component mount olduğunda ve her render'da localStorage'ı kontrol et
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []); // Boş dependency array ile sadece component mount olduğunda çalışır

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      alert('Lütfen bir arama terimi girin.');
      return;
    }
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleLogoClick = () => {
    if (onSearch) {
      onSearch('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername('');
    window.location.href = '/';
  };

  return (
    <nav
      style={{
        backgroundColor: '#2c3e50',
        padding: '1rem 2rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'background-color 0.3s ease',
        width: '100%',
      }}
    >
      <h1
        style={{
          color: '#ecf0f1',
          fontSize: '2rem',
          fontWeight: 'bold',
          margin: 0,
        }}
      >
        <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }} onClick={handleLogoClick}>
          Film Öneri Sistemi
        </Link>
      </h1>

      <form
        onSubmit={handleSearch}
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 2rem',
        }}
      >
        <input
          type="text"
          placeholder="Film ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '60%',
            padding: '0.5rem 1rem',
            border: '1px solid #bdc3c7',
            borderRadius: '30px',
            outline: 'none',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
          }}
          onFocus={(e) => (e.target.style.border = '1px solid #3498db')}
          onBlur={(e) => (e.target.style.border = '1px solid #bdc3c7')}
        />
        <button
          type="submit"
          style={{
            marginLeft: '10px',
            padding: '0.5rem 1rem',
            backgroundColor: '#3498db',
            color: '#ecf0f1',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Ara
        </button>
      </form>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {username ? (
          <>
            <div style={{
              color: '#ecf0f1',
              backgroundColor: '#3498db',
              padding: '0.5rem 1rem',
              borderRadius: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '1.2rem' }}>👤</span>
              <span>{username}</span>
            </div>
            <button
              onClick={handleLogout}
              style={{
                color: '#2c3e50',
                fontSize: '1rem',
                fontWeight: '500',
                padding: '0.5rem 1.5rem',
                borderRadius: '30px',
                backgroundColor: '#ecf0f1',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#bdc3c7')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#ecf0f1')}
            >
              Çıkış Yap
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              style={{
                color: '#ecf0f1',
                fontSize: '1rem',
                fontWeight: '500',
                textDecoration: 'none',
                padding: '0.5rem 1.5rem',
                borderRadius: '30px',
                backgroundColor: '#3498db',
                boxShadow: '0 4px 8px rgba(52, 152, 219, 0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#2980b9')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#3498db')}
            >
              Giriş Yap
            </Link>
            <Link
              href="/signup"
              style={{
                color: '#2c3e50',
                fontSize: '1rem',
                fontWeight: '500',
                textDecoration: 'none',
                padding: '0.5rem 1.5rem',
                borderRadius: '30px',
                backgroundColor: '#ecf0f1',
                boxShadow: '0 4px 8px rgba(236, 240, 241, 0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#bdc3c7')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#ecf0f1')}
            >
              Kaydol
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;