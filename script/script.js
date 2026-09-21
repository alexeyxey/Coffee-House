const darkTheme = document.querySelector(".switch-dark");
const lightTheme = document.querySelector(".switch-light");

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