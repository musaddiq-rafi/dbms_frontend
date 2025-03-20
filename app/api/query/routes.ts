import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
};

export async function POST(req: NextRequest) {
    try {
        const { query } = await req.json();
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(query);
        await connection.end();

        return NextResponse.json({ success: true, data: rows }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
