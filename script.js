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

    function loopAndHide() {
        sections.forEach((section) => section.style.display = "none");
    }

    function hideOthers(event) {
        const listItemId = getId(event);
        switch (listItemId) {
            case "jackets":
                alert("Hide sections other than jackets!");
                loopAndHide();
                break;
            case "shirts":
                alert("Hide sections other than shirts!");
                break;
            case "socks":
                alert("Hide sections other than socks!");
                break;
            case "boots":
                alert("Hide sections other than boots!");
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