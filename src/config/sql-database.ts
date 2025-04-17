
import { Pool } from 'pg';
import { toast } from "@/hooks/use-toast";

// Create PostgreSQL connection pool
const pool = new Pool({
  user: import.meta.env.VITE_DB_USER || '',
  host: import.meta.env.VITE_DB_HOST || '',
  database: import.meta.env.VITE_DB_NAME || '',
  password: import.meta.env.VITE_DB_PASSWORD || '',
  port: parseInt(import.meta.env.VITE_DB_PORT || '5432')
});

// Execute SQL query with error handling
export async function query(text: string, params?: any[]) {
  try {
    return await pool.query(text, params);
  } catch (error) {
    console.error('Database query error:', error);
    toast({
      title: "Database Error",
      description: "Failed to execute database query",
      variant: "destructive",
    });
    throw error;
  }
}

// Check if SQL database is configured
export const isSqlDatabaseConfigured = (): boolean => {
  return !!(
    import.meta.env.VITE_DB_USER &&
    import.meta.env.VITE_DB_HOST &&
    import.meta.env.VITE_DB_NAME &&
    import.meta.env.VITE_DB_PASSWORD
  );
};

// Initialize database connection
export const initSqlDatabase = async (): Promise<boolean> => {
  try {
    if (!isSqlDatabaseConfigured()) {
      console.error('SQL Database not configured. Please set required environment variables.');
      return false;
    }
    
    // Test the connection
    const result = await pool.query('SELECT NOW()');
    console.log('SQL Database connected successfully:', result.rows[0].now);
    return true;
  } catch (error) {
    console.error('Error initializing SQL database:', error);
    toast({
      title: "Database Error",
      description: "Could not connect to the SQL database. Please check your configuration.",
      variant: "destructive",
    });
    return false;
  }
};

// Helper function for syncing Firebase data with SQL
export const syncFirebaseWithSql = async (
  firebaseId: string, 
  sqlTable: string, 
  data: Record<string, any>
): Promise<number> => {
  try {
    // Check if record exists
    const checkResult = await query(
      `SELECT id FROM ${sqlTable} WHERE firebase_id = $1`,
      [firebaseId]
    );
    
    if (checkResult.rowCount > 0) {
      // Update existing record
      const setClause = Object.keys(data)
        .map((key, i) => `${key} = $${i + 2}`)
        .join(', ');
      
      await query(
        `UPDATE ${sqlTable} SET ${setClause} WHERE firebase_id = $1 RETURNING id`,
        [firebaseId, ...Object.values(data)]
      );
      
      return checkResult.rows[0].id;
    } else {
      // Insert new record
      const columns = ['firebase_id', ...Object.keys(data)].join(', ');
      const valuePlaceholders = Array.from(
        { length: Object.keys(data).length + 1 },
        (_, i) => `$${i + 1}`
      ).join(', ');
      
      const result = await query(
        `INSERT INTO ${sqlTable} (${columns}) VALUES (${valuePlaceholders}) RETURNING id`,
        [firebaseId, ...Object.values(data)]
      );
      
      return result.rows[0].id;
    }
  } catch (error) {
    console.error(`Error syncing Firebase data with SQL for ${sqlTable}:`, error);
    throw error;
  }
};

export default {
  query,
  isSqlDatabaseConfigured,
  initSqlDatabase,
  syncFirebaseWithSql
};
