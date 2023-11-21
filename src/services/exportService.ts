import { baseUrl } from "../utils/baseApi";

const user = sessionStorage.getItem('user');
const token = user && JSON.parse(user).token;

export const exportInventory = () => {
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
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

export const exportLentItemsProtocol = (params) => {
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
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}