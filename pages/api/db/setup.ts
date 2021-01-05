const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const fs = require('fs');


async function openDb() {
    return sqlite.open({
        filename: `../../../database`,
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

if (!fs.existsSync('../../../database')) {
    setup();
}

//export {};