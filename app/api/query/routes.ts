import mysql from 'mysql2/promise';

interface Request {
    json: () => Promise<{ query: string }>;
}

interface DBConfig {
    host: string;
    user: string;
    password: string;
    database: string;
}

interface QueryResult {
    success: boolean;
    data?: any;
    error?: string;
}

export async function POST(req: Request): Promise<Response> {
    try {
        const { query } = await req.json();

        const dbConfig: DBConfig = {
            host: 'your-database-host',
            user: 'your-database-user',
            password: 'your-database-password',
            database: 'your-database-name',
        };

        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(query);
        await connection.end();

        const result: QueryResult = { success: true, data: rows };

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        const result: QueryResult = { success: false, error: (error as Error).message };

        return new Response(JSON.stringify(result), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
