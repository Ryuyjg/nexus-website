// Application Core Logic & Page Render Engines
const App = {
  config: {},
  chartInterval: null,
  pingerInterval: null,

  init() {
    // 1. Load active configuration from Store
    this.config = window.Store.loadConfig();
    
    // 2. Setup theme toggle listener (in header)
    this.setupThemeToggle();

    // 3. Render common elements (Navbar & Footer)
    this.renderHeaderFooter();

    // 4. Render all public sections once for continuous scrolling
    this.renderAllPublicSections();

    // 5. Initialize scroll reveal & nav active highlights
    this.initScrollReveal();

    // 6. Start real-time System Status pinger
    this.initSystemStatusPinger();

    // 7. Initialize client-side router
    window.Router.init();
  },

  // Dynamic Navbar and Footer Updates
  renderHeaderFooter() {
    const logoIconEl = document.querySelector('.logo-icon');
    const logoTextEl = document.getElementById('logo-text');
    if (logoIconEl) logoIconEl.textContent = this.config.general.logoIcon;
    if (logoTextEl) logoTextEl.textContent = this.config.general.logoText;

    const footerCompany = document.getElementById('footer-company-name');
    const footerCopyright = document.getElementById('footer-copyright');
    if (footerCompany) footerCompany.textContent = this.config.general.companyName;
    if (footerCopyright) footerCopyright.textContent = this.config.general.copyright;
  },

  setupThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    this.updateThemeToggleIcon(this.config.general.isDarkTheme);

    toggleBtn.addEventListener('click', () => {
      this.config.general.isDarkTheme = !this.config.general.isDarkTheme;
      window.Store.saveConfig(this.config);
      this.updateThemeToggleIcon(this.config.general.isDarkTheme);
    });
  },

  updateThemeToggleIcon(isDark) {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;
    if (isDark) {
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
    } else {
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    }
  },

  // Called by router when page changes (e.g. from admin back to public, or public refresh)
  onPageEnter(pageId) {
    this.config = window.Store.loadConfig();
    this.renderHeaderFooter();

    if (pageId === 'admin') {
      if (window.AdminPanel) window.AdminPanel.init();
    } else {
      // Re-render home & services in case admin modified them
      this.renderHome();
      this.renderServices();
    }
  },

  renderAllPublicSections() {
    this.renderHome();
    this.initHomeAnimations();
    this.renderServices();
    this.renderPortfolio();
    this.renderBlog();
    this.renderCareers();
    this.renderFaq();
    this.renderAbout();
    this.renderPricing();
    this.initRoiCalculator();
    this.initContactForm();
    this.renderSystemStatus();
  },

  // ==================== SCROLL SYSTEM & OBSERVERS ====================
  initScrollReveal() {
    const sections = document.querySelectorAll('.scroll-reveal');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Immediately make the first section (Home) visible
    if (sections.length > 0) {
      sections[0].classList.add('visible');
    }

    const options = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.05
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Re-trigger counter count-up when home enters viewport
          if (entry.target.id === 'home') {
            this.animateCountersOnce();
          }

          // Active Navbar highlighters
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href').replace(/^#/, '');
            if (href === id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, options);

    sections.forEach(sec => observer.observe(sec));

    // Fallback: make all sections visible after a short delay in case observer doesn't fire
    setTimeout(() => {
      sections.forEach(sec => {
        if (!sec.classList.contains('visible')) {
          sec.classList.add('visible');
        }
      });
    }, 1500);
  },

  // ==================== HOME PAGE ====================
  renderHome() {
    const badge = document.getElementById('hero-badge');
    const title = document.getElementById('hero-title');
    const subtitle = document.getElementById('hero-subtitle');
    const cta1 = document.getElementById('hero-cta-primary');
    const cta2 = document.getElementById('hero-cta-secondary');

    if (badge) badge.textContent = this.config.hero.badge;
    if (title) title.textContent = this.config.hero.title;
    if (subtitle) subtitle.textContent = this.config.hero.subtitle;
    
    if (cta1) {
      cta1.textContent = this.config.hero.ctaPrimaryText;
      cta1.setAttribute('href', this.config.hero.ctaPrimaryLink);
    }
    if (cta2) {
      cta2.textContent = this.config.hero.ctaSecondaryText;
      cta2.setAttribute('href', this.config.hero.ctaSecondaryLink);
    }

    const statsContainer = document.getElementById('stats-container');
    if (statsContainer) {
      statsContainer.innerHTML = this.config.stats.map((stat, i) => `
        <div class="stat-item glass-card">
          <div class="stat-num" id="stat-num-${i}" data-val="${stat.value}" data-suffix="${stat.suffix}">0</div>
          <div class="stat-label">${stat.label}</div>
        </div>
      `).join('');
    }

    const showcaseContainer = document.getElementById('showcase-container');
    if (showcaseContainer) {
      const highlights = this.config.services.slice(0, 3);
      showcaseContainer.innerHTML = highlights.map(srv => `
        <div class="showcase-card glass-card">
          <div class="showcase-icon">${srv.icon}</div>
          <h3>${srv.title}</h3>
          <p>${srv.shortDesc}</p>
        </div>
      `).join('');
    }

    const testimonialsContainer = document.getElementById('testimonials-track');
    if (testimonialsContainer) {
      testimonialsContainer.innerHTML = this.config.testimonials.map(t => {
        let stars = '';
        for (let i = 0; i < t.rating; i++) stars += '★';
        return `
          <div class="testimonial-card glass-card">
            <div class="testimonial-header">
              <img class="testimonial-avatar" src="${t.avatarUrl}" alt="${t.name}">
              <div class="testimonial-info">
                <h4>${t.name}</h4>
                <p>${t.position}</p>
              </div>
            </div>
            <div class="testimonial-stars">${stars}</div>
            <p class="testimonial-quote">"${t.quote}"</p>
          </div>
        `;
      }).join('');
      
      this.initTestimonialsCarousel();
    }
  },

  initHomeAnimations() {
    const bars = document.querySelectorAll('.mockup-bar');
    bars.forEach(bar => {
      const randHeight = Math.floor(Math.random() * 70) + 15;
      bar.style.height = `${randHeight}%`;
    });

    if (this.chartInterval) clearInterval(this.chartInterval);
    this.chartInterval = setInterval(() => {
      const visibleBars = document.querySelectorAll('.mockup-bar');
      visibleBars.forEach(bar => {
        const randHeight = Math.floor(Math.random() * 80) + 15;
        bar.style.height = `${randHeight}%`;
      });
    }, 3000);
  },

  animateCountersOnce() {
    if (this.countersAnimated) return;
    this.countersAnimated = true;

    this.config.stats.forEach((stat, i) => {
      const el = document.getElementById(`stat-num-${i}`);
      if (!el) return;
      const targetVal = parseFloat(stat.value);
      const isInt = Number.isInteger(targetVal);
      const duration = 1200;
      const startTime = performance.now();

      const animate = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = progress * (2 - progress);
        const currentVal = easeProgress * targetVal;

        if (isInt) {
          el.textContent = Math.floor(currentVal) + stat.suffix;
        } else {
          el.textContent = currentVal.toFixed(2) + stat.suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          el.textContent = targetVal + stat.suffix;
        }
      };
      requestAnimationFrame(animate);
    });
  },

  initTestimonialsCarousel() {
    const track = document.getElementById('testimonials-track');
    const dotsContainer = document.getElementById('testimonials-dots');
    const cards = document.querySelectorAll('.testimonial-card');
    if (!track || !dotsContainer || cards.length === 0) return;

    dotsContainer.innerHTML = '';
    cards.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        this.slideCarousel(i);
      });
      dotsContainer.appendChild(dot);
    });

    this.currentSlide = 0;
  },

  slideCarousel(index) {
    const track = document.getElementById('testimonials-track');
    const dots = document.querySelectorAll('.carousel-dot');
    if (!track || dots.length === 0) return;

    this.currentSlide = index;
    const cardWidth = 380;
    const gap = 24;
    const offset = index * (cardWidth + gap);
    
    track.style.transform = `translateX(-${offset}px)`;

    dots.forEach((dot, i) => {
      if (i === index) dot.classList.add('active');
      else dot.classList.remove('active');
    });
  },

  // ==================== SERVICES PAGE ====================
  renderServices() {
    const container = document.getElementById('services-grid');
    if (!container) return;

    const filterContainer = document.getElementById('services-filters');
    if (filterContainer) {
      const categories = ['All', ...new Set(this.config.services.map(s => s.category))];
      filterContainer.innerHTML = categories.map(cat => `
        <button class="filter-btn ${cat === 'All' ? 'active' : ''}" data-cat="${cat}">${cat}</button>
      `).join('');

      const buttons = filterContainer.querySelectorAll('.filter-btn');
      buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          buttons.forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
          this.filterServices(e.target.dataset.cat);
        });
      });
    }

    this.filterServices('All');
    this.setupModalListener();
  },

  filterServices(category) {
    const container = document.getElementById('services-grid');
    if (!container) return;

    const filtered = category === 'All' 
      ? this.config.services 
      : this.config.services.filter(s => s.category === category);

    container.innerHTML = filtered.map(srv => `
      <div class="service-card glass-card">
        <div class="showcase-icon">${srv.icon}</div>
        <h3>${srv.title}</h3>
        <p>${srv.shortDesc}</p>
        <span class="service-learn-more" data-id="${srv.id}">
          Learn Details 
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </span>
      </div>
    `).join('');

    container.querySelectorAll('.service-learn-more').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        this.openServiceModal(id);
      });
    });
  },

  setupModalListener() {
    const modal = document.getElementById('service-modal');
    const closeBtn = document.getElementById('modal-close');
    if (!modal || !closeBtn) return;

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  },

  openServiceModal(id) {
    const srv = this.config.services.find(s => s.id === id);
    const modal = document.getElementById('service-modal');
    if (!srv || !modal) return;

    modal.querySelector('.modal-icon').textContent = srv.icon;
    modal.querySelector('.modal-title').textContent = srv.title;
    modal.querySelector('.modal-category').textContent = srv.category;
    modal.querySelector('.modal-desc').textContent = srv.longDesc;

    modal.classList.add('active');
  },

  // ==================== ABOUT US PAGE ====================
  renderAbout() {
    const teamContainer = document.getElementById('team-container');
    if (teamContainer) {
      teamContainer.innerHTML = this.config.team.map(member => `
        <div class="team-card glass-card">
          <div class="team-avatar-container">
            <img src="${member.avatarUrl}" alt="${member.name}">
          </div>
          <h4>${member.name}</h4>
          <p>${member.role}</p>
          <div class="team-bio">${member.bio}</div>
          <div class="team-socials">
            <a class="team-social-link" href="${member.socials.linkedin}">LinkedIn</a>
            <span>•</span>
            <a class="team-social-link" href="${member.socials.twitter}">Twitter</a>
          </div>
        </div>
      `).join('');
    }
  },

  // ==================== PRICING & ROI CALCULATOR ====================
  renderPricing() {
    const grid = document.getElementById('pricing-grid');
    if (!grid) return;

    grid.innerHTML = this.config.pricing.tiers.map((tier, i) => {
      const isFeatured = tier.featured === true;
      const isContact = tier.price === 'Contact Us';
      const formattedPrice = isContact ? tier.price : `$${tier.price}`;
      const priceSub = isContact ? '' : '<span>/mo</span>';
      
      return `
        <div class="pricing-card glass-card ${isFeatured ? 'featured' : ''}" id="pricing-tier-${i}">
          <div class="tier-name">${tier.name}</div>
          <div class="tier-price">${formattedPrice}${priceSub}</div>
          <ul class="tier-features">
            ${tier.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
          <a href="#contact" class="btn ${isFeatured ? 'btn-primary' : 'btn-secondary'}" style="width: 100%;">
            ${isContact ? 'Contact Sales' : 'Get Started'}
          </a>
        </div>
      `;
    }).join('');
  },

  initRoiCalculator() {
    const empInput = document.getElementById('employees-input');
    const dataInput = document.getElementById('data-input');
    const secInput = document.getElementById('security-input');

    if (!empInput || !dataInput || !secInput) return;

    const updateCalc = () => {
      const employees = parseInt(empInput.value);
      const data = parseInt(dataInput.value);
      const security = parseInt(secInput.value);

      document.getElementById('employees-val').textContent = employees.toLocaleString();
      document.getElementById('data-val').textContent = data + ' TB';
      document.getElementById('security-val').textContent = 'Level ' + security;

      const annualSavings = (employees * 1800) + (data * 450) + (security * 15000);
      const efficiencyVal = Math.min(30 + (employees / 20) + (security * 6), 96).toFixed(0);

      let savingsText = '';
      if (annualSavings >= 1000000) {
        savingsText = `$${(annualSavings / 1000000).toFixed(2)}M`;
      } else {
        savingsText = `$${annualSavings.toLocaleString()}`;
      }

      document.getElementById('savings-result').textContent = savingsText;
      document.getElementById('efficiency-result').textContent = efficiencyVal + '%';

      const starterCard = document.getElementById('pricing-tier-0');
      const enterpriseCard = document.getElementById('pricing-tier-1');
      const customCard = document.getElementById('pricing-tier-2');

      if (starterCard && enterpriseCard && customCard) {
        starterCard.classList.remove('featured');
        enterpriseCard.classList.remove('featured');
        customCard.classList.remove('featured');

        if (data > 200 || employees > 600 || security > 4) {
          customCard.classList.add('featured');
        } else if (employees > 150 || data > 25 || security > 2) {
          enterpriseCard.classList.add('featured');
        } else {
          starterCard.classList.add('featured');
        }
      }
    };

    empInput.addEventListener('input', updateCalc);
    dataInput.addEventListener('input', updateCalc);
    secInput.addEventListener('input', updateCalc);

    updateCalc();
  },

  // ==================== CAREERS PAGE ====================
  renderCareers() {
    const grid = document.getElementById('careers-jobs-grid');
    if (!grid) return;

    grid.innerHTML = this.config.careers.map(job => `
      <div class="service-card glass-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
          <span class="badge" style="margin: 0; padding: 4px 10px; font-size: 11px;">${job.department}</span>
          <span style="font-size: 13px; color: var(--primary-color); font-weight: 600;">${job.type}</span>
        </div>
        <h3 style="font-size: 20px; font-family: var(--font-heading); margin-bottom: 12px;">${job.title}</h3>
        <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px; flex-grow: 1;">
          <strong>Requirements:</strong> ${job.requirements}
        </p>
        <span style="font-size: 13px; color: var(--text-muted); margin-bottom: 24px; display: block;">📍 ${job.location}</span>
        <button class="btn btn-primary btn-apply-job" data-id="${job.id}" data-title="${job.title}">Apply For Role</button>
      </div>
    `).join('');

    const modal = document.getElementById('careers-modal');
    const closeBtn = document.getElementById('careers-modal-close');
    const applyForm = document.getElementById('careers-apply-form');
    const successPanel = document.getElementById('careers-success-panel');
    const doneBtn = document.getElementById('btn-careers-done');

    if (!modal) return;

    grid.querySelectorAll('.btn-apply-job').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const jobId = e.currentTarget.dataset.id;
        const jobTitle = e.currentTarget.dataset.title;
        
        document.getElementById('careers-job-id').value = jobId;
        document.getElementById('careers-job-title').textContent = `Apply for: ${jobTitle}`;
        
        applyForm.style.display = 'block';
        successPanel.style.display = 'none';
        applyForm.reset();
        applyForm.querySelectorAll('.form-group').forEach(grp => grp.classList.remove('invalid'));

        modal.classList.add('active');
      });
    });

    const closeModal = () => modal.classList.remove('active');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (doneBtn) doneBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    if (applyForm) {
      const newForm = applyForm.cloneNode(true);
      applyForm.parentNode.replaceChild(newForm, applyForm);

      newForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        const inputs = newForm.querySelectorAll('.form-control');
        const values = {};

        inputs.forEach(input => {
          const group = input.closest('.form-group');
          const val = input.value.trim();

          if (input.required && !val) {
            group.classList.add('invalid');
            isValid = false;
          } else if (input.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
            group.classList.add('invalid');
            isValid = false;
          } else {
            group.classList.remove('invalid');
            values[input.name || input.id] = val;
          }
        });

        values.jobId = document.getElementById('careers-job-id').value;
        const matchingJob = this.config.careers.find(j => j.id === values.jobId);
        values.jobTitle = matchingJob ? matchingJob.title : 'General Application';

        if (!isValid) return;

        const submitBtn = newForm.querySelector('button[type="submit"]');
        const spinner = document.getElementById('careers-spinner');
        if (submitBtn) submitBtn.disabled = true;
        if (spinner) spinner.style.display = 'block';

        setTimeout(() => {
          window.Store.saveJobApplication(values);
          if (submitBtn) submitBtn.disabled = false;
          if (spinner) spinner.style.display = 'none';

          newForm.style.display = 'none';
          successPanel.style.display = 'block';
        }, 1000);
      });

      newForm.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', () => {
          input.closest('.form-group').classList.remove('invalid');
        });
      });
    }
  },

  // ==================== PORTFOLIO PAGE ====================
  renderPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;

    grid.innerHTML = this.config.portfolio.map(cs => `
      <div class="admin-list-item glass-card" style="flex-direction: column; align-items: stretch; padding: 40px;">
        <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 24px;">
          <div class="logo-icon" style="width: 50px; height: 50px; border-radius: 50%; font-size: 20px;">${cs.logoChar}</div>
          <div>
            <h3 style="font-family: var(--font-heading); font-size: 24px; font-weight: 700;">${cs.company}</h3>
            <span class="badge" style="margin: 0; padding: 2px 10px; font-size: 11px;">${cs.industry}</span>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 32px;">
          <div>
            <h4 style="font-size: 14px; text-transform: uppercase; color: var(--primary-color); margin-bottom: 8px;">The Challenge</h4>
            <p style="color: var(--text-muted); font-size: 14px; line-height: 1.6;">${cs.challenge}</p>
          </div>
          <div>
            <h4 style="font-size: 14px; text-transform: uppercase; color: var(--accent-color); margin-bottom: 8px;">The Solution</h4>
            <p style="color: var(--text-muted); font-size: 14px; line-height: 1.6;">${cs.solution}</p>
          </div>
        </div>

        <div style="display: flex; gap: 48px; border-top: 1px solid var(--card-border); padding-top: 24px;">
          <div>
            <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase;">Efficiency Increase</div>
            <div style="font-size: 32px; font-weight: 800; font-family: var(--font-heading); color: var(--primary-color);">${cs.efficiencyBoost}</div>
          </div>
          <div>
            <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase;">Annual Financial Impact</div>
            <div style="font-size: 32px; font-weight: 800; font-family: var(--font-heading); color: #16a34a;">${cs.annualSavings}</div>
          </div>
        </div>
      </div>
    `).join('');
  },

  // ==================== BLOG PAGE ====================
  renderBlog() {
    const grid = document.getElementById('blog-grid');
    if (!grid) return;

    const blogs = window.Store.getBlogPosts();

    if (blogs.length === 0) {
      grid.innerHTML = `
        <div class="glass-card" style="grid-column: 1 / -1; text-align: center; padding: 60px;">
          <div style="font-size: 40px; margin-bottom: 16px;">✍️</div>
          <h3>No articles published yet.</h3>
          <p style="color: var(--text-muted);">Please check back later or log in to the admin panel to write posts.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = blogs.map(post => `
      <div class="service-card glass-card">
        <span class="badge" style="margin-bottom: 12px;">${post.category}</span>
        <h3 style="font-size: 20px; font-family: var(--font-heading); margin-bottom: 8px; line-height: 1.3;">${post.title}</h3>
        <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 16px;">
          By ${post.author} &bull; ${post.date}
        </div>
        <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 24px; flex-grow: 1;">${post.summary}</p>
        <span class="service-learn-more btn-read-blog" data-id="${post.id}">
          Read Insights 
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </span>
      </div>
    `).join('');

    const modal = document.getElementById('blog-modal');
    const closeBtn = document.getElementById('blog-modal-close');
    
    if (!modal) return;

    grid.querySelectorAll('.btn-read-blog').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        this.openBlogModal(id);
      });
    });

    const closeModal = () => modal.classList.remove('active');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  },

  openBlogModal(id) {
    const blogs = window.Store.getBlogPosts();
    const post = blogs.find(p => p.id === id);
    const modal = document.getElementById('blog-modal');
    if (!post || !modal) return;

    modal.querySelector('#blog-modal-category').textContent = post.category;
    modal.querySelector('#blog-modal-title').textContent = post.title;
    modal.querySelector('#blog-modal-meta').textContent = `By ${post.author} | ${post.date}`;
    modal.querySelector('#blog-modal-content').textContent = post.content || post.summary;

    this.renderBlogComments(id);

    const commentForm = document.getElementById('blog-comment-form');
    if (commentForm) {
      const newForm = commentForm.cloneNode(true);
      commentForm.parentNode.replaceChild(newForm, commentForm);

      newForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const authorInput = document.getElementById('comment-author');
        const textInput = document.getElementById('comment-text');

        if (!authorInput || !textInput) return;

        const newComment = {
          author: authorInput.value.trim(),
          text: textInput.value.trim()
        };

        if (newComment.author && newComment.text) {
          window.Store.saveComment(id, newComment);
          authorInput.value = '';
          textInput.value = '';
          this.renderBlogComments(id);
        }
      });
    }

    modal.classList.add('active');
  },

  renderBlogComments(postId) {
    const container = document.getElementById('blog-comments-list');
    if (!container) return;

    const comments = window.Store.getComments(postId);

    if (comments.length === 0) {
      container.innerHTML = `<p style="color: var(--text-muted); font-size: 13px; font-style: italic;">No comments posted yet. Be the first!</p>`;
      return;
    }

    container.innerHTML = comments.map(c => `
      <div style="background: var(--subtle-bg); border: 1px solid var(--card-border); padding: 16px; border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 600; margin-bottom: 8px;">
          <span>👤 ${c.author}</span>
          <span style="color: var(--text-muted);">${c.date}</span>
        </div>
        <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; white-space: pre-wrap;">${c.text}</p>
      </div>
    `).join('');
  },

  // ==================== FAQ PAGE ====================
  renderFaq() {
    const accordionContainer = document.getElementById('faq-accordions-container');
    const searchInput = document.getElementById('faq-search-input');
    const ticketForm = document.getElementById('faq-ticket-form');
    const successPanel = document.getElementById('ticket-success-panel');
    const doneBtn = document.getElementById('btn-ticket-done');

    if (!accordionContainer) return;

    const renderFaqList = (query = '') => {
      const normalizedQuery = query.toLowerCase().trim();
      const filtered = this.config.faqs.filter(f => 
        f.question.toLowerCase().includes(normalizedQuery) ||
        f.answer.toLowerCase().includes(normalizedQuery) ||
        f.category.toLowerCase().includes(normalizedQuery)
      );

      if (filtered.length === 0) {
        accordionContainer.innerHTML = `
          <div style="text-align: center; padding: 40px; color: var(--text-muted);">
            No questions match your query.
          </div>
        `;
        return;
      }

      accordionContainer.innerHTML = filtered.map((faq, index) => `
        <div class="glass-card faq-accordion-item" style="overflow: hidden;">
          <div class="faq-header" style="padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-weight: 600; border-bottom: 1px solid transparent; transition: var(--transition-fast);" data-index="${index}">
            <span>${faq.question}</span>
            <span class="faq-arrow" style="transition: transform 0.3s; font-size: 12px;">▼</span>
          </div>
          <div class="faq-body" style="padding: 0 24px; max-height: 0; opacity: 0; overflow: hidden; transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), padding 0.3s, opacity 0.3s;">
            <p style="color: var(--text-muted); font-size: 14px; line-height: 1.6; padding-bottom: 20px;">${faq.answer}</p>
          </div>
        </div>
      `).join('');

      accordionContainer.querySelectorAll('.faq-header').forEach(header => {
        header.addEventListener('click', (e) => {
          const item = e.currentTarget.closest('.faq-accordion-item');
          const body = item.querySelector('.faq-body');
          const arrow = item.querySelector('.faq-arrow');

          const isActive = item.classList.contains('active');

          accordionContainer.querySelectorAll('.faq-accordion-item').forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-body').style.maxHeight = '0';
            otherItem.querySelector('.faq-body').style.opacity = '0';
            otherItem.querySelector('.faq-body').style.padding = '0 24px';
            otherItem.querySelector('.faq-header').style.borderBottomColor = 'transparent';
            otherItem.querySelector('.faq-arrow').style.transform = 'rotate(0deg)';
          });

          if (!isActive) {
            item.classList.add('active');
            body.style.maxHeight = body.scrollHeight + 20 + 'px';
            body.style.opacity = '1';
            body.style.padding = '12px 24px 20px 24px';
            header.style.borderBottomColor = 'var(--card-border)';
            arrow.style.transform = 'rotate(180deg)';
          }
        });
      });
    };

    if (searchInput) {
      searchInput.value = '';
      searchInput.addEventListener('input', (e) => {
        renderFaqList(e.target.value);
      });
    }

    renderFaqList();

    if (ticketForm && successPanel) {
      ticketForm.style.display = 'block';
      successPanel.style.display = 'none';

      const newForm = ticketForm.cloneNode(true);
      ticketForm.parentNode.replaceChild(newForm, ticketForm);

      newForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        const inputs = newForm.querySelectorAll('.form-control');
        const values = {};

        inputs.forEach(input => {
          const group = input.closest('.form-group');
          const val = input.value.trim();

          if (input.required && !val) {
            group.classList.add('invalid');
            isValid = false;
          } else if (input.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
            group.classList.add('invalid');
            isValid = false;
          } else {
            group.classList.remove('invalid');
            values[input.name || input.id] = val;
          }
        });

        if (!isValid) return;

        const submitBtn = newForm.querySelector('button[type="submit"]');
        const spinner = document.getElementById('ticket-spinner');
        if (submitBtn) submitBtn.disabled = true;
        if (spinner) spinner.style.display = 'block';

        setTimeout(() => {
          window.Store.saveSupportTicket(values);

          if (submitBtn) submitBtn.disabled = false;
          if (spinner) spinner.style.display = 'none';

          newForm.style.display = 'none';
          successPanel.style.display = 'block';
        }, 1000);
      });

      newForm.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', () => {
          input.closest('.form-group').classList.remove('invalid');
        });
      });

      if (doneBtn) {
        doneBtn.addEventListener('click', () => {
          newForm.reset();
          newForm.style.display = 'block';
          successPanel.style.display = 'none';
        });
      }
    }
  },

  // ==================== SYSTEM STATUS SECTION [NEW] ====================
  renderSystemStatus() {
    const compContainer = document.getElementById('status-components-list');
    const incidentContainer = document.getElementById('status-incidents-list');

    if (!compContainer || !incidentContainer) return;

    // Load default status modules
    compContainer.innerHTML = this.config.status.components.map((c, i) => `
      <div class="status-component-item" id="status-comp-${i}">
        <span style="font-weight: 600;">${c.name}</span>
        <div class="status-indicator-wrapper">
          <span class="status-dot-pulse"></span>
          <span style="color: #16a34a; font-size: 13px; font-weight: 700; margin-right: 16px;">${c.status}</span>
          <span class="status-latency-num" id="status-latency-${i}">${c.latency}</span>
        </div>
      </div>
    `).join('');

    // Load incidents
    incidentContainer.innerHTML = this.config.status.incidents.map(inc => `
      <div class="incident-item">
        <div class="incident-title-row">
          <span>${inc.title}</span>
          <span class="incident-date">${inc.date}</span>
        </div>
        <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">${inc.desc}</p>
      </div>
    `).join('');
  },

  initSystemStatusPinger() {
    if (this.pingerInterval) clearInterval(this.pingerInterval);

    // Simulate real-time hardware latencies fluctuations (every 2.5s)
    this.pingerInterval = setInterval(() => {
      const componentsCount = this.config.status.components.length;
      const randIdx = Math.floor(Math.random() * componentsCount);
      const el = document.getElementById(`status-latency-${randIdx}`);
      const row = document.getElementById(`status-comp-${randIdx}`);

      if (!el || !row) return;

      // Base latency bounds
      const baseLatencies = [12, 8, 15, 3, 22]; // matching initial pings
      const base = baseLatencies[randIdx];
      const variance = Math.floor(Math.random() * 5) - 2; // -2ms to +2ms
      const newLatency = Math.max(base + variance, 1);

      // Trigger latency text swap
      el.textContent = `${newLatency}ms`;
      
      // Trigger a subtle glowing flash animation
      row.style.borderColor = 'var(--primary-color)';
      row.style.boxShadow = '0 0 15px rgba(var(--primary-color-rgb), 0.2)';
      
      setTimeout(() => {
        row.style.borderColor = 'var(--card-border)';
        row.style.boxShadow = 'none';
      }, 1000);

    }, 2500);
  },

  // ==================== CONTACT FORM ====================
  initContactForm() {
    const form = document.getElementById('contact-form');
    const successPanel = document.getElementById('contact-success');
    if (!form || !successPanel) return;

    form.style.display = 'block';
    successPanel.style.display = 'none';

    form.querySelectorAll('.form-group').forEach(grp => grp.classList.remove('invalid'));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const inputs = form.querySelectorAll('.form-control');
      const values = {};

      inputs.forEach(input => {
        const group = input.closest('.form-group');
        const val = input.value.trim();

        if (input.required && !val) {
          group.classList.add('invalid');
          isValid = false;
        } else if (input.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          group.classList.add('invalid');
          isValid = false;
        } else {
          group.classList.remove('invalid');
          values[input.name || input.id] = val;
        }
      });

      if (!isValid) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      const spinner = form.querySelector('.form-spinner');
      if (submitBtn) submitBtn.disabled = true;
      if (spinner) spinner.style.display = 'block';

      setTimeout(() => {
        window.Store.saveInquiry(values);

        form.reset();
        if (submitBtn) submitBtn.disabled = false;
        if (spinner) spinner.style.display = 'none';

        form.style.display = 'none';
        successPanel.style.display = 'block';
      }, 1000);
    });

    form.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        group.classList.remove('invalid');
      });
    });
  }
};

// Initialize app when DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  App.init();
  window.App = App;
});
