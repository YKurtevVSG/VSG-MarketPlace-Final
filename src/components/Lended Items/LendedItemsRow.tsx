import { Accordion, AccordionDetails, AccordionSummary, Avatar, Typography, Fade } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ILendedItem, IUser, IUserLendedItems } from "../../types";
import UserLendedItemRow from "./UserLendedItemRow";
import { Dispatch, SetStateAction, useState } from "react";
import { useGetUsersQuery } from "../../services/usersService";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Button from '../../components/Global/Button';
import { exportLentItemsProtocol } from "../../services/exportService";

type LendedItemProps = {
    props: IUserLendedItems,
    setLendedItems: Dispatch<SetStateAction<IUserLendedItems[]>>
}

const LendedItemsRow = ({ props }: LendedItemProps) => {
    const [userItemsState, setUserItems] = useState(props.lentItems);

    const { data: users } = useGetUsersQuery();

    const onExport = (e, params: any) => {
        exportLentItemsProtocol(e, params);
    }

    const username = users?.find((x: IUser) => x.email.toLowerCase() === props.email.toLowerCase())?.name;
    const email = props.email.toLowerCase();
    const userPhoto = users?.find((x: IUser) => x.email.toLowerCase() === props.email.toLowerCase())?.avatar;
    const loggedUser = sessionStorage.getItem('user');
    const loggedUserName = loggedUser !== null && JSON.parse(loggedUser).username;

    return (
        <Fade in={true} timeout={500}>
            <Accordion className="lended-item-accordion">
                <AccordionSummary
                    className="accordion-summary"
                    expandIcon={<ExpandMoreIcon />}
                >
                    <div className="main-row">
                        <div className="avatar-name-container" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Avatar className="avatar" src={userPhoto} />
                            <Typography>{username}</Typography>
                        </div>
                    </div>
                </AccordionSummary>
                <Button className='export-btn' buttonText='Export' buttonType='button' onClick={(e) => onExport(e, { email: email, recepient: username, provider: loggedUserName })}>
                    <FileDownloadIcon />
                </Button>
                <AccordionDetails>
                    <div className="table-header-lended-items">
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
                    {userItemsState.map((x: ILendedItem) =>
                        <UserLendedItemRow
                            props={{
                                id: x.id,
                                qty: x.qty,
                                startDate: x.startDate,
                                endDate: x.endDate,
                                productCode: x.productCode,
                                productName: x.productName
                            }}
                            setLendedItems={setUserItems}
                            key={x.id}
                        />
                    )}
                </AccordionDetails>
            </Accordion>
        </Fade>
    )
}

export default LendedItemsRow;