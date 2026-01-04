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

        // Properties Search & Filter Functionality
        const searchInput = document.getElementById('searchInput');
        const filterBtn = document.getElementById('filterBtn');
        const filterDropdown = document.getElementById('filterDropdown');
        const filterTags = document.querySelectorAll('.filter-tag');
        const propertyCards = document.querySelectorAll('.property-card');
        const resultsCount = document.getElementById('resultsCount');
        const noResults = document.getElementById('noResults');

        let currentFilter = 'all';

        // Toggle filter dropdown
        filterBtn.addEventListener('click', () => {
            if (filterDropdown.style.display === 'none' || filterDropdown.style.display === '') {
                filterDropdown.style.display = 'block';
            } else {
                filterDropdown.style.display = 'none';
            }
        });

        // Real-time search functionality
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            filterAndSearch(searchTerm, currentFilter);
        });

        // Filter tag click handlers
        filterTags.forEach(tag => {
            tag.addEventListener('click', function() {
                // Remove active class from all tags
                filterTags.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tag
                this.classList.add('active');
                
                // Get filter value
                currentFilter = this.getAttribute('data-filter');
                
                // Get current search term
                const searchTerm = searchInput.value.toLowerCase().trim();
                
                // Apply filter and search
                filterAndSearch(searchTerm, currentFilter);
            });
        });

        // Main filter and search function
        function filterAndSearch(searchTerm, filterType) {
            let visibleCount = 0;

            propertyCards.forEach(card => {
                const propertyName = card.getAttribute('data-name').toLowerCase();
                const propertyType = card.getAttribute('data-category').toLowerCase();
                const propertyLocation = card.getAttribute('data-location').toLowerCase();

                // Check if property matches search term
                const matchesSearch = searchTerm === '' || 
                                    propertyName.includes(searchTerm) || 
                                    propertyType.includes(searchTerm) ||
                                    propertyLocation.includes(searchTerm);

                // Check if property matches filter type
                const matchesFilter = filterType === 'all' || propertyType === filterType;

                // Show/hide card based on both search and filter
                if (matchesSearch && matchesFilter) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });

            // Update results count and no results message
            updateResults(visibleCount);
        }

        // Update results display
        function updateResults(count) {
            if (count === 0) {
                resultsCount.style.display = 'none';
                noResults.style.display = 'block';
            } else {
                resultsCount.style.display = 'block';
                noResults.style.display = 'none';
                resultsCount.textContent = `Showing ${count} ${count === 1 ? 'property' : 'properties'}`;
            }
        }