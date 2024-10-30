// app/api/new_user/route.js

import { NextResponse } from 'next/server';
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri || !dbName) {
  throw new Error('Please define the MONGODB_URI and MONGODB_DB environment variables inside .env.local');
}

let client;
let clientPromise;

// נבדוק אם החיבור כבר קיים
if (!client) {
  client = new MongoClient(uri); // ללא האופציות המיושנות
  clientPromise = client.connect();
}

export async function GET(req) {
  try {
    // חיבור ל-MongoDB באמצעות clientPromise
    const client = await clientPromise;
    const db = client.db(dbName); // גישה לבסיס הנתונים לפי שם

    // גישה לאוסף המסוים
    const availablesTorCollection = db.collection('Available_tor');

    // מחזיר את כל המשתמשים
    const users = await availablesTorCollection.find().toArray();

    // החזרת תגובה עם הנתונים
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    return NextResponse.json(
      { message: 'Error connecting to the database', error },
      { status: 500 }
    );
  }
}
