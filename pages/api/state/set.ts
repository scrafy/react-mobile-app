import { NextApiRequest, NextApiResponse } from 'next';
import getClaimFromToken from '../common/claimfromtoken';
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');


const setState = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST' && req.body) {

        try {

            const userId = getClaimFromToken("userId", req.cookies["session"]);

            if (!userId)
                throw new Error("It was not possible to get userId from cookie");

            const db: any = await sqlite.open({
                filename: './database',
                driver: sqlite3.Database,
            })

            const state: any = await db.get("SELECT state from State WHERE userId = ?", userId);

            if (state)
                await db.run(`UPDATE State SET state = ? WHERE userId = ?`, JSON.stringify(req.body), userId);
            else
                await db.run(`INSERT INTO State(userId, state) VALUES (?,?)`, userId, JSON.stringify(req.body))
            db.close();
            res.statusCode = 200;
            res.send({});

        } catch (error) {
            res.statusCode = 500;
            res.json({ error: error.message });
        }
    } else {
        res.statusCode = 400;
        res.json({ error: 'Bad Request' });
    }
}

export default setState;