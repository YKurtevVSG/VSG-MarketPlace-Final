const html = document.querySelector('html');

export const onThemeChange = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.checked ? localStorage.setItem('theme', 'dark') : localStorage.setItem('theme', 'light');
    const theme = localStorage.getItem('theme');
    html?.setAttribute('data-theme', typeof theme === 'string' ? theme : '');
}

export const setInitialTheme = () => {
    const theme = typeof localStorage.getItem('theme') === 'string' ? localStorage.getItem('theme') : 'light';
    html?.setAttribute('data-theme', typeof theme === 'string' ? theme : '');
}