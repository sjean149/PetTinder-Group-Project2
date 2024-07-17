var myWidget = cloudinary.createUploadWidget({
  cloudName: 'dy9arp5xw',
  uploadPreset: 'pet_tinder'
}, (error, result) => {
  if (!error && result && result.event === "success") {
    imagePath = result.info.url;
    public_id = result.info.public_id;

    
    uploadImage(result.info.url, result.info.public_id);
  } else if (error) {
    console.error('Upload Error:', error);
  }

});

function uploadImage(imagePath, publicId) {
  document.getElementById('profile').src = imagePath;

  console.log(imagePath, publicId)
}

document.getElementById("profile-picture").addEventListener("click", myWidget.open, false);