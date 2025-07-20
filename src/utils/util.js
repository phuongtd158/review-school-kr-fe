export const encryptKeys = {
    key: '6WJ30c6GFnXYopfmkLUD',
    iv: 'S9HhTmyI2xCpw9l78w6Z',
};
export function registerSvgIcons() {
    const modules = import.meta.glob('../assets/icons/**/*.svg', {
        as: 'raw',
        eager: true,
    });
    // Xử lý register manual nếu cần
    console.log('SVG modules loaded:', Object.keys(modules));
}
