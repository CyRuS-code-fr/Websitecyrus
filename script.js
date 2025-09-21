// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Features section functionality
    const featureNavItems = document.querySelectorAll('.feature-nav-item');
    const featureCards = document.querySelectorAll('.feature-card');

    featureNavItems.forEach(item => {
        item.addEventListener('click', () => {
            const feature = item.getAttribute('data-feature');

            // Update active nav item
            featureNavItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Show corresponding feature card
            featureCards.forEach(card => {
                card.classList.remove('active');
                if (card.id === feature) {
                    card.classList.add('active');
                }
            });
        });
    });

    // Initialize user counter animation
    animateUserCount();

    // Initialize GIF Hub
    initGifHub();
});

// Animate user count on page load
function animateUserCount() {
    const userCountElement = document.getElementById('user-count');
    const guildCountElement = document.getElementById('guild-count');
    const targetUserCount = '20k+';
    const targetGuildCount = '10+';
    let currentUserCount = 0;
    let currentGuildCount = 0;
    const userIncrement = targetUserCount / 100;
    const guildIncrement = targetGuildCount / 100;

    const timer = setInterval(() => {
        currentUserCount += userIncrement;
        currentGuildCount += guildIncrement;

        if (currentUserCount >= targetUserCount) {
            currentUserCount = targetUserCount;
            currentGuildCount = targetGuildCount;
            clearInterval(timer);
        }
        userCountElement.textContent = Math.floor(currentUserCount).toLocaleString();
        guildCountElement.textContent = Math.floor(currentGuildCount).toLocaleString();
    }, 20);
}

