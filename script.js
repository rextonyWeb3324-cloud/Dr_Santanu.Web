document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sidebar Menu Toggle (Left-Side Menu)
    const menuToggle = document.getElementById('menu-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');

    if (menuToggle && dropdownMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents click from instantly triggering document listener
            menuToggle.classList.toggle('active');
            dropdownMenu.classList.toggle('active');
        });

        // Prevent clicks inside the menu from closing it
        dropdownMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Close menu when clicking anywhere outside of it
        document.addEventListener('click', () => {
            if (dropdownMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                dropdownMenu.classList.remove('active');
            }
        });
    }

    // 2. Patient Information Sub-menu Toggle Logic (Accordion inside Menu)
    const patientToggle = document.getElementById('patient-info-toggle');
    const patientSubmenu = document.getElementById('patient-info-submenu');

    if (patientToggle && patientSubmenu) {
        patientToggle.addEventListener('click', (e) => {
            e.preventDefault(); // Prevents page jumping
            e.stopPropagation(); // Prevents menu from closing when expanding accordion
            patientToggle.classList.toggle('open');
            patientSubmenu.classList.toggle('open');
        });
    }

    // 3. Split 3D Photo & Text Carousel Logic (Runs only if carousel elements exist on the page)
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

    // 4. Automatic Image Carousel Rotation
    const carousels = document.querySelectorAll("[data-carousel]");
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll(".carousel-slide");
        if (slides.length < 2) return;
        
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
        }, 4000); // Changes image every 4 seconds
    });

    // 5. Disclaimer & Copyright Modal Script (Safeguarded)
    const legalModal = document.getElementById('legalModal');
    const legalLink = document.getElementById('disclaimer-link');
    const legalClose = document.getElementById('legalClose');

    if (legalModal && legalLink) {
        legalLink.addEventListener('click', (e) => {
            e.preventDefault();
            legalModal.style.display = 'flex';
        });

        if (legalClose) {
            legalClose.addEventListener('click', () => {
                legalModal.style.display = 'none';
            });
        }

        legalModal.addEventListener('click', (e) => {
            if (e.target === legalModal) {
                legalModal.style.display = 'none';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && legalModal.style.display === 'flex') {
                legalModal.style.display = 'none';
            }
        });
    }
});
