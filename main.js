// Main JavaScript Logic

document.addEventListener('DOMContentLoaded', () => {

    const menuItems = document.querySelectorAll('.menu-item');
    const modal = document.getElementById('portfolioModal');
    const closeBtn = document.getElementById('closeBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalGallery = document.getElementById('modalGallery');

    // Portfolio Data Mapping (Will update with actual image paths)
    const portfolioData = {
        kitchen: {
            title: "Kitchen & Restaurant",
            images: [
                { src: 'assets/kitchen_portfolio.png', alt: 'Luxury Menu Design', label: 'Menu Layout' },
                { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800', alt: 'Restaurant Branding', label: 'Brand Identity' },
                { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800', alt: 'Food Photography', label: 'Food Photography' }
            ]
        },
        flyers: {
            title: "Flyers & Posters",
            images: [
                { src: 'assets/flyer_portfolio.png', alt: 'Festival Flyer', label: 'Event Flyer' },
                { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800', alt: 'Club Poster', label: 'Nightclub Poster' },
                { src: 'https://images.unsplash.com/photo-1533174000255-16fbcb78a486?auto=format&fit=crop&q=80&w=800', alt: 'Music Event', label: 'Music Event' }
            ]
        },
        mails: {
            title: "Email Design",
            images: [
                { src: 'assets/mails_portfolio.png', alt: 'Newsletter Design', label: 'Newsletter Campaign' },
                { src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800', alt: 'Promo Email', label: 'Marketing Promo' }
            ]
        },
        logos: {
            title: "Logo & Branding",
            images: [
                { src: 'assets/logo_portfolio.png', alt: 'Minimalist Logos', label: 'Modern Logos' },
                { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800', alt: 'Corporate Identity', label: 'Corporate Identity' },
                { src: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800', alt: 'Abstract Mark', label: 'Abstract Mark' }
            ]
        },
        motion: {
            title: "Motion Graphics",
            images: [
                { src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800', alt: '3D Render', label: 'Abstract 3D' },
                { src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800', alt: 'Retro Wave', label: 'Retro Wave' },
                { src: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&q=80&w=800', alt: 'Simulations', label: 'Simulations' }
            ]
        },
        twitter: {
            title: "Twitter Banners",
            images: [
                { src: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=800', alt: 'Sleek Banner', label: 'Dark Mode Banner' },
                { src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800', alt: 'Gradient Header', label: 'Gradient Header' }
            ]
        }
    };

    // Open Modal
    function openModal(category) {
        const data = portfolioData[category];
        if (!data) return;

        modalTitle.textContent = data.title;
        modalGallery.innerHTML = ''; // Clear previous items

        // Inject new items with stagger animation
        data.images.forEach((item, index) => {
            const delay = index * 0.1;
            const itemHTML = `
                <div class="gallery-item" style="animation-delay: ${delay}s">
                    <img src="${item.src}" alt="${item.alt}" loading="lazy" />
                    <div class="overlay">
                        <h4>${item.label}</h4>
                    </div>
                </div>
            `;
            modalGallery.insertAdjacentHTML('beforeend', itemHTML);
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Close Modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            modalGallery.innerHTML = '';
        }, 600); // Wait for transition to finish
    }

    // Attach Click Events
    menuItems.forEach(item => {
        item.addEventListener('click', function (e) {
            // Ripple Effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;

            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            setTimeout(() => {
                ripple.remove();
            }, 600);

            const category = this.getAttribute('data-category');

            // Open modal after small delay for ripple to show
            setTimeout(() => {
                openModal(category);
            }, 300);
        });
    });

    closeBtn.addEventListener('click', closeModal);

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
