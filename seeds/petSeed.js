const { Pet } = require('../models');

const petData = [
  {
    "user_id": 1,
    "name": "Koigen",
    "profilePicture": "sephora_profile.jpg",
    "age": 5,
    "description": "Friendly and playful!",
    "breed": "Labrador Retriever",
    "picture1": "sephora_pic1.jpg",
    "picture2": "sephora_pic2.jpg",
    "location": "Miami",
    "interests": "Fetch, swimming"
  },
  {
    "user_id": 2,
    "name": "Felipa",
    "profilePicture": "alex_profile.jpg",
    "age": 3,
    "description": "Loves to cuddle!",
    "breed": "Persian",
    "picture1": "alex_pic1.jpg",
    "picture2": "alex_pic2.jpg",
    "location": "Tampa",
    "interests": "Sleeping, exploring"
  },
  {
    "user_id": 3,
    "name": "Roro",
    "profilePicture": "amiko_profile.jpg",
    "age": 4,
    "description": "Curious and energetic!",
    "breed": "Shiba Inu",
    "picture1": "amiko_pic1.jpg",
    "picture2": "amiko_pic2.jpg",
    "location": "New York",
    "interests": "Running, digging"
  }
];

const seedPets = async () => await Pet.bulkCreate(petData);

module.exports = seedPets;
