import { useState, useEffect } from 'react';
import { IOrder } from "../../types";
import { setTabTitle } from '../../utils/helperFunctions';
import PendingOrdersTableRow from '../../components/Pending Orders/PendingOrdersTableRow';
import { useGetPendingOrdersQuery } from '../../services/ordersServices';
import NoItemsInList from '../../components/Global/NoItemsInList';
import Loader from '../../components/Global/Loader';

const PendingOrders = (): JSX.Element => {
    setTabTitle('Pending orders');
    // Fetched pending orders
    const { data: pendingOrders, isSuccess, isLoading } = useGetPendingOrdersQuery();
    // Pending orders state
    const [pendingOrdersState, setPendingOrdersState] = useState<IOrder[]>([]);
    // Is loading state
    // const [isLoading, setIsLoading] = useState(true);

    // Set pending orders state
    useEffect(() => {
        pendingOrders && setPendingOrdersState(pendingOrders);
    }, [pendingOrders]);

    // In case fetching products is successfull, set is loading to false after a specific period of time
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         // if (isSuccess) {
    //         //     toast.success('Successfully fetched pending orders! 😊', toastifyCustomStyles);
    //         // }
    //         setIsLoading(false);
    //     }, 1000);
    //     return () => {
    //         clearTimeout(timer);
    //     }
    // }, [isSuccess]);

    return (
        <main id="main-container-pending-orders">
            <div id="pending-items">
                <div id="pending-items-responsive-table">
                    <div className="table-header-pending-orders">
                        <div className="table-first-group">
                            <div className="col col-1">Code</div>
                            <div className="col col-2">QTY</div>
                            <div className="col col-3">Price</div>
                        </div>
                        <div className="table-second-group">
                            <div className="col col-4">Ordered By</div>
                            <div className="col col-5">Order Date</div>
                            <div className="col col-6">Action</div>
                        </div>
                    </div>
                    <div id="rows">
                        {isLoading === true
                            ?
                            <Loader />
                            : isSuccess && pendingOrdersState.length < 1
                                ? <NoItemsInList props={{ text: 'Pending orders' }} />
                                : pendingOrdersState.map((x: IOrder) =>
                                    <PendingOrdersTableRow
                                        props={x}
                                        setPendingOrdersState={setPendingOrdersState}
                                        key={x.id}
                                    />
                                )
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}

export default PendingOrders;