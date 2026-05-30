// Admin Control Center Logic
const AdminPanel = {
  isLoggedIn: false,
  config: {},
  activeTab: 'general',

  init() {
    this.config = window.Store.loadConfig();
    this.isLoggedIn = sessionStorage.getItem('admin_logged_in') === 'true';

    this.render();
  },

  render() {
    const loginSection = document.getElementById('admin-login-section');
    const workspaceSection = document.getElementById('admin-workspace-section');

    if (!loginSection || !workspaceSection) return;

    if (!this.isLoggedIn) {
      loginSection.style.display = 'block';
      workspaceSection.style.display = 'none';
      this.initLoginForm();
    } else {
      loginSection.style.display = 'none';
      workspaceSection.style.display = 'grid';
      this.initWorkspace();
    }
  },

  // ==================== LOGIN WORKFLOW ====================
  initLoginForm() {
    const form = document.getElementById('admin-login-form');
    const errorMsg = document.getElementById('admin-login-error');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const passwordInput = document.getElementById('admin-password');
      if (!passwordInput) return;

      const password = passwordInput.value;
      // Default mock credential check
      if (password === 'admin123') {
        this.isLoggedIn = true;
        sessionStorage.setItem('admin_logged_in', 'true');
        passwordInput.value = '';
        if (errorMsg) errorMsg.style.opacity = '0';
        this.render();
      } else {
        if (errorMsg) {
          errorMsg.textContent = 'Invalid administrator password. Try admin123';
          errorMsg.style.opacity = '1';
        }
      }
    });
  },

  // ==================== WORKSPACE WORKFLOW ====================
  initWorkspace() {
    this.setupSidebarNav();
    this.loadGeneralSettings();
    this.loadServicesList();
    this.loadInquiriesInbox();
    this.loadBlogAdmin();
    this.loadJobApplications();
    this.loadSupportTickets();
  },

  setupSidebarNav() {
    const menuItems = document.querySelectorAll('.admin-menu-item');
    menuItems.forEach(item => {
      // Clean previous listeners
      const newItem = item.cloneNode(true);
      item.parentNode.replaceChild(newItem, item);

      newItem.addEventListener('click', (e) => {
        const action = e.currentTarget.dataset.tab;
        if (action === 'logout') {
          this.logout();
        } else {
          this.switchTab(action);
        }
      });
    });

    this.switchTab(this.activeTab);
  },

  switchTab(tabId) {
    this.activeTab = tabId;
    
    // Switch active state of sidebar links
    document.querySelectorAll('.admin-menu-item').forEach(item => {
      if (item.dataset.tab === tabId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Switch active display pane
    document.querySelectorAll('.admin-section-content').forEach(pane => {
      if (pane.id === `admin-pane-${tabId}`) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    // Reload content for relevant tabs when clicked
    if (tabId === 'inbox') {
      this.loadInquiriesInbox();
    } else if (tabId === 'services') {
      this.loadServicesList();
    } else if (tabId === 'blog-admin') {
      this.loadBlogAdmin();
    } else if (tabId === 'apps') {
      this.loadJobApplications();
    } else if (tabId === 'tickets') {
      this.loadSupportTickets();
    }
  },

  logout() {
    this.isLoggedIn = false;
    sessionStorage.removeItem('admin_logged_in');
    this.activeTab = 'general';
    this.render();
  },

  // ==================== TAB 1: GENERAL SETTINGS ====================
  loadGeneralSettings() {
    // Info Inputs
    const companyInput = document.getElementById('adm-company-name');
    const logoTxtInput = document.getElementById('adm-logo-text');
    const logoIconInput = document.getElementById('adm-logo-icon');
    const footerInput = document.getElementById('adm-footer-copyright');

    // Hero Inputs
    const heroBadgeInput = document.getElementById('adm-hero-badge');
    const heroTitleInput = document.getElementById('adm-hero-title');
    const heroDescInput = document.getElementById('adm-hero-desc');
    const heroCta1Input = document.getElementById('adm-hero-cta1');
    const heroCta2Input = document.getElementById('adm-hero-cta2');

    // Color Pickers
    const primaryPicker = document.getElementById('color-primary');
    const secondaryPicker = document.getElementById('color-secondary');
    const accentPicker = document.getElementById('color-accent');

    // Set values
    if (companyInput) companyInput.value = this.config.general.companyName;
    if (logoTxtInput) logoTxtInput.value = this.config.general.logoText;
    if (logoIconInput) logoIconInput.value = this.config.general.logoIcon;
    if (footerInput) footerInput.value = this.config.general.copyright;

    if (heroBadgeInput) heroBadgeInput.value = this.config.hero.badge;
    if (heroTitleInput) heroTitleInput.value = this.config.hero.title;
    if (heroDescInput) heroDescInput.value = this.config.hero.subtitle;
    if (heroCta1Input) heroCta1Input.value = this.config.hero.ctaPrimaryText;
    if (heroCta2Input) heroCta2Input.value = this.config.hero.ctaSecondaryText;

    if (primaryPicker) primaryPicker.value = this.config.general.primaryColor;
    if (secondaryPicker) secondaryPicker.value = this.config.general.secondaryColor;
    if (accentPicker) accentPicker.value = this.config.general.accentColor;

    // Real-time color updates to the layout!
    const applyColors = () => {
      const liveGeneral = {
        ...this.config.general,
        primaryColor: primaryPicker.value,
        secondaryColor: secondaryPicker.value,
        accentColor: accentPicker.value
      };
      window.Store.applyThemeColors(liveGeneral);
    };

    if (primaryPicker) primaryPicker.addEventListener('input', applyColors);
    if (secondaryPicker) secondaryPicker.addEventListener('input', applyColors);
    if (accentPicker) accentPicker.addEventListener('input', applyColors);

    // Form Submits
    const form = document.getElementById('admin-general-form');
    if (form) {
      // Clear listener
      const newForm = form.cloneNode(true);
      form.parentNode.replaceChild(newForm, form);

      newForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Build updated configuration structure
        this.config.general.companyName = companyInput.value;
        this.config.general.logoText = logoTxtInput.value;
        this.config.general.logoIcon = logoIconInput.value;
        this.config.general.copyright = footerInput.value;
        this.config.general.primaryColor = primaryPicker.value;
        this.config.general.secondaryColor = secondaryPicker.value;
        this.config.general.accentColor = accentPicker.value;

        this.config.hero.badge = heroBadgeInput.value;
        this.config.hero.title = heroTitleInput.value;
        this.config.hero.subtitle = heroDescInput.value;
        this.config.hero.ctaPrimaryText = heroCta1Input.value;
        this.config.hero.ctaSecondaryText = heroCta2Input.value;

        window.Store.saveConfig(this.config);
        
        // Live updates header
        if (window.App) {
          window.App.renderHeaderFooter();
        }

        alert('Global configurations saved successfully.');
      });
    }
  },

  // ==================== TAB 2: EDIT SERVICES ====================
  loadServicesList() {
    const listContainer = document.getElementById('admin-services-list');
    const editorContainer = document.getElementById('admin-services-editor');
    if (!listContainer || !editorContainer) return;

    // Render original list
    editorContainer.style.display = 'none';
    listContainer.style.display = 'block';

    const renderList = () => {
      listContainer.innerHTML = `
        <button class="btn btn-primary" id="btn-add-service" style="margin-bottom: 24px;">+ Add New Service</button>
        <div class="admin-list-container">
          ${this.config.services.map((srv, index) => `
            <div class="admin-list-item">
              <div>
                <span style="font-size: 20px; margin-right: 12px;">${srv.icon}</span>
                <span class="admin-list-item-title">${srv.title}</span>
                <span class="badge" style="margin: 0 0 0 12px; font-size: 10px; padding: 2px 8px;">${srv.category}</span>
              </div>
              <div class="admin-list-item-actions">
                <button class="btn btn-secondary btn-edit-srv" data-index="${index}" style="padding: 6px 12px; font-size: 13px;">Edit</button>
                <button class="btn btn-secondary btn-del-srv" data-index="${index}" style="padding: 6px 12px; font-size: 13px; border-color: rgba(255,95,86,0.3); color: #ff5f56;">Delete</button>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      // Bind Listeners
      const addBtn = document.getElementById('btn-add-service');
      if (addBtn) addBtn.addEventListener('click', () => this.openServicesEditor(null));

      listContainer.querySelectorAll('.btn-edit-srv').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const index = parseInt(e.currentTarget.dataset.index);
          this.openServicesEditor(index);
        });
      });

      listContainer.querySelectorAll('.btn-del-srv').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const index = parseInt(e.currentTarget.dataset.index);
          if (confirm(`Are you sure you want to delete this service: ${this.config.services[index].title}?`)) {
            this.config.services.splice(index, 1);
            window.Store.saveConfig(this.config);
            renderList();
          }
        });
      });
    };

    renderList();
  },

  openServicesEditor(index) {
    const listContainer = document.getElementById('admin-services-list');
    const editorContainer = document.getElementById('admin-services-editor');
    if (!listContainer || !editorContainer) return;

    listContainer.style.display = 'none';
    editorContainer.style.display = 'block';

    const srv = index !== null ? this.config.services[index] : {
      title: '',
      shortDesc: '',
      longDesc: '',
      icon: '⚙️',
      category: 'AI'
    };

    editorContainer.innerHTML = `
      <h4 style="margin-bottom: 24px; font-family: var(--font-heading); font-size: 20px;">
        ${index !== null ? 'Modify Service Details' : 'Register New Enterprise Service'}
      </h4>
      <form id="admin-srv-form">
        <div class="form-row">
          <div class="form-group">
            <label for="srv-title">Service Name</label>
            <input type="text" id="srv-title" class="form-control" value="${srv.title}" required>
          </div>
          <div class="form-group">
            <label for="srv-category">Service Category</label>
            <select id="srv-category" class="form-control" style="background: var(--input-bg); height: 48px; border: 1px solid var(--input-border); color: var(--text-color); border-radius: 8px; width: 100%; outline: none; padding: 12px 16px;">
              <option value="AI" ${srv.category === 'AI' ? 'selected' : ''}>AI & Automation</option>
              <option value="Infrastructure" ${srv.category === 'Infrastructure' ? 'selected' : ''}>Infrastructure & Cloud</option>
              <option value="Security" ${srv.category === 'Security' ? 'selected' : ''}>Cybersecurity</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="srv-icon">Service Icon (Emoji)</label>
            <input type="text" id="srv-icon" class="form-control" value="${srv.icon}" required>
          </div>
        </div>
        <div class="form-group">
          <label for="srv-short-desc">Short Summary Description</label>
          <input type="text" id="srv-short-desc" class="form-control" value="${srv.shortDesc}" required>
        </div>
        <div class="form-group">
          <label for="srv-long-desc">Full Detailed Feature Breakdown</label>
          <textarea id="srv-long-desc" class="form-control" required>${srv.longDesc}</textarea>
        </div>
        <div class="admin-footer-actions">
          <button type="button" class="btn btn-secondary" id="btn-srv-cancel">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Service Changes</button>
        </div>
      </form>
    `;

    // Cancel Button
    document.getElementById('btn-srv-cancel').addEventListener('click', () => {
      this.loadServicesList();
    });

    // Form Submission
    document.getElementById('admin-srv-form').addEventListener('submit', (e) => {
      e.preventDefault();

      const updatedSrv = {
        id: index !== null ? srv.id : 'srv-' + Date.now(),
        title: document.getElementById('srv-title').value,
        category: document.getElementById('srv-category').value,
        icon: document.getElementById('srv-icon').value,
        shortDesc: document.getElementById('srv-short-desc').value,
        longDesc: document.getElementById('srv-long-desc').value
      };

      if (index !== null) {
        this.config.services[index] = updatedSrv;
      } else {
        this.config.services.push(updatedSrv);
      }

      window.Store.saveConfig(this.config);
      this.loadServicesList();
    });
  },

  // ==================== TAB 3: CONTACT FORM SUBMISSIONS ====================
  loadInquiriesInbox() {
    const inboxContainer = document.getElementById('admin-inbox-list');
    if (!inboxContainer) return;

    const inquiries = window.Store.getInquiries();

    if (inquiries.length === 0) {
      inboxContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-muted);">
          <div style="font-size: 48px; margin-bottom: 16px;">✉️</div>
          <p>Inbox Empty. No contact form inquiries received yet.</p>
        </div>
      `;
      return;
    }

    inboxContainer.innerHTML = `
      <div class="inbox-list">
        ${inquiries.map(inq => `
          <div class="inbox-card glass-card">
            <div class="inbox-header">
              <div class="inbox-meta">
                <strong>Sender:</strong> ${inq.name || 'Anonymous'} (${inq.email || 'No email'})<br>
                <strong>Company:</strong> ${inq.company || 'N/A'} &nbsp;|&nbsp; 
                <strong>Budget:</strong> ${inq.budget || 'N/A'}
              </div>
              <div class="inbox-meta" style="text-align: right;">
                ${inq.date}
              </div>
            </div>
            <div class="inbox-subject">Subject: ${inq.subject || 'No Subject'}</div>
            <div class="inbox-body">${inq.message || 'No message content.'}</div>
            <div class="inbox-actions">
              <button class="btn-icon btn-del-inq" data-id="${inq.id}" title="Delete Message">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Bind Delete Events
    inboxContainer.querySelectorAll('.btn-del-inq').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(e.currentTarget.dataset.id);
        if (confirm('Delete this inquiry permanently?')) {
          window.Store.deleteInquiry(id);
          this.loadInquiriesInbox();
        }
      });
    });
  },

  // ==================== TAB 4: MANAGE BLOG POSTS ====================
  loadBlogAdmin() {
    const listContainer = document.getElementById('admin-blog-list');
    const listView = document.getElementById('admin-blog-list-view');
    const editorView = document.getElementById('admin-blog-editor-view');
    if (!listContainer || !listView || !editorView) return;

    listView.style.display = 'block';
    editorView.style.display = 'none';

    const renderBlogList = () => {
      const posts = window.Store.getBlogPosts();

      if (posts.length === 0) {
        listContainer.innerHTML = `
          <div style="text-align: center; padding: 20px; color: var(--text-muted);">
            No blog posts published yet. Click the button above to write your first article.
          </div>
        `;
        return;
      }

      listContainer.innerHTML = posts.map((post, index) => `
        <div class="admin-list-item">
          <div>
            <span class="badge" style="margin: 0 12px 0 0; font-size: 10px; padding: 2px 8px;">${post.category}</span>
            <span class="admin-list-item-title">${post.title}</span>
            <span style="font-size: 12px; color: var(--text-muted); margin-left: 12px;">By ${post.author}</span>
          </div>
          <div class="admin-list-item-actions">
            <button class="btn btn-secondary btn-edit-blog" data-index="${index}" style="padding: 6px 12px; font-size: 13px;">Edit</button>
            <button class="btn btn-secondary btn-del-blog" data-id="${post.id}" style="padding: 6px 12px; font-size: 13px; border-color: rgba(255,95,86,0.3); color: #ff5f56;">Delete</button>
          </div>
        </div>
      `).join('');

      // Bind Edit/Delete buttons
      listContainer.querySelectorAll('.btn-edit-blog').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const index = parseInt(e.currentTarget.dataset.index);
          this.openBlogEditor(posts[index]);
        });
      });

      listContainer.querySelectorAll('.btn-del-blog').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.dataset.id;
          if (confirm('Are you sure you want to delete this blog article permanently?')) {
            window.Store.deleteBlogPost(id);
            renderBlogList();
          }
        });
      });
    };

    // Add Blog Button
    const addBlogBtn = document.getElementById('btn-add-blog');
    if (addBlogBtn) {
      const newAdd = addBlogBtn.cloneNode(true);
      addBlogBtn.parentNode.replaceChild(newAdd, addBlogBtn);
      newAdd.addEventListener('click', () => this.openBlogEditor(null));
    }

    renderBlogList();
  },

  openBlogEditor(post) {
    const listView = document.getElementById('admin-blog-list-view');
    const editorView = document.getElementById('admin-blog-editor-view');
    const form = document.getElementById('admin-blog-form');
    const header = document.getElementById('blog-editor-header');

    if (!listView || !editorView || !form) return;

    listView.style.display = 'none';
    editorView.style.display = 'block';

    const titleInput = document.getElementById('blog-title');
    const categoryInput = document.getElementById('blog-category');
    const authorInput = document.getElementById('blog-author');
    const summaryInput = document.getElementById('blog-summary');
    const contentInput = document.getElementById('blog-content');
    const idInput = document.getElementById('blog-post-id');

    if (post) {
      header.textContent = 'Edit Blog Post';
      titleInput.value = post.title || '';
      categoryInput.value = post.category || '';
      authorInput.value = post.author || '';
      summaryInput.value = post.summary || '';
      contentInput.value = post.content || post.summary || '';
      idInput.value = post.id || '';
    } else {
      header.textContent = 'Create Blog Post';
      titleInput.value = '';
      categoryInput.value = '';
      authorInput.value = '';
      summaryInput.value = '';
      contentInput.value = '';
      idInput.value = '';
    }

    // Cancel Button
    const cancelBtn = document.getElementById('btn-blog-cancel');
    if (cancelBtn) {
      const newCancel = cancelBtn.cloneNode(true);
      cancelBtn.parentNode.replaceChild(newCancel, cancelBtn);
      newCancel.addEventListener('click', () => {
        this.loadBlogAdmin();
      });
    }

    // Submit Action
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    newForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const newId = document.getElementById('blog-post-id').value;
      const updatedPost = {
        title: document.getElementById('blog-title').value.trim(),
        category: document.getElementById('blog-category').value.trim(),
        author: document.getElementById('blog-author').value.trim(),
        summary: document.getElementById('blog-summary').value.trim(),
        content: document.getElementById('blog-content').value.trim()
      };

      if (newId) {
        updatedPost.id = newId;
        // Keep date intact
        const existing = window.Store.getBlogPosts().find(p => p.id === newId);
        if (existing) updatedPost.date = existing.date;
      }

      window.Store.saveBlogPost(updatedPost);
      this.loadBlogAdmin();
    });
  },

  // ==================== TAB 5: JOB APPLICATIONS INBOX ====================
  loadJobApplications() {
    const container = document.getElementById('admin-apps-list');
    if (!container) return;

    const apps = window.Store.getJobApplications();

    if (apps.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-muted);">
          <div style="font-size: 48px; margin-bottom: 16px;">📂</div>
          <p>Inbox Empty. No job applications received yet.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="inbox-list">
        ${apps.map(app => `
          <div class="inbox-card glass-card">
            <div class="inbox-header">
              <div class="inbox-meta">
                <strong>Applicant:</strong> ${app.name} (${app.email})<br>
                <strong>Applying for:</strong> <span style="color: var(--primary-color); font-weight: 700;">${app.jobTitle}</span> &bull; 
                <strong>Resume Link:</strong> <a href="${app.resume}" target="_blank" style="color: var(--primary-color);">${app.resume}</a>
              </div>
              <div class="inbox-meta" style="text-align: right;">
                ${app.date}
              </div>
            </div>
            <div class="inbox-subject">Cover Letter / Interest Statement:</div>
            <div class="inbox-body">${app.message}</div>
            <div class="inbox-actions">
              <button class="btn-icon btn-del-app" data-id="${app.id}" title="Delete Application">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Bind Delete Events
    container.querySelectorAll('.btn-del-app').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(e.currentTarget.dataset.id);
        if (confirm('Permanently delete this applicant record?')) {
          window.Store.deleteJobApplication(id);
          this.loadJobApplications();
        }
      });
    });
  },

  // ==================== TAB 6: SUPPORT TICKETS INBOX ====================
  loadSupportTickets() {
    const container = document.getElementById('admin-tickets-list');
    if (!container) return;

    const tickets = window.Store.getSupportTickets();

    if (tickets.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-muted);">
          <div style="font-size: 48px; margin-bottom: 16px;">🛡️</div>
          <p>Inbox Empty. No support tickets logged yet.</p>
        </div>
      `;
      return;
    }

    const priorityColors = {
      Low: 'gray',
      Medium: 'var(--primary-color)',
      High: 'orange',
      Emergency: '#ff5f56'
    };

    container.innerHTML = `
      <div class="inbox-list">
        ${tickets.map(t => `
          <div class="inbox-card glass-card">
            <div class="inbox-header">
              <div class="inbox-meta">
                <strong>Sender:</strong> ${t.name} (${t.email})<br>
                <strong>Category:</strong> ${t.category} &nbsp;|&nbsp; 
                <strong>Priority:</strong> <span style="color: ${priorityColors[t.priority] || 'var(--text-color)'}; font-weight: 800;">${t.priority}</span>
              </div>
              <div class="inbox-meta" style="text-align: right;">
                ${t.date}
              </div>
            </div>
            <div class="inbox-subject">Subject: ${t.subject}</div>
            <div class="inbox-body">${t.message}</div>
            <div class="inbox-actions">
              <button class="btn-icon btn-del-ticket" data-id="${t.id}" title="Delete Ticket">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Bind Delete Events
    container.querySelectorAll('.btn-del-ticket').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(e.currentTarget.dataset.id);
        if (confirm('Delete this support ticket?')) {
          window.Store.deleteSupportTicket(id);
          this.loadSupportTickets();
        }
      });
    });
  }
};

window.AdminPanel = AdminPanel;
