"use strict";

const shoppingCart = (() => {
    // Code that runs across all pages.
    let cartArr = JSON.parse(localStorage.getItem("myShoppingCartItems")) || [];
    
    const cartIcon = document.querySelector(".bag-link-quantity");
    const burgerNav = document.querySelector(".nav-burger-list-container");
    const navUl = document.querySelector(".nav-list");

    function toggleNav() {
        navUl.classList.toggle("open-active");
    }

    function updateCartIconTotal() {
        const totalItems = cartArr.length;
        cartIcon.textContent = totalItems;
    }

    updateCartIconTotal();
    burgerNav.addEventListener("click", toggleNav);
    // Close nav when clicked outside
    document.addEventListener("click", (event) => {
        if (event.target === burgerNav) return;

        const isOutside = !event.target.closest(".nav-burger-list-container");
        if (isOutside) toggleNav();
    });

    // Code that only runs on clothing pages.
    if (document.querySelector("body").dataset.clothing) {

        const mainClothingContainer = document.querySelector(".clothing-container");
        
        function getItemName(itemHeader) {
            const name = itemHeader.children[0].textContent;
            return name;
        }

        function getItemPrice(itemHeader) {
            const priceStr = itemHeader.children[1].textContent;
            const priceNum = parseFloat(priceStr.slice(1));
            return priceNum;
        }

        function createItemObj(itemName, itemPrice) {
            const itemObj = {
                name: itemName,
                price: itemPrice
            };

            return itemObj;
        }

        function pushItemObj(itemObj) {
            cartArr.push(itemObj);
        }

        function saveCartItem() {
            localStorage.setItem("myShoppingCartItems", JSON.stringify(cartArr));
        }

        function addToCart(event) {
            if (event.target.className === "section-clothing-btn") {
                const el = event.target;
                const h3 = el.previousElementSibling;
                
                const name = getItemName(h3);
                const price = getItemPrice(h3);

                const newItemObj = createItemObj(name, price);
                pushItemObj(newItemObj);
                saveCartItem();
                updateCartIconTotal();
            } else {
                return;
            }
        }

        mainClothingContainer.addEventListener("click", addToCart);
    }


    // Code that only runs on the checkout page.
    if (document.querySelector("body").dataset.checkout) {

        const mainCheckoutContainer = document.querySelector(".main-checkout-container");
        const itemSubtotalSpan = document.querySelector(".items-subtotal");
        
        function renderCartItems() {
            const section = document.createElement("section");

            for (const obj of cartArr) {
                const itemName = obj.name;
                const itemPrice = obj.price;

                // Parent el for name and price.
                const article = document.createElement("article");
                const nameHeader = document.createElement("h3");
                const priceHeader = document.createElement("h3");
                const div = document.createElement("div");

                nameHeader.textContent = itemName;
                priceHeader.textContent = `$${itemPrice}`; // Add in the dollar sign for price.

                article.classList.add("cart-item-checkout-article");
                div.classList.add("delete-btn");

                article.append(nameHeader, priceHeader, div);
                section.append(article);
            }

            mainCheckoutContainer.prepend(section);

        }

        function updateCheckoutSubtotal() {
            let subtotal = 0;
            for (const obj of cartArr) {
                const itemCost = obj.price;
                subtotal += itemCost;
            }

            itemSubtotalSpan.textContent = subtotal;
        }

        function deleteItem(event) {
            if (event.target.className === "delete-btn") {
                const selectedItem = event.target.parentElement;
                selectedItem.remove(); // Delete from DOM

                const itemName = event.target.previousElementSibling.previousElementSibling.textContent;
                const currItemIndex = cartArr.findIndex(obj => obj.name === itemName);

                // Delete from cartArr in local storage
                cartArr.splice(currItemIndex, 1);
                localStorage.setItem("myShoppingCartItems", JSON.stringify(cartArr));
                cartArr = JSON.parse(localStorage.getItem("myShoppingCartItems"));
                
                updateCheckoutSubtotal();
                updateCartIconTotal();
            }
        }

        renderCartItems();
        updateCheckoutSubtotal();

        mainCheckoutContainer.addEventListener("click", deleteItem);
    }
    
})();