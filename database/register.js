const db = require('./index.js');

 (async () => {
  let client = await db.connect();
  const sampleData = [
    {
    id: 'a1495dd3-8e1f-472c-951e-33ea86263c00',
    firstname: 'debra',
    lastname: 'debra',
    username: 'debra',
    password: '178878971341891645d4ade77cb91f821d7f733364aeada15e9bea420f985a79',
    salt: '79f9b3f1ad43fb8599a730fbec98c60a40e43aa37d61c7cb5ca0fe73e28f4af0',
    gmail: 'debrazhang09@gmail.com',
    create_at: '2023-03-23 17:23:27.288938',
    avatar_url: 'https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MjYyNTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk2MTczODY&ixlib=rb-4.0.3&q=80&w=1080',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: 'US',
    zipcode: '94538'
   },
   {
    id: 'd41aff47-e0e0-488d-8bf8-3f362addd53b',
    firstname: 'michaelangelo',
    lastname: 'michaelangeloa',
    username: 'michaelangelo',
    password: '58a9bd89ba4173b7e27a5ec573dab82b66d02d2a20b1bb02147069f10820b610',
    salt: 'bbf37700856d99e182dc4b517b4fef0448d2d99b41ea9339eea2026ded438e2c',
    gmail: 'michaelangelobellinghausen@gmail.com',
    create_at: '2023-03-23 17:25:42.575994',
    avatar_url: 'https://images.unsplash.com/photo-1602924097911-a78ca1af38c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MjYyNTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk2MTc0MzI&ixlib=rb-4.0.3&q=80&w=1080',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: 'US',
    zipcode: '75001'
   },
   {
    id: '8b599a82-8759-4435-a001-e3d67da41627',
    firstname: 'maryann',
    lastname: 'maryann',
    username: 'maryann',
    password: 'cdb2dd3617807ca1a875bc1c1ede873fce9cf2e50ec98cf50820657c154c6f77',
    salt: '826385f61792aec6d83127af7c4280917991cd0f069a51f59a5f8959e7333724',
    gmail: 'bluechocolate2019@gmail.com',
    create_at: '2023-03-23 17:27:15.132729',
    avatar_url:'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MjYyNTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk2MTc1NDY&ixlib=rb-4.0.3&q=80&w=1080',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: 'US',
    zipcode: '90001'
   },
   {
    id: '98370eb0-5335-46ef-8902-c622199723c4',
    firstname: 'tony',
    lastname: 'tony',
    username: 'tony',
    password: 'ec590b4b1d73cf18918499b3c9560b24f30caa774e96f8a21b5bef2bdfb5324c',
    salt: '68bccc7050e0cc2d9212e2c871d08055d7159345bd607c9794e3a9999f0cfd63',
    gmail: 'vo.tony12@gmail.com',
    create_at: '2023-03-23 17:30:48.568261',
    avatar_url:'https://images.unsplash.com/photo-1560807707-8cc77767d783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MjYyNTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk2MTc2Mzg&ixlib=rb-4.0.3&q=80&w=1080',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: 'US',
    zipcode: '80020'
   },
   {
    id: '5bcab1fb-de8e-406f-a070-e51d7231d5b5',
    firstname: 'andy',
    lastname: 'andy',
    username: 'andy',
    password: 'eb305c5b29fc98dbf9f40ebdc9d5ea167dd653774809eded4828b69cf8aff0f2',
    salt: '4221d53f63c2679085c51a53d3e53bef531e5c726de94c62d053e3e51e55f0d4',
    gmail: 'andyderkaema@gmail.com',
    create_at: '2023-03-23 17:33:29.7741',
    avatar_url:'https://images.unsplash.com/photo-1617696448256-e92b5761bea3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MjYyNTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk2MTc5NDE&ixlib=rb-4.0.3&q=80&w=1080',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: 'US',
    zipcode: '94088'
   },
   {
    id: 'e902241f-45a1-43b3-ba4c-3ee8fd740153',
    firstname: 'thomas',
    lastname: 'thomas',
    username: 'thomas',
    password: 'd66c296c37ddb6d3f1f545b4ba9e080e15a1b5a28e15ad0de397f87967f02cc8',
    salt: '386298a1bd3bcdd3d9378e9ed44fa2fc53f7312eef6be673853464e4df5aeca0',
    gmail: 'thomascvan11@gmail.com',
    create_at: '2023-03-23 17:34:51.984029',
    avatar_url:'https://images.unsplash.com/photo-1579683571996-f3482b0907c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MjYyNTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk2MTgwMTU&ixlib=rb-4.0.3&q=80&w=1080',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: 'US',
    zipcode: '75001'
   },
   {
    id: 'e1f4ab9d-d26e-412b-ab86-0e681a4a462f',
    firstname: 'yaser',
    lastname: 'yaser',
    username: 'yaser',
    password: 'f91afd92a8bc905178bddb98a12e775970df17fc9d3304bdeaf9c0e2717c0ef0',
    salt: '6c7e4528a58aaf887ef057bf03cea05f804e3ce83a36e1cddf42c6bf4fc19c78',
    gmail: 'yasermeisa@gmail.com',
    create_at: '2023-03-23 17:38:46.542858',
    avatar_url:'https://images.unsplash.com/photo-1574158622682-e40e69881006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MjYyNTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk2MTgyOTM&ixlib=rb-4.0.3&q=80&w=1080',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: 'US',
    zipcode: '07002'
   }
  ];
  const insertQuery = 'INSERT INTO users(id, firstname, lastname, username, password, salt, gmail,create_at, avatar_url, address1, address2, city, state, country, zipcode) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)';

  sampleData.forEach((data) => {
    const values = [data.id, data.firstname, data.lastname, data.username, data.password, data.salt, data.gmail, data.create_at, data.avatar_url, data.address1, data.address2, data.city, data.state, data.country, data.zipcode];
    client.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Inserted data: ${data.username}`);
      }
    });
  });

  await db.end();

})()

