require('dotenv').config();
const axios = require('axios')
const getRandomPhoto = (req, res) => {
  const query = Math.random() < 0.5 ? 'cats' : 'dogs';
  const accessKey = process.env.AccessKey;

  axios.get(`https://api.unsplash.com/photos/random?query=${query}`, {
  headers: {
    Authorization: `Client-ID ${accessKey}`
  }
})
  .then(response => {
    const photoUrl = response.data.urls.regular;
    res.status(200).send(photoUrl);
  })
  .catch(error => {
    //console.log(error);
    res.send('')
  });

}

module.exports = {getRandomPhoto};