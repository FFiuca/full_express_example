// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../app');
// const mongoose = require('mongoose');

// const migrateMongo = require('migrate-mongo');
// const config = require('../migrate-mongo-config-test');

// const expect = chai.expect;
// chai.use(chaiHttp);

// // Run migrations before all tests
// before(async function() {
//     await migrateMongo.config.set(config);  // Set test config

//     // Rollback (down) all migrations
//     const migratedDown = await migrateMongo.down();
//     console.log(`Rolled back ${migratedDown.length} migrations`);

//     // Reapply (up) all migrations
//     const migratedUp = await migrateMongo.up();
//     console.log(`Applied ${migratedUp.length} migrations`);
// });

// // Close the Mongoose connection after all tests
// after(async () => {
//     await mongoose.connection.close();
// });

// module.exports = {
//     app,
//     chai,
// }
