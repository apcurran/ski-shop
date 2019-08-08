const shoppingCart = (() => {
    // Code that runs across all pages.
    let cartArr = JSON.parse(localStorage.getItem("myShoppingCartItems")) || [];
    const cartIcon = document.querySelector(".bag-link-quantity");

    function updateCartIconTotal() {
        const totalItems = cartArr.length;
        cartIcon.textContent = totalItems;
    }

    updateCartIconTotal();

    // Code that only runs on clothing pages.
    if (document.querySelector("body").dataset.clothing) {
        console.log("Hi clothing pages!");

        const mainClothingContainer = document.querySelector(".clothing-container");
        const addBtn = document.querySelectorAll(".section-clothing-btn");
        
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
            // Did the user click an add to cart btn?
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
        console.log("Hi checkout page!");

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

                article.appendChild(nameHeader);
                article.appendChild(priceHeader);
                article.appendChild(div);

                section.appendChild(article);
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

        renderCartItems();
        updateCheckoutSubtotal();
    }
    
})();