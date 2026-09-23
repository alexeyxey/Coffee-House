const darkTheme = document.querySelector(".switch-dark");
const lightTheme = document.querySelector(".switch-light");
const burger = document.querySelector('.header-menu-burger')
const nav = document.querySelector('.header-list');

darkTheme.addEventListener("click", () => {
    document.body.classList.add("dark-theme");

    darkTheme.classList.add("active-theme");
    lightTheme.classList.remove("active-theme");
    localStorage.setItem('theme', 'dark');
});

lightTheme.addEventListener("click", () => {
    document.body.classList.remove("dark-theme");

    lightTheme.classList.add("active-theme");
    darkTheme.classList.remove("active-theme");
    localStorage.setItem('theme', 'light');
});
const savedTheme = localStorage.getItem('theme');

if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    darkTheme.classList.add("active-theme");
    lightTheme.classList.remove("active-theme");
}

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    lightTheme.classList.add("active-theme");
    darkTheme.classList.remove("active-theme");
}

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
})