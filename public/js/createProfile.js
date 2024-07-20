let activePicture;

const myWidget = cloudinary.createUploadWidget({
  cloudName: 'dy9arp5xw',
  uploadPreset: 'pet_tinder'
}, (error, result) => {
  if (!error && result && result.event === "success") {
    imagePath = result.info.url;
    public_id = result.info.public_id;

    document.getElementById(activePicture).value = imagePath;

  } else if (error) {
    console.error('Upload Error:', error);
  }

});


document.getElementById("profile-picture").addEventListener("click", ()=>{
  activePicture = "profile-picture";
  myWidget.open();
}, false);
document.getElementById("picture1").addEventListener("click", ()=>{
  activePicture = "picture1";
  myWidget.open();
}, false);
document.getElementById("picture2").addEventListener("click", ()=>{
  activePicture = "picture2";
  myWidget.open();
}, false);



const profileFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const profilePicture = document.getElementById('profile-picture').value.trim();

  const age = document.querySelector('#age').value.trim();
  const description = document.querySelector('#description').value.trim();
  const breed = document.querySelector('#breed').value.trim();
  const picture1 = document.querySelector('#picture1').value.trim();
  const picture2 = document.querySelector('#picture2').value.trim();
  const location = document.querySelector('#location').value.trim();
  const interests = document.querySelector('#interests').value.trim();
  const socialMedia = document.getElementById('social-media').value.trim();

  

  if (name && profilePicture && age && description && breed && location && interests && socialMedia) {
    try {
      const response = await fetch('/api/pets/createProfile', {
        method: 'POST',
        body: JSON.stringify({
          name,
          profilePicture,
          age,
          description,
          breed,
          picture1,
          picture2,
          location,
          interests,
          socialMedia
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const petData = await response.json();
        alert(`${petData.name} created successfully. It is such a cute ${petData.breed}!`);
        document.location.replace('/dashboard');
      } else {
        const errorData = await response.json();
        alert(`Failed to create profile: ${errorData.message || response.statusText}`);
      }
    } catch (err) {
      console.error('Error during profile creation:', err);
      alert('Failed to create profile. Please try again later.');
    }
  } else {
    alert('Please fill out all required fields.');
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    try {
      const response = await fetch(`/profile/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete pet');
      }
    } catch (err) {
      console.error('Error deleting pet:', err);
      alert('An error occurred while deleting the pet');
    }
  }
};

document.querySelectorAll('.button.is-pulled-right').forEach(button => {
  button.addEventListener('click', delButtonHandler);
});

  document.getElementById('profile-form').addEventListener('submit', profileFormHandler);