// GIF Hub functionality
function initGifHub() {
    const searchInput = document.getElementById('gif-search-input');
    const searchBtn = document.getElementById('gif-search-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const gifGrid = document.getElementById('gif-grid');
    const modal = document.getElementById('gif-modal');
    const modalGif = document.getElementById('modal-gif');
    const modalTitle = document.getElementById('gif-title');
    const closeModal = document.querySelector('.close-modal');
    const copyUrlBtn = document.getElementById('copy-gif-url');
    const downloadBtn = document.getElementById('download-gif');

    let currentGifs = [];
    let currentSelectedGif = null;

    // Load trending GIFs on page load
    loadTrendingGifs();

    // Search functionality
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            if (category === 'trending') {
                loadTrendingGifs();
            } else {
                loadCategoryGifs(category);
            }
        });
    });

    // Modal functionality
    closeModal.addEventListener('click', closeGifModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeGifModal();
        }
    });

    copyUrlBtn.addEventListener('click', copyGifUrl);
    downloadBtn.addEventListener('click', downloadGif);

    // Functions
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            searchGifs(query);
        }
    }

    function loadTrendingGifs() {
        showLoading();
        // Simulate API call for trending GIFs
        setTimeout(() => {
            const trendingGifs = generateSampleGifs('trending');
            displayGifs(trendingGifs);
        }, 1000);
    }

    function loadCategoryGifs(category) {
        showLoading();
        // Simulate API call for category GIFs
        setTimeout(() => {
            const categoryGifs = generateSampleGifs(category);
            displayGifs(categoryGifs);
        }, 1000);
    }

    function searchGifs(query) {
        showLoading();
        // Simulate API call for search
        setTimeout(() => {
            const searchResults = generateSampleGifs(query);
            displayGifs(searchResults);
        }, 1000);
    }

    function generateSampleGifs(category) {
        // Generate sample GIF data (in real implementation, this would come from an API like GIPHY)
        const sampleGifs = [];
        const gifs = {
            trending: [
                { id: 1, title: 'Funny Cat Dance', url: 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif', thumb: 'https://media.giphy.com/media/JIX9t2j0ZTN9S/200.gif' },
                { id: 2, title: 'Celebration Time', url: 'https://media.giphy.com/media/Is1O1TWV0LEJi/giphy.gif', thumb: 'https://media.giphy.com/media/Is1O1TWV0LEJi/200.gif' },
                { id: 3, title: 'Mind Blown', url: 'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif', thumb: 'https://media.giphy.com/media/26ufdipQqU2lhNA4g/200.gif' },
                { id: 4, title: 'Dancing Dog', url: 'https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif', thumb: 'https://media.giphy.com/media/13CoXDiaCcCoyk/200.gif' },
                { id: 5, title: 'Epic Fail', url: 'https://media.giphy.com/media/l2Je66zG6mAAZxgqI/giphy.gif', thumb: 'https://media.giphy.com/media/l2Je66zG6mAAZxgqI/200.gif' },
                { id: 6, title: 'Happy Dance', url: 'https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif', thumb: 'https://media.giphy.com/media/11sBLVxNs7v6WA/200.gif' },
            ],
            reactions: [
                { id: 7, title: 'Thumbs Up', url: 'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif', thumb: 'https://media.giphy.com/media/111ebonMs90YLu/200.gif' },
                { id: 8, title: 'Clapping', url: 'https://media.giphy.com/media/7rj2ZgttvgomY/giphy.gif', thumb: 'https://media.giphy.com/media/7rj2ZgttvgomY/200.gif' },
                { id: 9, title: 'Eye Roll', url: 'https://media.giphy.com/media/Rhhr8D5mKSX7O/giphy.gif', thumb: 'https://media.giphy.com/media/Rhhr8D5mKSX7O/200.gif' },
                { id: 10, title: 'Shocked', url: 'https://media.giphy.com/media/PFwKHjOcIoVUc/giphy.gif', thumb: 'https://media.giphy.com/media/PFwKHjOcIoVUc/200.gif' },
                { id: 11, title: 'Laughing', url: 'https://media.giphy.com/media/T3Vx6sVAXzuG4/giphy.gif', thumb: 'https://media.giphy.com/media/T3Vx6sVAXzuG4/200.gif' },
                { id: 12, title: 'Crying', url: 'https://media.giphy.com/media/L95W4wv8nnb9K/giphy.gif', thumb: 'https://media.giphy.com/media/L95W4wv8nnb9K/200.gif' },
            ],
            anime: [
                { id: 13, title: 'Anime High Five', url: 'https://media.giphy.com/media/BdghqxNFV4efm/giphy.gif', thumb: 'https://media.giphy.com/media/BdghqxNFV4efm/200.gif' },
                { id: 14, title: 'Kawaii Smile', url: 'https://media.giphy.com/media/12PA1eI8FBqEBa/giphy.gif', thumb: 'https://media.giphy.com/media/12PA1eI8FBqEBa/200.gif' },
                { id: 15, title: 'Anime Wink', url: 'https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif', thumb: 'https://media.giphy.com/media/MDJ9IbxxvDUQM/200.gif' },
                { id: 16, title: 'Excited Anime', url: 'https://media.giphy.com/media/11KzOet1ElBDz2/giphy.gif', thumb: 'https://media.giphy.com/media/11KzOet1ElBDz2/200.gif' },
                { id: 17, title: 'Anime Run', url: 'https://media.giphy.com/media/8L0yOaWLNmHnm2/giphy.gif', thumb: 'https://media.giphy.com/media/8L0yOaWLNmHnm2/200.gif' },
                { id: 18, title: 'Anime Sparkles', url: 'https://media.giphy.com/media/ZVik7pBtu9dNS/giphy.gif', thumb: 'https://media.giphy.com/media/ZVik7pBtu9dNS/200.gif' },
            ],
            memes: [
                { id: 19, title: 'This is Fine', url: 'https://media.giphy.com/media/QBd2kLB5qDmysEXre9/giphy.gif', thumb: 'https://media.giphy.com/media/QBd2kLB5qDmysEXre9/200.gif' },
                { id: 20, title: 'Drake No Yes', url: 'https://media.giphy.com/media/fXnRObM8Q0RkOmR5nf/giphy.gif', thumb: 'https://media.giphy.com/media/fXnRObM8Q0RkOmR5nf/200.gif' },
                { id: 21, title: 'Stonks', url: 'https://media.giphy.com/media/YnkMcHgNIMW4Yfmjxr/giphy.gif', thumb: 'https://media.giphy.com/media/YnkMcHgNIMW4Yfmjxr/200.gif' },
                { id: 22, title: 'Big Brain', url: 'https://media.giphy.com/media/d3mlE7uhX8KFgEmY/giphy.gif', thumb: 'https://media.giphy.com/media/d3mlE7uhX8KFgEmY/200.gif' },
                { id: 23, title: 'Pepe Dance', url: 'https://media.giphy.com/media/l378bu6ZYmzS6nBrW/giphy.gif', thumb: 'https://media.giphy.com/media/l378bu6ZYmzS6nBrW/200.gif' },
                { id: 24, title: 'Confused Math', url: 'https://media.giphy.com/media/4JVTF9zR9BicshFAb7/giphy.gif', thumb: 'https://media.giphy.com/media/4JVTF9zR9BicshFAb7/200.gif' },
            ],
            gaming: [
                { id: 25, title: 'Victory Dance', url: 'https://media.giphy.com/media/fDbzXb6Cv5L56/giphy.gif', thumb: 'https://media.giphy.com/media/fDbzXb6Cv5L56/200.gif' },
                { id: 26, title: 'Game Over', url: 'https://media.giphy.com/media/l41lUJ1YoZB1lHVPG/giphy.gif', thumb: 'https://media.giphy.com/media/l41lUJ1YoZB1lHVPG/200.gif' },
                { id: 27, title: 'Level Up', url: 'https://media.giphy.com/media/MSgJnzn6vJaodkKvJN/giphy.gif', thumb: 'https://media.giphy.com/media/MSgJnzn6vJaodkKvJN/200.gif' },
                { id: 28, title: 'Epic Win', url: 'https://media.giphy.com/media/3o7qDEq2bMbcbPRQ2c/giphy.gif', thumb: 'https://media.giphy.com/media/3o7qDEq2bMbcbPRQ2c/200.gif' },
                { id: 29, title: 'Rage Quit', url: 'https://media.giphy.com/media/14ut8PhnIwzros/giphy.gif', thumb: 'https://media.giphy.com/media/14ut8PhnIwzros/200.gif' },
                { id: 30, title: 'GG Well Played', url: 'https://media.giphy.com/media/3o6gDWinp9Ek8ZNheE/giphy.gif', thumb: 'https://media.giphy.com/media/3o6gDWinp9Ek8ZNheE/200.gif' },
            ]
        };

        const selectedGifs = gifs[category] || gifs.trending;
        return selectedGifs.slice(0, 12); // Return max 12 GIFs
    }

    function displayGifs(gifs) {
        currentGifs = gifs;
        gifGrid.innerHTML = '';

        if (gifs.length === 0) {
            gifGrid.innerHTML = `
                <div class="gif-placeholder">
                    <i class="fas fa-search"></i>
                    <p>No GIFs found. Try a different search term.</p>
                </div>
            `;
            return;
        }

        gifs.forEach(gif => {
            const gifElement = createGifElement(gif);
            gifGrid.appendChild(gifElement);
        });
    }

    function createGifElement(gif) {
        const gifItem = document.createElement('div');
        gifItem.className = 'gif-item';
        gifItem.innerHTML = `
            <img src="${gif.thumb}" alt="${gif.title}" loading="lazy">
            <div class="gif-overlay">
                <span>${gif.title}</span>
            </div>
        `;

        gifItem.addEventListener('click', () => openGifModal(gif));
        return gifItem;
    }

    function openGifModal(gif) {
        currentSelectedGif = gif;
        modalGif.src = gif.url;
        modalTitle.textContent = gif.title;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeGifModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        currentSelectedGif = null;
    }

    function copyGifUrl() {
        if (currentSelectedGif) {
            navigator.clipboard.writeText(currentSelectedGif.url).then(() => {
                showNotification('GIF URL copied to clipboard!');
            }).catch(() => {
                // Fallback for browsers that don't support clipboard API
                const textArea = document.createElement('textarea');
                textArea.value = currentSelectedGif.url;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification('GIF URL copied to clipboard!');
            });
        }
    }

    function downloadGif() {
        if (currentSelectedGif) {
            const link = document.createElement('a');
            link.href = currentSelectedGif.url;
            link.download = `${currentSelectedGif.title.replace(/\s+/g, '_')}.gif`;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showNotification('Download started!');
        }
    }

    function showLoading() {
        gifGrid.innerHTML = `
            <div class="gif-placeholder">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading GIFs...</p>
            </div>
        `;
    }

    function showNotification(message) {
        // Create and show a temporary notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #ff6b9d, #ff8cc8);
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            z-index: 3000;
            font-weight: 500;
            box-shadow: 0 5px 15px rgba(255, 107, 157, 0.3);
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 3000);
    }
}

// Add some interactive effects
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, #ff6b9d, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.6;
            transition: all 0.1s ease;
        `;
        document.body.appendChild(newCursor);
    }

    const actualCursor = document.querySelector('.cursor');
    actualCursor.style.left = e.clientX + 'px';
    actualCursor.style.top = e.clientY + 'px';
});

// Parallax effect for hero background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards for animation
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
