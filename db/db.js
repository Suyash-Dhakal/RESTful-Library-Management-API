import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(__dirname, "library.db");

const db = new sqlite3.Database(DB_PATH);

// Initialize the database if it doesn't exist

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
