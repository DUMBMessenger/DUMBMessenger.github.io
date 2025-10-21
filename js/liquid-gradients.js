const positions = new Map();

function lerp(a, b, t) { return a + (b - a) * t; }

function updateLiquidScroll() {
    const windowHeight = window.innerHeight;
    const currentElements = document.querySelectorAll('.feature, .member');  // TODO: add .header-dumb-1, .header-dumb-2

    currentElements.forEach(el => {
        if (!positions.has(el)) positions.set(el, { y: 0 });

        const rect = el.getBoundingClientRect();
        const currentPos = positions.get(el);
        const targetY = Math.max(Math.min(windowHeight / 2 - rect.top, 15), -15);

        if (rect.bottom > 0 && rect.top < windowHeight) {
            currentPos.y = lerp(currentPos.y, targetY, 0.08);
            el.style.transform = `translateY(${currentPos.y}px)`;
        }
    });

    requestAnimationFrame(updateLiquidScroll);
}

updateLiquidScroll();
