// Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        
        const filterBtn = document.querySelector('.filter-button'); // Your button
        const filterDropdown = document.getElementById('filterDropdown'); // The drawer
        const cards = document.querySelectorAll('.property-card'); // All houses
        const countLabel = document.querySelector('.results-count'); // "Showing 6 properties"

        // TOGGLE DROPDOWN FUNCTION
        filterBtn.addEventListener('click', () => {
            // If hidden, show it. If shown, hide it.
            if (filterDropdown.style.display === 'none' || filterDropdown.style.display === '') {
                filterDropdown.style.display = 'block';
            } else {
                filterDropdown.style.display = 'none';
            }
        });

        // FILTER FUNCTION
        function filterProperties(category) {
            let visibleCount = 0;

            // Update the buttons to show which is active
            const buttons = document.querySelectorAll('.filter-tag');
            buttons.forEach(btn => {
                // Simple logic: If button text matches category, make it orange
                if (btn.textContent.toLowerCase() === category || (category === 'all' && btn.textContent === 'All')) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            // Loop through all cards to show/hide them
            cards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block'; // Show it
                    visibleCount++;
                } else {
                    card.style.display = 'none'; // Hide it
                }
            });

            // Update the "Showing X properties" text
            countLabel.textContent = `Showing ${visibleCount} properties`;
        }