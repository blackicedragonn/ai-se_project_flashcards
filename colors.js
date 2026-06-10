const colorMap = {
    '#64d583': 'green',
    '#91a8f9': 'blue',
    '#ee955e': 'orange',
    '#ee92d7': 'pink',
    '#aa8ef0': 'purple',
    '#f5d770': 'yellow'
};

export function hexToString(hex) {
    const key = (hex || '').toLowerCase();
    return colorMap[key] || 'green';
}

export function removeColorClasses(el) {
    if (!el) return;
    const toRemove = [...el.classList].filter(c =>
        c.startsWith('deck_color_') || c.startsWith('carousel__card_color_')
    );
    toRemove.forEach(c => el.classList.remove(c));
}