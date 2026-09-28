import data from './products.json' with { type: 'json' };

const menuContainer = document.querySelector('.menu-items');

function renderCards(data) {
    const cardsHTML = data.map(item => {
        return `
        
                        <div class="menu-item" data-name="${item.name}">
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
let filterData;
let first4;
let isExpanded = false;;
const categories = document.querySelectorAll('.offer-tab-container');
categories[0].classList.add('active');
categories.forEach(category => {
    category.addEventListener('click', () => {

        categories.forEach(item => {
            item.classList.remove('active');
        })
        category.classList.add('active');

        const currentData = category.dataset.category;
        filterData = data.filter(item => item.category === currentData);

        isExpanded = false;
        menuContainer.innerHTML = renderCards(filterData.slice(0, 4));

    })
})

const btnRefresh = document.querySelector('.btn-refresh');


btnRefresh.addEventListener('click', () => {

    if (isExpanded === false) {
        menuContainer.innerHTML = renderCards(filterData);
        isExpanded = true
    }
    else {
        menuContainer.innerHTML = renderCards(filterData.slice(0, 4))
        isExpanded = false
    }
})

filterData = data.filter(item => item.category === 'coffee');

menuContainer.innerHTML = renderCards(filterData.slice(0, 4))

const menuItems = document.querySelectorAll('.menu-items');
const modal = document.querySelector(".dialog")
const closeBtn = document.querySelector(".close-btn")
let additiveIndex = 0;
let selectedAdditivePrice = 0;
let selectedSizePrice = 0;


menuItems.forEach(item => {
    item.addEventListener("click", (event) => {
        const itemClosest = event.target.closest('.menu-item');

        if (!itemClosest) {
            return
        }

        const productName = itemClosest.dataset.name;
        const productData = data.find(item => item.name === productName);

        modal.innerHTML = renderModal(productData)
        modal.showModal();
        document.body.classList.add("active");

        const additiveTabs = modal.querySelectorAll(".additive-tab");


        additiveTabs.forEach(tab => {
            tab.addEventListener('click', () => {

                if (tab.classList.contains('active')) {
                    tab.classList.remove('active')
                    selectedAdditivePrice = 0;
                }
                else {
                    additiveTabs.forEach(tab => {
                        tab.classList.remove('active')
                    })
                    tab.classList.add('active');
                    additiveIndex = +tab.querySelector('.additive-num').textContent - 1;
                    selectedAdditivePrice = productData.additives[additiveIndex]["add-price"];
                }

                const dialogPrice = modal.querySelector('.dialog-price');
                dialogPrice.textContent = `$${(+productData.price + +selectedSizePrice + +selectedAdditivePrice).toFixed(2)}`
            })
        })

        const sizeTabs = modal.querySelectorAll('.size-tab');
        sizeTabs[0].classList.add('active');
        sizeTabs.forEach(tab => {


            tab.addEventListener('click', () => {
                sizeTabs.forEach(tab => {
                    tab.classList.remove('active')
                })

                selectedSizePrice = productData.sizes[tab.querySelector('.size-char').textContent.toLowerCase()]["add-price"];

                const dialogPrice = modal.querySelector('.dialog-price');

                dialogPrice.textContent = `$${(+productData.price + +selectedSizePrice + +selectedAdditivePrice).toFixed(2)}`

                tab.classList.add('active')
            })

        })
    })
})

modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.closest('#close-btn')) {
        document.body.classList.remove("active");
        modal.close();
    }
})




function renderModal(item) {
    return `
                <div class="dialog-container">
            <div class="dialog-img">
                <img src="${item.image}" alt="#${item.name}">
            </div>
            <div class="dialog-content">
                <div class="dialog-header">
                    <h3 class="dialog-title">${item.name}</h3>
                    <p class="dialog-subtitle">
                    ${item.description}
                    </p>
                </div>
                <div class="dialog-section">
                    <span class="dialog-section-title">Size</span>
                    <div class="dialog-tabs-list size-list">
                        <button type="button" class="size-tab tab">
                            <span class="size-char active">S</span>
                            <span class="size-num">${item.sizes.s.size}</span>
                        </button>
                        <button type="button" class="size-tab tab">
                            <span class="size-char">M</span>
                            <span class="size-num">${item.sizes.m.size}</span>
                        </button>
                        <button type="button" class="size-tab tab">
                            <span class="size-char">L</span>
                            <span class="size-num">${item.sizes.l.size}</span>
                        </button>
                    </div>
                </div>
                <div class="dialog-section">
                    <span class="dialog-section-title">Additives</span>
                    <div class="dialog-tabs-list additives-list ">
                        <button type="button" class="additive-tab tab">
                            <span class="additive-num">1</span>
                            <span class="additive-text">${item.additives[0].name}</span>
                        </button>
                        <button type="button" class="additive-tab tab">
                            <span class="additive-num">2</span>
                            <span class="additive-text">${item.additives[1].name}</span>
                        </button>
                        <button type="button" class="additive-tab tab">
                            <span class="additive-num">3</span>
                            <span class="additive-text">${item.additives[2].name}</span>
                        </button>
                    </div>
                </div>
                <div class="dialog-total">
                    <div class="dialog-total-title">Total:</div>
                    <div class="dialog-price">$${item.price}</div>
                </div>
                <div class="dialog-info-block">
                    <div class="dialog-logo">
                        <p>i</p>
                    </div>
                    <p class="dialog-logo-text">
                        The cost is not final. Download our mobile app to see the final price and place your order. Earn
                        loyalty points and enjoy your favorite coffee with up to 20% discount.
                    </p>
                </div>
                <button type="button" id="close-btn" class="close-btn">Close</button>
            </div>
        </div>
        `
}
