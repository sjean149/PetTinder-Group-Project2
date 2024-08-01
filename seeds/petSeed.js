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
  },
  {
    "user_id": 4,
    "name": "Draco",
    "profilePicture": "Draco1.jpg",
    "age": 5,
    "description": "Loud and Hungry!",
    "breed": "Beauceron",
    "picture1": "Draco2.jpg",
    "picture2": "Draco3.jpg",
    "location": "California",
    "interests": "Chewing trees, walks"
  },
  {
    "user_id": 5,
    "name": "Misa",
    "profilePicture": "Misa1.jpg",
    "age": 3,
    "description": "Mischievous and shy!",
    "breed": "Pomsky",
    "picture1": "Misa2.jpg",
    "picture2": "Misa3.jpg",
    "location": "Fort Myers",
    "interests": "Playing ball, sleeping"
  },
  {
    "user_id": 6,
    "name": "Kiwi",
    "profilePicture": "Kiwi1.jpg",
    "age": 4,
    "description": "Evil and clingy",
    "breed": "Maine Coon",
    "picture1": "Kiwi2.jpg",
    "picture2": "Kiwi3.jpg",
    "location": "Fort Myers",
    "interests": "Destroying couches, baking biscuits"
  },
  {
    "user_id": 7,
    "name": "Alice",
    "profilePicture": "Alice1.jpg",
    "age": 3,
    "description": "Skittish and warmth-seeking",
    "breed": "Big Black Cat",
    "picture1": "Kiwi2.jpg",
    "picture2": "Kiwi3.jpg",
    "location": "Fort Myers",
    "interests": "Destroying couches, baking biscuits"
  }
];

const seedPets = async () => await Pet.bulkCreate(petData);

module.exports = seedPets;
