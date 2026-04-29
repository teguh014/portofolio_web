document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Active Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Adjust for sticky header height
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 4. Form Submission Simulation
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            // Loading state
            btn.textContent = 'Sending...';
            btn.disabled = true;
            
            // Simulate network request
            setTimeout(() => {
                btn.textContent = 'Message Sent!';
                btn.style.backgroundColor = '#10b981'; // Success color
                btn.style.color = '#fff';
                
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // 5. Reveal Animations on Scroll (Simple implementation)
    const revealElements = document.querySelectorAll('.skill-category, .project-card, .stat-box');
    
    // Initial style for reveal elements
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 50;

        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    // 6. Project Modal Logic
    const modal = document.getElementById("projectModal");
    const modalImg = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDescription");
    const modalLink = document.getElementById("modalLink");
    const closeBtn = document.querySelector(".close-modal");
    
    if(modal) {
        // Open modal on project card click
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function(e) {
                // If they clicked the overlay button, don't open modal, let it go to the link
                if(e.target.closest('.project-overlay a')) return;
                
                const img = this.querySelector('img').src;
                const title = this.querySelector('.project-title').textContent;
                const desc = this.querySelector('.project-description').textContent;
                const linkElem = this.querySelector('.project-overlay a');
                
                modalImg.src = img;
                modalTitle.textContent = title;
                modalDesc.textContent = desc;
                
                if (linkElem) {
                    modalLink.href = linkElem.href;
                    modalLink.textContent = `View on ${linkElem.textContent}`;
                    modalLink.style.display = 'inline-block';
                } else {
                    modalLink.style.display = 'none';
                }
                
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        // Close modal
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        });

        // Close when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }
});
