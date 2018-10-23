const { fetchSchema } = require('react-releasy');

fetchSchema({
  url: 'https://swapi-releasy.herokuapp.com',
  dir: './data',
}).then(() => {
  console.log('✅ Schema downloaded');
  process.exit();
});
