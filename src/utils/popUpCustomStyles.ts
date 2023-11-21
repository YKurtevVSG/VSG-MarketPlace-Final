export const popUpArrowStyles = {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
        content: '""',
        margin: 'auto',
        display: 'block',
        width: 0,
        height: 0,
        borderStyle: 'solid',
    }
}

export const styledPopUpStyles = {
    zIndex: 1,
    width: '260px',
    height: '80px',
    '&[data-popper-placement*="bottom"] .arrow': {
        top: 0,
        left: 0,
        marginTop: '-0.9em',
        width: '3em',
        height: '1em',
        '&::before': {
            borderWidth: '0 1em 1em 1em',
            borderColor: `transparent transparent var(--color-background) transparent`,
        },
    },
    '&[data-popper-placement*="top"] .arrow': {
        bottom: 0,
        left: 0,
        marginBottom: '-4em',
        width: '3em',
        height: '1em',
        '&::before': {
            borderWidth: '1em 1em 0 1em',
            borderColor: `var(--color-background) transparent transparent transparent`,
        },
    }
}