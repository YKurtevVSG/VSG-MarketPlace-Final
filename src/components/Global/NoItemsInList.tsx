import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import { INoItemsInList } from "../../types"
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

type NoItemsInListType = {
    props: INoItemsInList
}

const NoItemsInList = ({ props }: NoItemsInListType) => {
    return (
        <div className="empty-list">
            {props.text === 'Marketplace' && <StorefrontOutlinedIcon />}
            {props.text === 'Inventory' && <AssignmentOutlinedIcon />}
            {props.text === 'Pending orders' && <PendingActionsOutlinedIcon />}
            {props.text === 'My orders' && <LocalMallOutlinedIcon />}
            {props.text === 'Lended items' && <StorageOutlinedIcon />}
            {props.text === 'My lended items' && <WorkHistoryOutlinedIcon />}
            <span>There are no items in {props.text}</span>
        </div>
    )
}

export default NoItemsInList;