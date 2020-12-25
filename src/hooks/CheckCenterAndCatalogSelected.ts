import { useSelector } from 'react-redux';
import { ICenter, ICatalog } from 'src/domain/interfaces';

const useCheckCenterAndCatalogSelected = (res: any) => {

    const centerSelected: ICenter | null = useSelector((state: any) => state.centers.selectedCenter);
    const catalogSelected: ICatalog | null = useSelector((state: any) => state.catalogs.selectedCatalog);
    

    if (centerSelected === null || catalogSelected === null) {
       //redireccion lado cliente
        return;
    }

    return;
};

export default useCheckCenterAndCatalogSelected;