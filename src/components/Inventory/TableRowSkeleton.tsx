import { TableRow, TableCell, Skeleton } from '@mui/material'
import { ISkeleton } from '../../types'

type SkeletonProps = {
    props: ISkeleton
}

const TableRowSkeleton = ({ props }: SkeletonProps) => {
    return (
        <TableRow>
            <TableCell>
                <Skeleton
                    style={{
                        borderRadius: '10px',
                    }}
                    key={props.key}
                />
            </TableCell>
            <TableCell>
                <Skeleton
                    style={{
                        borderRadius: '10px',
                    }}
                    key={props.key}
                />
            </TableCell>
            <TableCell>
                <Skeleton
                    style={{
                        borderRadius: '10px',
                    }}
                    key={props.key}
                />
            </TableCell>
            <TableCell>
                <Skeleton
                    style={{
                        borderRadius: '10px',
                    }}
                    key={props.key}
                />
            </TableCell>
            <TableCell>
                <Skeleton
                    style={{
                        borderRadius: '10px',
                    }}
                    key={props.key}
                />
            </TableCell>
            <TableCell>
                <Skeleton
                    style={{
                        borderRadius: '10px',
                    }}
                    key={props.key}
                />
            </TableCell>
        </TableRow>
    )
}

export default TableRowSkeleton;