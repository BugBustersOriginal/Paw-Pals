const locationString = (query) => {
  let location = '';
  // let {address1, address2, city, state, country, zipcode} = query;
  let option = ['address1', 'address2', 'city', 'state', 'country', 'zipcode'];
  option.forEach((item) => {
    if (query[item]) {
      location +=query[item];
    }
  })

  return location;
};


module.exports ={locationString};