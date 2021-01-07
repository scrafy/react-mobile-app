const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');


async function openDb() {
    return sqlite.open({
        filename: `../database`,
        driver: sqlite3.Database,
    });
}

const setup = async () => {

    const db = await openDb();
    await db.migrate(
        {
            migrationsPath: './migrations',
            force: 'last'
        }
    );
}

setup();

