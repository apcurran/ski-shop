const clothingFilter = (() => {
    // Cache DOM
    const ul = document.querySelector(".clothing-list");

    // Module Functions


    // Public variables & Methods
    return {
        ul,
    }

})();

clothingFilter.ul.addEventListener("click", sayHi);