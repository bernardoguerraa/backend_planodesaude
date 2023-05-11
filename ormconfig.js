const DATABASE_URL = `postgres://postgres:${process.env.PSQL_PASSWORD}@${
  process.env.PSQL_HOST
}:${Number(process.env.PSQL_PORT)}/${process.env.PSQL_DB}`;

module.exports = [
  {
    name: 'default',
    type: 'postgres',
    url: process.env.DATABASE_URL || DATABASE_URL,
    logging: false,
    entities: [
      process.env.TYPEORM_ENTITIES,
    ],
    migrations: [
      process.env.TYPEORM_MIGRATIONS,
    ],
    cli: {
      entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
      migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
    },
  },
];
