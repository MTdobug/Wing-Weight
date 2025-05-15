export function hidePreloader() {

    const preloader = document.getElementById(`preloader`);

    window.addEventListener('load', () => {

        setTimeout(() => {
            preloader.style.transition = 'opacity 0.5s ease'; 
            preloader.style.opacity = '0'; 
        
        
            setTimeout(() => {
            preloader.style.display = 'none'; 
            }, 500); 
        }, 1500);
    });
}