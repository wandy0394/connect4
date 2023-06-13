
export const theme = {
    primaryColor:window.getComputedStyle(document.body).getPropertyValue('--primary-color'),
    primaryColorHover:window.getComputedStyle(document.body).getPropertyValue('--primary-hover'),
    secondaryColor:window.getComputedStyle(document.body).getPropertyValue('--secondary-color'),
    secondaryColorHover:window.getComputedStyle(document.body).getPropertyValue('--secondary-hover'),
    baseColor:window.getComputedStyle(document.body).getPropertyValue('--base-color'),
    baseLight:window.getComputedStyle(document.body).getPropertyValue('--base-light'),
}