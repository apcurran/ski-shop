const clothingFilter = (() => {
    // Cache DOM
    const ul = document.querySelector(".clothing-list");
    const mainContainer = document.querySelector(".clothing-container");
    const sectionHeaders = mainContainer.querySelectorAll(".section-header");
    const sections = mainContainer.querySelectorAll(".section-clothing");

    // Module Functions
    function addMainContainerMargin() {
        mainContainer.style.marginTop = "12rem";
        mainContainer.style.marginBottom = "12rem";
    }

    function getId(event) {
        const myId = event.target.id;
        return myId;
    }

    function loopAndHideSections(clothingName) {
        sections.forEach((section) => {
            if (section.dataset.clothing !== clothingName) {
                section.style.display = "none";
            } else {
                section.style.display = "grid";
            }
        });
    }

    function loopAndHideHeaders(clothingName) {
        sectionHeaders.forEach((sectionHeader) => {
            if (sectionHeader.dataset.clothing !== clothingName) {
                sectionHeader.style.display = "none";
            } else {
                sectionHeader.style.display = "initial";
            }
        });
    }

    function showAllItems() {
        sectionHeaders.forEach(sectionHeader => sectionHeader.style.display = "initial");
        sections.forEach(section => section.style.display = "grid");
    }

    function hideOthers(event) {
        const listItemId = getId(event);
        switch (listItemId) {
            case "jackets":
                loopAndHideHeaders(listItemId);
                loopAndHideSections(listItemId);
                addMainContainerMargin();
                break;
            case "shirts":
                loopAndHideHeaders(listItemId);
                loopAndHideSections(listItemId);
                addMainContainerMargin();
                break;
            case "socks":
                loopAndHideHeaders(listItemId);
                loopAndHideSections(listItemId);
                addMainContainerMargin();
                break;
            case "boots":
                loopAndHideHeaders(listItemId);
                loopAndHideSections(listItemId);
                addMainContainerMargin();
                break;
            case "all-items":
                showAllItems();
        }
    }

    // Public Variables & Methods
    return {
        ul,
        hideOthers,
    }

})();

clothingFilter.ul.addEventListener("click", clothingFilter.hideOthers);