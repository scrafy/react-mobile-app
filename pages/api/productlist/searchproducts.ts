import { NextApiRequest, NextApiResponse } from 'next';
import { UnitOfWorkUseCase } from 'src/application/unitsofwork';
import { IProduct, ISearchProduct, IServerResponse } from 'src/domain/interfaces';


const searchProducts = async (req: NextApiRequest, res: NextApiResponse) => {


    if (req.method === 'POST' && req.body) {

        try {
            const search: ISearchProduct = req.body;
            const useCase: UnitOfWorkUseCase = new UnitOfWorkUseCase();
            let products: IProduct[];
            let resp: IServerResponse<IProduct[]>;
            try {

                if (!req.cookies["session"])
                    throw new Error("Invalid token");

                resp = await useCase.getSearchProductUseCase().searchProducts(search, 1, req.cookies["session"]);
                if (resp.ServerData?.Data && resp.ServerData?.Data.length > 0)
                    products = resp.ServerData?.Data;
                else
                    products = [];

                res.statusCode = 200;
                res.json(products);
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