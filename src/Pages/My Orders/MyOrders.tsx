import { useState, useEffect } from 'react';
import { IOrder } from '../../types';
import MyOrdersTableRow from '../../components/My Orders/MyOrdersTableRow';
import { setTabTitle } from '../../utils/helperFunctions';
import { useGetMyOrdersQuery } from '../../services/ordersServices';
import NoItemsInList from '../../components/Global/NoItemsInList';
import Loader from '../../components/Global/Loader';

const MyOrders = () => {
    setTabTitle('My orders');
    // Fetched my orders
    const { data: myOrders, isSuccess, isLoading } = useGetMyOrdersQuery();
    
    // My orders state
    const [myOrdersState, setMyOrdersState] = useState<IOrder[]>([]);

    // Set my orders state
    useEffect(() => {
        myOrders && setMyOrdersState(myOrders);
    }, [myOrders]);

    return (
        <main id="main-container-my-orders">
            <div id="my-orders-items">
                <div id="my-orders-responsive-table">
                    <div className="table-header-my-orders">
                        <div className="col col-1">Name</div>
                        <div className="table-first-group">
                            <div className="col col-2">QTY</div>
                            <div className="col col-3">Price</div>
                        </div>
                        <div className="table-second-group">
                            <div className="col col-4">Order Date</div>
                            <div className="col col-5">Status</div>
                        </div>
                    </div>
                    <div id="rows">
                        {isLoading === true
                            ?
                            <Loader />
                            : isSuccess && myOrdersState.length < 1
                                ? <NoItemsInList props={{ text: 'My orders' }} />
                                : myOrdersState.map((x: IOrder) =>
                                    <MyOrdersTableRow props={{
                                        id: x.id,
                                        productCode: x.productCode,
                                        qty: x.qty,
                                        price: x.price,
                                        date: x.date,
                                        orderedBy: x.orderedBy,
                                        status: x.status,
                                        productName: x.productName,
                                        email: x.email
                                    }}
                                        setMyOrdersState={setMyOrdersState}
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

export default MyOrders