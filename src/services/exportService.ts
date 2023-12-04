import { baseUrl } from "../utils/baseApi";

export const exportInventory = (e) => {
    const user = sessionStorage.getItem('user');
    const token = user && JSON.parse(user).token;
    const loader = `Exporting...`;
    e.currentTarget.innerHTML = loader;
    e.currentTarget.classList.add('disabled-export-btn');

    fetch(`${baseUrl}/Export`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response not ok!');
            }
            return res.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'Inventory'; // Set the desired file name
            document.body.appendChild(a); // Append the link to the DOM
            a.click(); // Simulate a click on the link to trigger the download
            window.URL.revokeObjectURL(url); // Clean up the URL object

            e.target.innerHTML = `
            <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="FileDownloadIcon">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>
            </svg>
            Export
            `;
            e.target.classList.remove('disabled-export-btn');
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

export const exportLentItemsProtocol = (e, params) => {
    const user = sessionStorage.getItem('user');
    const token = user && JSON.parse(user).token;
    const loader = `Exporting...`;
    e.currentTarget.innerHTML = loader;
    e.currentTarget.classList.add('disabled-export-btn');

    fetch(`${baseUrl}/Export/LentItemsProtocol`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(params)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response not ok!');
            }
            return res.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `${params.recepient} lent items protocol`; // Set the desired file name
            document.body.appendChild(a); // Append the link to the DOM
            a.click(); // Simulate a click on the link to trigger the download
            window.URL.revokeObjectURL(url); // Clean up the URL object

            e.target.innerHTML = `
            <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="FileDownloadIcon">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>
            </svg>
            Export
            `;
            e.target.classList.remove('disabled-export-btn');
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}