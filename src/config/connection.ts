import pg from 'pg';

const { Client } = pg;
const client = new Client({
  user: 'postgres',
  password: 'pass',
  database: 'employee_tracker_db'
});

await client.connect().catch(err => console.error('Connection error', err.stack));

export default client;