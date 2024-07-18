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
    const interests = document.querySelector('#interests').value.trim();
    const socialMedia = document.querySelector('#socialMedia').value.trim();
  
    if (name && profilePic && age && description && breed && location && interests && socialMedia) {
     try{
      const response = await fetch('/api/users/profile', {
        method: 'POST',
        body: JSON.stringify({name, profilePic, age, description, breed, location, interests, socialMedia}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.alert('Pet profile created successfully');
        document.location.replace('/profile');
      } else {
        alert('Failed to create profile.');
      }
    } catch (err) {
      console.log('Error creating profile', err);
      alert('Failed to create profile. Please try again later.');
    }
  }
};
  
  
document.querySelector('#profile-form').addEventListener('submit', profileFormHandler);
  
  