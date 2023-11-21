import MyLendedItemsRow from "../../components/My Lended Items/MyLendedItemsRow";
import { useGetMyLentItemsQuery } from "../../services/rentItemsService";
import { setTabTitle } from "../../utils/helperFunctions";
import { useState, useEffect } from 'react';
import { ILendedItem } from "../../types";
import NoItemsInList from "../../components/Global/NoItemsInList";
import Loader from "../../components/Global/Loader";

const MyLendedItems = () => {
    setTabTitle('My lended items');
    const user = sessionStorage.getItem('user');
    const userEmail = user !== null && JSON.parse(user).email;
    console.log(user);

    // Fetched my lended items
    const { data: myLendedItems, isSuccess, isLoading } = useGetMyLentItemsQuery();
    // My lended items state
    const [myLendeditemsState, setMyLendedItemsState] = useState<ILendedItem[]>([]);

    // Set my rented items state
    useEffect(() => {
        myLendedItems && setMyLendedItemsState(myLendedItems);
    }, [myLendedItems]);

    return (
        <main id="main-container-my-lended-items">
            <div className="table-header-my-lended-items">
                <div className="table-first-group">
                    <div className="col col-1">Code</div>
                    <div className="col col-2">Name</div>
                    <div className="col col-3">QTY</div>
                </div>
                <div className="table-second-group">
                    <div className="col col-4">Lend Date</div>
                    <div className="col col-5">Return Date</div>
                    <div className="col col-6">Status</div>
                </div>
            </div>
            <div className="rows">
                {isLoading
                    ?
                    <Loader />
                    : isSuccess && myLendeditemsState?.length < 1
                        ? <NoItemsInList props={{ text: 'My lended items' }} />
                        : myLendeditemsState.map((x: ILendedItem) =>
                            <MyLendedItemsRow
                                props={{
                                    productCode: x.productCode,
                                    productName: x.productName,
                                    qty: x.qty,
                                    startDate: x.startDate,
                                    endDate: x.endDate,
                                    id: x.id
                                }}
                                key={x.id}
                            />
                        )
                }
            </div>
        </main>
    )
}

export default MyLendedItems;