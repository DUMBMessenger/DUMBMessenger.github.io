const elements = document.querySelectorAll('.feature, .member .header-dumb .header-dumb-1 .header-dumb-2'); // TODO: fix .header-dumb-1, .header-dumb-2
const positions = new Map();

elements.forEach(el => positions.set(el, { y: 0 }));

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function updateLiquidScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    elements.forEach(el => {
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
