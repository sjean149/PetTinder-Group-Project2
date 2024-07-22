const logout = async () => {
  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/login');
    } else {
      alert(response.statusText);
    }
  } catch (err) {
    console.error('Logout error:', err); 
    alert('Failed to logout. Please try again.'); 
  }
};

document.querySelector('#logout').addEventListener('click', logout);
