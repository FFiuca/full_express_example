module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});

    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['username', 'name', 'password', 'status_active', 'created_at'],
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
              bsonType: ['date', 'null'],
            }
          }
        }
      }
    })

    await db.createCollection('approval_requests', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['user', 'request_reason', 'status', 'created_at'],
          properties: {
            user: {
              bsonType: 'objectId',
            },
            request_reason: {
              bsonType: 'string',
            },
            status: {
              enum: ['pending', 'approved', 'rejected'],
            },
            created_at: {
              bsonType: 'date',
            },
            updated_at: {
              bsonType: ['date', 'null'],
            }
          }
        }
      }
    })

  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});

    await db.collection('users').drop()
    await db.collection('approval_requests').drop()
  }
};
