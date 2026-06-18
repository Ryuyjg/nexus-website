// Client-side Router for Nexa Workspace SPA
const Router = {
  routes: ['home', 'services', 'portfolio', 'blog', 'careers', 'faq', 'about', 'pricing', 'status', 'contact', 'admin'],
  defaultRoute: 'home',

  init() {
    window.addEventListener('hashchange', () => this.handleRouting());
    window.addEventListener('load', () => this.handleRouting());
  },

  handleRouting() {
    let hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash) {
      hash = this.defaultRoute;
    }

    if (!this.routes.includes(hash)) {
      hash = this.defaultRoute;
      window.location.hash = `#${this.defaultRoute}`;
      return;
    }

    const publicWrapper = document.getElementById('public-view-wrapper');
    const adminView = document.getElementById('view-admin');

    if (hash === 'admin') {
      // Hide public scrolling wrapper, show admin dashboard
      if (publicWrapper) publicWrapper.style.display = 'none';
      if (adminView) {
        adminView.style.display = 'block';
        // Trigger admin initializer
        if (window.AdminPanel) window.AdminPanel.init();
      }
      
      // Clear navbar highlights
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
      });
    } else {
      // Show public scrolling wrapper, hide admin dashboard
      if (publicWrapper) publicWrapper.style.display = 'block';
      if (adminView) adminView.style.display = 'none';

      // Smooth scroll to target section with sticky header offset
      const targetSec = document.getElementById(hash);
      if (targetSec) {
        const headerOffset = 80;
        const elementPosition = targetSec.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }

      // Notify App of page enter
      if (window.App && typeof window.App.onPageEnter === 'function') {
        window.App.onPageEnter(hash);
      }
    }
  }
};

window.Router = Router;
