import {promises as fs} from 'fs';
import path from 'path';

import client from './connection.js';


async function seedDatabase() {
    try {
        const __dirname = path.resolve();
        const schemaSQL = await fs.readFile(path.join(__dirname, './db/schema.sql'), 'utf-8');
        await client.query(schemaSQL);
        console.log('Tables createrd successfully!');

        const seedSQL = await fs.readFile(path.join(__dirname, './db/seed.sql'), 'utf-8');
        await client.query(seedSQL);
        console.log('Table seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error)
    } finally {
        process.exit();
    }
}

seedDatabase();






















// const __dirname = path.resolve();
// const schemaSQL = await fs.readFile(path.join(__dirname, './db/schema.sql'), 'utf-8');

// await client.query(schemaSQL);
// console.log('Tables createrd successfully!');

// const seedSQL = await fs.readFile(path.join(__dirname, './db/seed.sql'), 'utf-8');

// await client.query(seedSQL);
// console.log('Table seeded successfully!');

// process.exit();