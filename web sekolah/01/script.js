document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const indicators = document.querySelectorAll('.indicator span');
    const items = document.querySelectorAll('.carousel-item');
    
    let currentIndex = 0;
    const itemWidth = carousel.offsetWidth * 0.33; // 33% of container width
    const totalItems = items.length;
    const visibleItems = 3;
    const maxIndex = totalItems - visibleItems;

    // Update indicator styles
    const updateIndicators = () => {
        indicators.forEach((indicator, index) => {
            if (index === Math.floor(currentIndex / visibleItems)) {
                indicator.style.backgroundColor = '#0066cc';
            } else {
                indicator.style.backgroundColor = 'white';
            }
        });
    };

    // Scroll to position
    const scrollToPosition = (index) => {
        carousel.scrollTo({
            left: index * itemWidth,
            behavior: 'smooth'
        });
        currentIndex = index;
        updateIndicators();
        
        // Update button states
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
    };

    // Previous button click handler
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            scrollToPosition(currentIndex - 1);
        }
    });

    // Next button click handler
    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            scrollToPosition(currentIndex + 1);
        }
    });

    // Indicator click handlers
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            scrollToPosition(index * visibleItems);
        });
    });

    // Handle touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > 50) { // Minimum swipe distance
            if (difference > 0 && currentIndex < maxIndex) {
                // Swipe left
                scrollToPosition(currentIndex + 1);
            } else if (difference < 0 && currentIndex > 0) {
                // Swipe right
                scrollToPosition(currentIndex - 1);
            }
        }
    });

    // Auto advance carousel every 5 seconds
    let autoScrollInterval = setInterval(() => {
        if (currentIndex < maxIndex) {
            scrollToPosition(currentIndex + 1);
        } else {
            scrollToPosition(0); // Reset to beginning
        }
    }, 5000);

    // Pause auto-scroll when hovering over carousel
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });

    // Resume auto-scroll when mouse leaves carousel
    carousel.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(() => {
            if (currentIndex < maxIndex) {
                scrollToPosition(currentIndex + 1);
            } else {
                scrollToPosition(0);
            }
        }, 5000);
    });

    // Initial setup
    updateIndicators();
    prevBtn.style.opacity = '0.5'; // Initially disable prev button
});