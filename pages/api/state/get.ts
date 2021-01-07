import { NextApiRequest, NextApiResponse } from 'next';
import getClaimFromToken from '../common/claimfromtoken';
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');



const getState = async (req: NextApiRequest, res: NextApiResponse) => {


    if (req.method === 'GET') {

        try {

            let userId: string | undefined = undefined;
            if (req.headers.authorization)
                userId = getClaimFromToken("userId", req.headers.authorization.split(" ")[1]);
            else
                userId = getClaimFromToken("userId", req.cookies["session"]);

            if (!userId)
                throw new Error("It was not possible to get userId");

            const db: any = await sqlite.open({
                filename: './database',
                driver: sqlite3.Database,
            })

            const data: any = await db.get("SELECT state from State WHERE userId = ?", userId);
            db.close();
            res.statusCode = 200;
            res.setHeader('Cache-control', `no-cache, must-revalidate`);
            res.setHeader('Pragma', `no-cache`);
            res.setHeader('Expires', `Sat, 26 Jul 1997 05:00:00 GMT`);
            res.json({ resp: (data && data.state) || null });

        } catch (error) {
            res.statusCode = 500;
            res.json({ error: error.message });
        }
    } else {
        res.statusCode = 400;
        res.json({ error: 'Bad Request' });
    }
}

export default getState;