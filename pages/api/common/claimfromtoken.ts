const jwt = require('jsonwebtoken');

const getClaimFromToken = (claim: string, token: string): string | undefined => {

    try {

        let payload;
        payload = jwt.verify(token, process.env.REACT_APP_JWT_SECRET_KEY, { clockTolerance: 60 });
        const value = payload[claim]
        return value

    }
    catch (error) {
        return undefined;
    }

}

export default getClaimFromToken;