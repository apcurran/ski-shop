const shoppingCart = (() => {
    // Code that runs across all pages.
    let cartArr = JSON.parse(localStorage.getItem("myShoppingCartItems")) || [];
    console.log(cartArr);

    

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
            const price = itemHeader.children[1].textContent;
            return price;
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
            // Save to Local Storage
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
            }
        }

        mainClothingContainer.addEventListener("click", addToCart);

    }
    
})();