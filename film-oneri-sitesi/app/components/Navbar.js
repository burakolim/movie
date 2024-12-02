'use client';

import Link from 'next/link';

const Navbar = () => {
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
        transition: 'background-color 0.3s ease', // Background değişimi
      }}
    >
      {/* Logo */}
      <h1
        style={{
          color: '#ecf0f1',
          fontSize: '2rem',
          fontWeight: 'bold',
          margin: 0,
        }}
      >
        <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          Film Öneri Sistemi
        </Link>
      </h1>

      {/* Search Bar */}
      <div
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
      </div>

      {/* Navbar Linkleri */}
      <div
        style={{
          display: 'flex',
          gap: '1.5rem',
        }}
      >
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
      </div>
    </nav>
  );
};

export default Navbar;
