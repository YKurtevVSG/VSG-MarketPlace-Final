import { Skeleton } from '@mui/material';

const PendingOrdersSkeleton = () => {
    return (
        <Skeleton
            sx={
                {
                    height: '90px',
                    borderRadius: '10px',
                    marginTop: '-19px',
                    marginBottom: '2.5px',
                    '@media (max-width: 768px)': {
                        height: '423px',
                        '&:nth-child(1)': {
                            marginTop: '-93px'
                        },
                        marginTop: '-152px',
                        marginBottom: '-55px'
                    }
                }
            }
        />
    )
}

export default PendingOrdersSkeleton;