console.log("My ad blocker running ahahhhhhhhh");
function hidePromotedPins(root) {
    root.querySelectorAll("div, span").forEach(el => {
        const text = el.textContent.trim();
        if (el.childElementCount === 0 && /^(Promoted|Promoted by|Sponsored)$/i.test(text)) {
            console.log("found ad label: ", el);
            el.style.outline = "3px solid red"
            const pin = el.closest("[data-grid-item], [role='listitem']");
            if (pin) pin.style.display = "none"
        }
    })
}

hidePromotedPins(document)
const observer = new MutationObserver(mutations => {
    for (const m of mutations) {
        for (const node of m.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE)
                hidePromotedPins(node)
        }
    }
});
observer.observe(document.body, { childList: true, subtree: true});