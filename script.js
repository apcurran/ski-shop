const clothingFilter = (() => {
    // Cache DOM
    const ul = document.querySelector(".clothing-list");
    const sectionHeaders = document.querySelectorAll(".section-header");
    const sections = document.querySelectorAll(".section-clothing");

    // Module Functions
    function getId(event) {
        const myId = event.target.id;
        return myId;
    }

    function loopAndHide(clothingName) {
        sections.forEach((section) => {
            if (section.dataset.clothing !== clothingName) {
                section.style.display = "none";
            } else {
                section.style.display = "initial";
            }
        });
    }

    function hideOthers(event) {
        const listItemId = getId(event);
        switch (listItemId) {
            case "jackets":
                loopAndHide(listItemId);
                break;
            case "shirts":
                loopAndHide(listItemId);
                break;
            case "socks":
                loopAndHide(listItemId);
                break;
            case "boots":
                loopAndHide(listItemId);
                break;
            default:
                alert("Something went wrong...");
        }
    }

    // Public Variables & Methods
    return {
        ul,
        hideOthers,
    }

})();

clothingFilter.ul.addEventListener("click", clothingFilter.hideOthers);