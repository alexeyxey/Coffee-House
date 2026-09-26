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
        console.log(filterData)
        console.log(currentData)
        menuContainer.innerHTML = renderCards(filterData);
    })
})

menuContainer.innerHTML = renderCards(data.filter(item => item.category === 'coffee'));


const menuItems = document.querySelectorAll('.menu-items');
const modal = document.querySelector(".dialog")
const closeBtn = document.querySelector(".close-btn")

menuItems.forEach(item => {
    item.addEventListener("click", (event) => {
        modal.showModal();
        document.body.classList.add("active");
        event.stopPropagation()
    })
})

closeBtn.addEventListener("click", () => {
    modal.close();
    document.body.classList.remove("active");

})

modal.addEventListener('click', (event) => {
    const isClickInsideMenu = modal.contains(event.target);
    if (event.target === modal) {
        document.body.classList.remove("active");
        modal.close();
    }
})

