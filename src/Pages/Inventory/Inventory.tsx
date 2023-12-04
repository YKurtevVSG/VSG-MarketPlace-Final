import { Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useState, useEffect } from 'react';
import { IInventoryProduct } from '../../types';
import InventoryTableRow from '../../components/Inventory/InventoryTableRow';
import AddItemModal from '../../components/Inventory/AddItemModal';
import Button from '../../components/Global/Button';
import { setTabTitle } from '../../utils/helperFunctions';
import { useGetInventoryProductsQuery } from '../../services/productsService';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Loader from '../../components/Global/Loader';
import NoItemsInList from '../../components/Global/NoItemsInList';
import { exportInventory } from '../../services/exportService';

const Inventory = () => {
    setTabTitle('Inventory');
    // Fetched products and locations
    const { data: products, isLoading } = useGetInventoryProductsQuery();
    // Add modal state
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);
    // Inventory products state
    const [inventoryProductsState, setInventoryProductsState] = useState<IInventoryProduct[]>([]);
    // Search value state
    const [searchValue, setSearchValue] = useState<string>('');

    // ------------------------
    // const [trigger] = useLazyExportInventoryQuery();
    // ------------------------

    // Set invetory products state
    useEffect(() => {
        if (products) {
            products && setInventoryProductsState(products);
            searchValue && setInventoryProductsState(products?.filter(x => x.name.toLowerCase().includes(searchValue.toLowerCase())));
        }
    }, [products, searchValue]);

    // Add modal open-close functionality
    const handleAddModal = () => {
        setOpenAddModal(prevState => !prevState);
    };

    const rows: GridRowsProp = inventoryProductsState.map((x: IInventoryProduct) => ({
        id: x.id,
        code: x.code,
        name: x.name,
        categoryName: x.category,
        locationName: x.location,
        quantityForSale: x.saleQty,
        quantityForRent: x.lendQty,
        quantity: x.combinedQty,
        actions: x
    }));

    const columns: GridColDef[] = [
        { field: 'code', headerName: 'Code', headerClassName: 'data-grid-header', flex: 0.5 },
        { field: 'name', headerName: 'Name', headerClassName: 'data-grid-header', flex: 1.5 },
        { field: 'categoryName', headerName: 'Category', headerClassName: 'data-grid-header', flex: 1 },
        { field: 'locationName', headerName: 'Location', headerClassName: 'data-grid-header', flex: 1 },
        { field: 'quantityForSale', headerName: 'For Sale', headerClassName: 'data-grid-header', flex: 0.6 },
        { field: 'quantityForRent', headerName: 'For Lend', headerClassName: 'data-grid-header', flex: 0.6 },
        { field: 'quantity', headerName: 'QTY', headerClassName: 'data-grid-header', flex: 0.6 },
        {
            field: 'actions',
            headerName: 'Actions',
            headerClassName: 'data-grid-header',
            width: 120,
            renderCell(params) {
                const item = params.value as IInventoryProduct;
                return <InventoryTableRow props={item} setInventoryProducts={setInventoryProductsState} inventoryProducts={inventoryProductsState} />
            },
        }
    ]

    const noItems = () => {
        return (
            <NoItemsInList props={{ text: 'Inventory' }} />
        )
    }

    const onExport = (e) => {
        exportInventory(e);
    }

    return (
        <>
            {/* Add item modal */}
            <AddItemModal props={{ open: openAddModal, handleClose: handleAddModal, setInventoryProducts: setInventoryProductsState, inventoryProducts: inventoryProductsState }} />
            {/* Inventory */}
            <main id="main-container-inventory">
                <div id="inventory-wrapper">
                    <div className='search-add-container'>
                        {/* Search */}
                        <div className="search">
                            <form id="search-form">
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField
                                        className='input-field'
                                        id="input-with-sx"
                                        label="Search"
                                        variant="standard"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                </Box>
                            </form>
                        </div>
                        {/* Add button */}
                        <Button className='add-btn' buttonText='Add Item' buttonType='button' onClick={() => handleAddModal()}>
                            <AddIcon />
                        </Button>
                        <Button className='export-btn' buttonText='Export' buttonType='button' onClick={(e) => onExport(e)}>
                            <FileDownloadIcon />
                        </Button>
                    </div>
                    {/* Table */}
                    {/* {isLoading
                        ?
                        <div className='loading-container'>
                            <LinearProgress color='error' className='loading-line' />
                            <span>Loading...</span>
                        </div>
                        : */}
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        className='data-table'
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10
                                }
                            }
                        }}
                        autoHeight
                        loading={isLoading}
                        slots={{
                            loadingOverlay: Loader,
                            noRowsOverlay: noItems
                        }}
                        pageSizeOptions={[10]}
                        disableColumnSelector
                        disableRowSelectionOnClick
                    />
                    {/* } */}
                </div>
            </main >
        </>
    );
}

export default Inventory;