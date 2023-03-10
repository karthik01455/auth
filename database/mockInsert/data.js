const {Users,Products,Carts} = require('../models');

// Users.create({
//   userName: 'JohnDoe',
//   emailId: 'johndoe@example.com',
//   phoneNumber: '1234567890',
//   address: '123 Main Street, Anytown USA',
//   password:'qwerty'
// }).then(newUser => {
//   console.log('New user created:', newUser);
// }).catch(error => {
//   console.error('Error creating user:', error);
// });
// Products.create({
//   productId:'1',
//   productName:'Soap',
//   price:12
// }).then(newUser => {
//   console.log('New user created:', newUser);
// }).catch(error => {
//   console.error('Error creating user:', error);
// });
Carts.create({
  productId:'1',
  userId:1,
  count:1
}).then(newUser => {
  console.log('New user created:', newUser);
}).catch(error => {
  console.error('Error creating user:', error);
});
