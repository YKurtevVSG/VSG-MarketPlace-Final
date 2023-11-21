import { ILendedItem } from "../../types";
import { Fade } from '@mui/material';

type MyLendedItemProps = {
    props: ILendedItem
}

const MyLendedItemsRow = ({ props }: MyLendedItemProps) => {
    return (
        <Fade in={true} timeout={500}>
            <div className="table-row-my-lended-items">
                <div className="table-first-group">
                    <div className="col col-1" data-before="Code:">{props.productCode}</div>
                    <div className="col col-2" data-before="Name:">{props.productName}</div>
                    <div className="col col-3" data-before="QTY:">{props.qty}</div>
                </div>
                <div className="table-second-group">
                    <div className="col col-4" data-before="Lend Date:">{props.startDate}</div>
                    <div className="col col-5" data-before="Return Date:">{props.endDate}</div>
                    <div className="col col-6" data-before="Status:">{props.endDate === null ? 'In use' : 'Returned'}</div>
                </div>
            </div>
        </Fade>
    )
}

export default MyLendedItemsRow;