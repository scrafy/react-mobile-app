import { NextApiRequest, NextApiResponse } from 'next';
import { UnitOfWorkUseCase } from 'src/application/unitsofwork';
import { IProduct, ISearchProduct, IServerResponse } from 'src/domain/interfaces';


const searchProducts = async (req: NextApiRequest, res: NextApiResponse) => {

    
    if (req.method === 'POST' && req.body) {

        try {
           
            const search: ISearchProduct = req.body.search;
            const useCase: UnitOfWorkUseCase = new UnitOfWorkUseCase();
            let resp: IServerResponse<IProduct[]>;
            try {

                if (!req.body.session)
                    throw new Error("Invalid token");

                resp = await useCase.getSearchProductUseCase().searchProducts(search, 1, req.body.session);
                res.statusCode = 200;
                res.json(resp);
            }
            catch (error) {

                if (error.errorCode)

                    res.statusCode = error.errorCode;

                else
                    throw error;

                res.json({ error: error.message });
            }

        } catch (error) {
            res.statusCode = 500;
            res.json({ error: error.message });
        }
    } else {
        res.statusCode = 400;
        res.json({ error: 'Bad Request' });
    }
}

export default searchProducts;