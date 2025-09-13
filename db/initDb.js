import {db} from './db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const runMigrations = ()=>{
    const migrations = fs.readFileSync(path.join(__dirname, "migrations.sql"), "utf-8");
    db.exec(migrations, (err)=>{
        if(err){
            console.error("Error running migrations:", err);
        }else{
            console.log("Migrations ran successfully.");
        }
    });
}

export const runSeeders = ()=>{
    const seeders = fs.readFileSync(path.join(__dirname, "seeders.sql"), "utf-8");
    db.exec(seeders, (err)=>{
        if(err){
            console.error("Error running seeders:", err);
        }else{
            console.log("Seeders ran successfully.");
        }
    });
}

// Run explicitly
runMigrations();
runSeeders();