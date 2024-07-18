const profileFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name').value.trim();
    const profilePic = document.querySelector('#profile-picture').value.trim();
    const age = document.querySelector('#age').value.trim();
    const description = document.querySelector('#description').value.trim();
    const breed = document.querySelector('#breed').value.trim();
    const picture1 = document.querySelector('#picture1').value.trim();
    const picture2 = document.querySelector('#picture2').value.trim();
    const location = document.querySelector('#location').value.trim();
    const interests = document.querySelector('#iinterests').value.trim();

  
    if (name && profilePic && age && description && breed && location && interests) {
      const response = await fetch('/api/users/profile', {
        method: 'POST',
        body: JSON.stringify({name, profilePic, age, description, breed, location, interests}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    }
  };
  
  
  document
    .querySelector('#profile-form')
    .addEventListener('submit', profileFormHandler);
  
  