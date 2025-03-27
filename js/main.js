document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with settings
    AOS.init({
        once: true,
        delay: 0
    });
    
    // Add a loading indicator when downloading resume
    const resumeBtn = document.querySelector('.resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function(e) {
            // Change the button text during download
            const originalText = resumeBtn.innerHTML;
            resumeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            
            // Reset the button text after download initiated
            setTimeout(function() {
                resumeBtn.innerHTML = originalText;
            }, 2000);
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't apply smooth scroll to download links
            if (!this.getAttribute('download') && !this.getAttribute('target')) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                if (href.startsWith('#')) {
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    // Fade out effect before changing page
                    document.body.style.opacity = 0;
                    setTimeout(function() {
                        window.location.href = href;
                    }, 300);
                }
            }
        });
    });
    
    // Add a subtle interactive hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Current year for copyright
    const footerYear = document.querySelector('footer');
    if (footerYear && footerYear.textContent.includes('©')) {
        footerYear.innerHTML = footerYear.innerHTML.replace('2025', new Date().getFullYear());
    }
});

// Mobile-specific adjustments
function handleMobileView() {
  // Check if on mobile
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Ensure proper height for mobile browsers
    document.querySelector('.container').style.height = `${window.innerHeight}px`;
    
    // Fix any scrolling issues with touch devices
    document.addEventListener('touchmove', function(e) {
      if (e.target.closest('.projects-grid, .contact-info, .availability')) {
        e.stopPropagation();
      }
    }, {passive: true});
  }
}

// Run on load and resize
window.addEventListener('load', handleMobileView);
window.addEventListener('resize', handleMobileView);
