// Shadowrun 5th Edition Wiki - Lightweight Search Functionality

(function() {
    'use strict';

    // Search index data structure
    let searchIndex = [];

    // Initialize search index from all pages
    function initSearchIndex() {
        const searchableElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, td, th');
        
        searchableElements.forEach((element, index) => {
            if (element.tagName && element.textContent.trim()) {
                const id = element.id || `search-item-${index}`;
                const text = element.textContent.toLowerCase().trim();
                const title = element.tagName.match(/H[1-6]/) ? element.textContent.trim() : '';
                const parentSection = element.closest('[id]');
                const sectionId = parentSection ? parentSection.id : '';
                
                // Only add meaningful content (skip very short text)
                if (text.length > 10) {
                    searchIndex.push({
                        id: id,
                        text: text,
                        title: title,
                        sectionId: sectionId,
                        tagName: element.tagName.toLowerCase(),
                        preview: text.substring(0, 150)
                    });
                }
            }
        });
    }

    // Search function
    function search(query) {
        if (!query || query.trim().length === 0) {
            return [];
        }

        const searchTerm = query.toLowerCase().trim();
        const results = [];

        searchIndex.forEach(item => {
            const relevance = calculateRelevance(item, searchTerm);
            if (relevance > 0) {
                results.push({
                    ...item,
                    relevance: relevance
                });
            }
        });

        // Sort by relevance
        results.sort((a, b) => b.relevance - a.relevance);

        return results.slice(0, 20); // Limit to top 20 results
    }

    // Calculate relevance score
    function calculateRelevance(item, searchTerm) {
        let score = 0;
        const words = searchTerm.split(/\s+/);

        // Exact match in title gets highest score
        if (item.title && item.title.toLowerCase().includes(searchTerm)) {
            score += 100;
        }

        // Exact match in text
        if (item.text.includes(searchTerm)) {
            score += 50;
        }

        // Word-by-word matching
        words.forEach(word => {
            if (word.length > 2) {
                if (item.title && item.title.toLowerCase().includes(word)) {
                    score += 20;
                }
                if (item.text.includes(word)) {
                    score += 10;
                }
            }
        });

        // Boost headers
        if (item.tagName.match(/h[1-3]/)) {
            score += 15;
        }

        return score;
    }

    // Render search results
    function renderResults(results, container) {
        container.innerHTML = '';

        if (results.length === 0) {
            container.innerHTML = '<div class="search-result-item">No results found</div>';
            return;
        }

        results.forEach(result => {
            const div = document.createElement('div');
            div.className = 'search-result-item';
            
            const title = result.title || 'Content';
            const href = result.sectionId ? `#${result.sectionId}` : (result.id ? `#${result.id}` : '');
            
            div.innerHTML = `
                <h4>${escapeHtml(title)}</h4>
                <p>${escapeHtml(result.preview)}...</p>
            `;
            
            div.addEventListener('click', () => {
                if (href) {
                    window.location.href = href;
                }
            });
            
            container.appendChild(div);
        });
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Setup search input handler
    function setupSearch() {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');

        if (!searchInput || !searchResults) {
            return;
        }

        let debounceTimer;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            
            debounceTimer = setTimeout(() => {
                const query = e.target.value;
                const results = search(query);
                renderResults(results, searchResults);
            }, 200);
        });

        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.innerHTML = '';
            }
        });
    }

    // Highlight search term in page (optional feature)
    function highlightSearchTerm(term) {
        if (!term) return;
        
        const body = document.body;
        const regex = new RegExp(`(${term})`, 'gi');
        
        // This is a simple implementation - can be enhanced
        console.log('Highlighting term:', term);
    }

    // Check URL for search parameter
    function checkURLForSearch() {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('q');
        
        if (searchQuery) {
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.value = searchQuery;
                const results = search(searchQuery);
                const searchResults = document.getElementById('search-results');
                if (searchResults) {
                    renderResults(results, searchResults);
                }
            }
        }
    }

    // Initialize on DOM ready
    function init() {
        initSearchIndex();
        setupSearch();
        checkURLForSearch();
        
        console.log('SR5 Wiki Search initialized with', searchIndex.length, 'searchable items');
    }

    // Run initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose search function globally for potential external use
    window.SR5Search = {
        search: search,
        getIndex: () => searchIndex
    };

})();
