import { NextApiRequest, NextApiResponse } from 'next';
import { UnitOfWorkUseCase } from 'src/application/unitsofwork';
import { ICategory, ISearchProduct, IServerResponse } from 'src/domain/interfaces';


const getCategories = async (req: NextApiRequest, res: NextApiResponse) => {


    if (req.method === 'POST') {

        try {
            const search: ISearchProduct = req.body;
            const useCase: UnitOfWorkUseCase = new UnitOfWorkUseCase();
            let catgories: ICategory[];
            let resp: IServerResponse<ICategory[]>;
            try {

                if (!req.cookies["session"])
                    throw new Error("Invalid token");

                if (search.centerId === undefined || search.catalogId === undefined) {
                    res.statusCode = 400;
                    res.json({ error: 'Bad Request' });
                } else {
                    resp = await useCase.getCategoriesUseCase().getCategories(search.catalogId, search.centerId, req.cookies["session"]);
                    if (resp.ServerData?.Data && resp.ServerData?.Data.length > 0)
                        catgories = resp.ServerData?.Data;
                    else
                        catgories = [];

                    res.statusCode = 200;
                    res.json(catgories);
                }
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

export default getCategories;