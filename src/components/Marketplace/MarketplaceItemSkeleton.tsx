import { Skeleton } from '@mui/material';
import { ISkeleton } from '../../types';

type SkeletonProps = {
    props: ISkeleton
}

const MarketplaceItemSkeleton = ({ props }: SkeletonProps) => {
    return (
        <div className="item-wrapper">
            <Skeleton
                width={'100%'}
                height={'167%'}
                style={{
                    borderRadius: '10px',
                    marginTop: '-108px',
                    marginBottom: '-67px'
                }}
                key={props.key}
            />
        </div>
    )
}

export default MarketplaceItemSkeleton;