const testRegister = async () => {
  try {
    const res = await fetch('http://localhost:8080/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test User', email: 'testuser123@example.com', password: 'password123' })
    });
    console.log('Register Status:', res.status);
    console.log('Register Body:', await res.text());
  } catch(e) {
    console.error('Register Error:', e);
  }
};

testRegister();
