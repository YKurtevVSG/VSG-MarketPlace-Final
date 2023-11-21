import { Fade, Paper, Popper, ClickAwayListener, Box, styled, PopperPlacementType } from "@mui/material";
import { IPopUp } from "../../types";
import Button from "./Button";
import { popUpArrowStyles, styledPopUpStyles } from "../../utils/popUpCustomStyles";

type PopUpProps = {
    props: IPopUp
}

const StyledPopper = styled(Popper)(({ theme }) => (
    // You can replace with `PopperUnstyled` for lower bundle size.
    styledPopUpStyles
));

const PopUp = ({ props }: PopUpProps): JSX.Element => {
    return (
        <StyledPopper
            open={props.open}
            anchorEl={props.popUpAnchorEl}
            placement={props.placement}
            transition
            modifiers={[{
                name: 'arrow',
                enabled: true,
                options: {
                    element: '.arrow',
                },
            },
            {
                name: 'flip',
                enabled: true,
                options: {
                    altBoundary: true,
                    rootBoundary: 'document',
                    padding: 8,
                },
            },
            {
                name: 'offset',
                options: {
                    offset: ({ placement }: { placement: PopperPlacementType }) => {
                        return placement === 'top-end' ? [0, 29] : [0, 8]
                    }
                }
            }]}>
            {({ TransitionProps }) => (
                <ClickAwayListener onClickAway={(e) => props.closePopUp(e)}>
                    <Fade {...TransitionProps} timeout={500}>
                        <Paper className="pop-up" style={{ backgroundColor: 'var(--color-background)', boxShadow: 'var(--color-boxshadow)' }}>
                            <>
                                <Box component="span" className="arrow" sx={popUpArrowStyles} />
                                <p>{props.text}</p>
                                <div className="pop-up-buttons">
                                    <Button buttonType="button" className="confirm-btn" buttonText="Yes" onClick={(e) => props.confirmFunc(e)}></Button>
                                    <Button buttonType="button" className="cancel-btn" buttonText="No" onClick={(e) => props.closePopUp(e)}></Button>
                                </div>
                            </>
                        </Paper>
                    </Fade>
                </ClickAwayListener>
            )}
        </StyledPopper>

    )
}

export default PopUp;