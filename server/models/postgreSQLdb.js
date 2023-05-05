const { Pool } = require('pg');
const pokemonAPI = require('pokemontcgsdk');

pokemonAPI.configure({ apiKey: process.env.POKI_API_KEY });

const pool = new Pool({
  connectionString: process.env.ELEPHANTSQL_SERVER,
});

module.exports = {
  bulkQuery: async (str, array, callback) => {
    const client = await pool.connect();

    try {
      //Begin connection between the client
      console.log('BEGIN')
      await client.query('BEGIN');
      // Execute the SQL statement for each row
      for (const row of array) {
        console.log(row)
        await client.query(str, row);
      }
      // commit transaction
      await client.query('COMMIT');
      console.log(`Inserted ${array.length} rows into pokemon table`);
    } catch (err) {
      await client.query('ROLLBACK');
    } finally {
      client.release();
    }
  },
};
