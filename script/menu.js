const categories = document.querySelectorAll('.offer-tab-container');
categories[0].classList.add('active');
categories.forEach(category => {
    category.addEventListener('click', () => {
        categories.forEach(item => {
            item.classList.remove('active');
        })
        category.classList.add('active');
    })
})