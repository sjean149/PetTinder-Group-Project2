const profileFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name').value.trim();
    const profilePic = document.querySelector('#profile-picture').value.trim();
    const age = document.querySelector('#age').value.trim();
    const description = document.querySelector('#description').value.trim();
    const breed = document.querySelector('#breed').value.trim();
    const picture1 = document.querySelector('#picture1').value.trim();
    const picture2 = document.querySelector('#picture2').value.trim();
    const interests = document.querySelector('#interests').value.trim();
    const socialMedia = document.querySelector('#socialMedia').value.trim();
  
    const getLocation = () => {
      return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              resolve({ latitude, longitude });
            },
            (error) => {
              console.error('Error getting location:', error);
              reject('Failed to fetch location. Please enter manually.');
            }
          );
        } else {
          reject('Geolocation is not supported by this browser. Please enter location manually.');
        }
      });
    };
  
    // Submit form after getting location.
    try {
      const { latitude, longitude } = await getLocation();
      const location = `${latitude},${longitude}`;
  
      
      const response = await fetch('/api/users/profile', {
        method: 'POST',
        body: JSON.stringify({ name, profilePic, age, description, breed, picture1, picture2, location, interests, socialMedia }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        alert('Pet profile created successfully');
        document.location.replace('/profile');
      } else {
        alert('Failed to create profile.');
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Failed to create profile. Please try again later.');
    }
  };
  
  document.querySelector('#profile-form').addEventListener('submit', profileFormHandler);
  