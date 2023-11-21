import { useEffect, useState } from 'react';
import { IMarketplaceProduct } from "../../types";
import MarketplaceItemCard from "../../components/Marketplace/MarketplaceItemCard";
import { setTabTitle } from "../../utils/helperFunctions";
import { useGetMarketplaceProductsQuery } from "../../services/productsService";
import NoItemsInList from "../../components/Global/NoItemsInList";
import Loader from '../../components/Global/Loader';

const Marketplace = (): JSX.Element => {
    setTabTitle('Marketplace');
    // Fetched products
    const { data: products, isSuccess, isLoading } = useGetMarketplaceProductsQuery();
    // Marketplace products state
    const [marketplaceProductsState, setMarketplaceProductsState] = useState<IMarketplaceProduct[]>([]);

    // Set marketplace products state
    useEffect(() => {
        products && setMarketplaceProductsState(products?.filter((x: IMarketplaceProduct) => x.saleQty > 0));
    }, [products]);

    return (
        <main id="main-container-marketplace">
            <article className="items">
                {isLoading === true
                    ?
                    <Loader />
                    : isSuccess && marketplaceProductsState?.length < 1
                        ? <NoItemsInList props={{ text: 'Marketplace' }} />
                        : marketplaceProductsState.map((x: IMarketplaceProduct) => <MarketplaceItemCard props={x} setMarketplaceProductsState={setMarketplaceProductsState} key={x.id} />)
                }
            </article>
        </main>
    )
}

export default Marketplace;