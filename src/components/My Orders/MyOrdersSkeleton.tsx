import { Skeleton } from '@mui/material';

const MyOrdersSkeleton = () => {
    return (
        <Skeleton
            sx={
                {
                    height: '90px',
                    borderRadius: '10px',
                    marginTop: '-19px',
                    marginBottom: '2.5px',
                    '@media (max-width: 768px)': {
                        height: '362px',
                        '&:nth-child(1)': {
                            marginTop: '-80px'
                        },
                        marginTop: '-152px',
                        marginBottom: '30px',
                        '&:last-of-type': {
                            marginBottom: '-45px'
                        }

                    }
                }
            }
        />
    )
}

export default MyOrdersSkeleton;