import data from './products.json' with { type: 'json' };
console.log(data);

const menuContainer = document.querySelector('.menu-items');

function renderCards(data) {
    const cardsHTML = data.map(item => {
        return `
        
                        <div class="menu-item">
                            <div class="item-img">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <div class="menu-content">
                                <div class="item-title">
                                    ${item.name}
                                </div>
                                <div class="item-text">
                                ${item.description}
                                </div>
                                <div class="item-price">
                                    $${item.price}
                                </div>
                            </div>
                        </div>
        `}).join("")
    return cardsHTML;
};

menuContainer.innerHTML = renderCards(data);




const categories = document.querySelectorAll('.offer-tab-container');
categories[0].classList.add('active');
categories.forEach(category => {
    category.addEventListener('click', () => {
        categories.forEach(item => {
            item.classList.remove('active');
        })
        category.classList.add('active');

        const currentData = category.dataset.category;
        const filterData = data.filter(item => item.category === currentData);
        menuContainer.innerHTML = renderCards(filterData);
        console.log(filterData)
        console.log(currentData)
    })
})



