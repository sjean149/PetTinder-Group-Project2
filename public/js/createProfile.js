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


  if (name && profilePicture && age && description && breed && location && interests) {

    try {
      const response = await fetch('/api/pets/createProfile', {
        method: 'POST',
        body: JSON.stringify({name, profilePicture, age, description, breed, picture1, picture2, location, interests }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(data => {
          console.log(data); // Print the response data to the console
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          alert(error);
        });

      /*
          if (response.ok) {
            document.location.replace('/');
          } else {
            alert(`Failed to create profile in: ${response.statusText}`);
          }
            */

    } catch (err) {
      console.log('Error during login:', err);
      alert('Failed to profile. Please try again later.');
    }

  }
}

  document.getElementById('profile-form').addEventListener('submit', profileFormHandler);

