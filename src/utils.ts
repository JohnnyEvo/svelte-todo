export function elementsOverlap(element1: HTMLElement, element2 : HTMLElement) {
    const domRectElement1 = element1.getBoundingClientRect();
    const domRectElement2 = element2.getBoundingClientRect();

    return !(
        domRectElement1.top > domRectElement2.bottom ||
        domRectElement1.right < domRectElement2.left ||
        domRectElement1.bottom < domRectElement2.top ||
        domRectElement1.left > domRectElement2.right
    );
}
