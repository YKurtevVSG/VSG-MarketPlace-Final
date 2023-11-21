export const setTabTitle = (title: string) => {
    return document.title = title;
}

export const setHeaderTitle = () => {
    const path = location.pathname;

    if (path === '/marketplace') {
        return 'Marketplace';
    }
    if (path === '/inventory') {
        return 'Inventory';
    }
    if (path === '/pending-orders') {
        return 'Pending orders';
    }
    if (path === '/my-orders') {
        return 'My orders';
    }
    if (path === '/lended-items') {
        return 'Lended items';
    }
    if (path === '/my-lended-items') {
        return 'My lended items';
    }
    if (path === '/no-access') {
        return 'No access';
    }
}