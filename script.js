document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sidebar Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        dropdownMenu.classList.toggle('active');
    });

    // 2. Sub-menu Toggle Logic
    const aboutToggle = document.getElementById('about-toggle');
    const aboutSubmenu = document.getElementById('about-submenu');

    if(aboutToggle && aboutSubmenu) {
        aboutToggle.addEventListener('click', (e) => {
            e.preventDefault(); // Prevents page jumping
            aboutToggle.classList.toggle('open');
            aboutSubmenu.classList.toggle('open');
        });
    }

    // 3. Split 3D Photo & Text Carousel Logic
    const photos = document.querySelectorAll('.carousel-photo');
    const texts = document.querySelectorAll('.carousel-text');
    let currentIndex = 0;
    const totalItems = photos.length;

    if (totalItems > 0) {
        function updateCarousel() {
            const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
            const nextIndex = (currentIndex + 1) % totalItems;

            // Update 3D Photos
            photos.forEach((photo, index) => {
                photo.classList.remove('active', 'prev', 'next');
                if (index === currentIndex) {
                    photo.classList.add('active');
                } else if (index === prevIndex) {
                    photo.classList.add('prev');
                } else if (index === nextIndex) {
                    photo.classList.add('next');
                }
            });

            // Update Text Box
            texts.forEach((text, index) => {
                text.classList.remove('active');
                if (index === currentIndex) {
                    text.classList.add('active');
                }
            });
        }

        // Initialize first state
        updateCarousel();

        // Auto-play the slider
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }, 5000);

        // Allow clicking on background photos
        photos.forEach((photo, index) => {
            photo.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });
    }
});