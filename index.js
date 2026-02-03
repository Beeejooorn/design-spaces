// Mobile menu toggle functionality
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking on a navigation link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// Smooth scroll functionality for anchor links
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

// Properties Search & Filter Functionality (for properties.html)
const searchInput = document.getElementById('searchInput');
const filterBtn = document.getElementById('filterBtn');
const filterDropdown = document.getElementById('filterDropdown');
const filterTags = document.querySelectorAll('.filter-tag');
const propertyCards = document.querySelectorAll('.property-card');
const resultsCount = document.getElementById('resultsCount');
const noResults = document.getElementById('noResults');

let currentFilter = 'all'; // Initial filter state

// Check if search/filter elements exist before adding event listeners
if (searchInput && filterBtn && filterDropdown && filterTags.length > 0 && propertyCards.length > 0) {
  // Toggle filter dropdown visibility
  filterBtn.addEventListener('click', () => {
    filterDropdown.style.display = (filterDropdown.style.display === 'none' || filterDropdown.style.display === '') ? 'block' : 'none';
  });

  // Real-time search functionality based on input
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    filterAndSearch(searchTerm, currentFilter);
  });

  // Event listeners for filter tags
  filterTags.forEach(tag => {
    tag.addEventListener('click', function() {
      // Remove 'active' class from all filter tags
      filterTags.forEach(t => t.classList.remove('active'));
      // Add 'active' class to the clicked tag
      this.classList.add('active');

      // Update current filter based on data-filter attribute
      currentFilter = this.getAttribute('data-filter');

      // Get current search term from the input field
      const searchTerm = searchInput.value.toLowerCase().trim();

      // Apply both filter and search
      filterAndSearch(searchTerm, currentFilter);
    });
  });

  /**
   * Filters and searches property cards based on a search term and filter type.
   * @param {string} searchTerm - The text to search for within property names, types, and locations.
   * @param {string} filterType - The category to filter properties by ('all' or a specific category).
   */
  function filterAndSearch(searchTerm, filterType) {
    let visibleCount = 0;

    propertyCards.forEach(card => {
      const propertyName = card.getAttribute('data-name').toLowerCase();
      const propertyType = card.getAttribute('data-category').toLowerCase();
      const propertyLocation = card.getAttribute('data-location').toLowerCase();

      // Determine if the property matches the search term
      const matchesSearch = searchTerm === '' ||
                            propertyName.includes(searchTerm) ||
                            propertyType.includes(searchTerm) ||
                            propertyLocation.includes(searchTerm);

      // Determine if the property matches the selected filter type
      const matchesFilter = filterType === 'all' || propertyType === filterType;

      // Show or hide the card based on both conditions
      if (matchesSearch && matchesFilter) {
        card.classList.remove('hidden');
        card.style.display = 'block'; // Ensure it's visible
        visibleCount++;
      } else {
        card.classList.add('hidden');
        card.style.display = 'none'; // Ensure it's hidden
      }
    });

    // Update the displayed results count and 'no results' message
    updateResults(visibleCount);
  }

  /**
   * Updates the display for the number of visible results or a 'no results' message.
   * @param {number} count - The number of currently visible property cards.
   */
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
}