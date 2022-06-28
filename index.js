const app = require('./src')

const sequelize = require('./src/database/sequelize')

require('dotenv').config();

require('./src/database/associations');

const port = process.env.PORT || 3000

app.listen(port, function (err) {
  if (err) {
    throw err
  }
  console.log(`server is listening on ${port}...`)
  // Comente para que no se ejecute cuando grabo
  sequelize.sync({ force: false }).then(() => {
    console.log("nos contectamos exitosamente a DB");
}).catch(error => {
    console.log('Algo paso', error);
});

})