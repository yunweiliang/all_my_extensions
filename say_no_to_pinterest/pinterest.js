

let hideSomething = false;

function hidePromotedPins(root) {
    root.querySelectorAll("div, span").forEach(checkLabel)
    checkLabel(root)
}

function checkLabel(el) {
    if (!(el instanceof Element)) return; 
    if (el.childElementCount !== 0) return;
    if (!/^(Promoted|Promoted by|Sponsored)$/i.test(el.textContent.trim())) return;

    const pin = el.closest("[data-grid-item], [role='listitem']");
    if (pin && pin.style.display !== "none") {
        pin.style.display = "none"
        hideSomething = true;
    }
}

function reshuffleIfNeeded() {
    if (!hideSomething) return;
    hideSomething = false;
    window.dispatchEvent(new Event("resize"))
}

hidePromotedPins(document)
reshuffleIfNeeded()

const changed = new Set();
let scheduled = false; 

const observer = new MutationObserver(mutations => {
    for (const m of mutations) {
        changed.add(m.target);
    }
    if (scheduled) return;

    scheduled = true;

    requestAnimationFrame(() => {
        scheduled = false;
        for (const el of changed) hidePromotedPins(el);
        changed.clear() 
        reshuffleIfNeeded()
    })
});
observer.observe(document.body, { childList: true, subtree: true});