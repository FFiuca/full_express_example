module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});

    await db.collection('users',{
      collMod: 'users',
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: [
            'username',
            'name',
            'password',
            'status_active',
            'created_at',
          ],
          properties: {
            username: {
              bsonType: 'string',
            },
            name: {
              bsonType: 'string',
            },
            password: {
              bsonType: 'string',
            },
            status_active: {
              bsonType: 'bool',
            },
            created_at: {
              bsonType: 'date',
            },
            updated_at: {
              bsonType: 'date',
            },
            deleted_at: {
              bsonType: ['date', 'null'], // Allow date or null
            },
          },
        },
      },
    });

  },

  async down(db, client) {
    await db.collection('users',{
      collMod: 'users',
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: [
            'username',
            'name',
            'password',
            'status_active',
            'created_at',
            'updated_at',
          ],
          properties: {
            username: {
              bsonType: 'string',
            },
            name: {
              bsonType: 'string',
            },
            password: {
              bsonType: 'string',
            },
            status_active: {
              bsonType: 'bool',
            },
            created_at: {
              bsonType: 'date',
            },
            updated_at: {
              bsonType: 'date',
            },
            deleted_at: {
              bsonType: 'date'
            },
          },
        },
      },
    });

  }
};
