// Admin Control Center Logic
const AdminPanel = {
  isLoggedIn: false,
  config: {},
  activeTab: 'general',

  async init() {
    this.config = window.Store.loadConfig();
    this.isLoggedIn = sessionStorage.getItem('admin_logged_in') === 'true';

    // Auto-load GitHub token from local config (if available)
    await this.loadLocalGithubToken();

    this.render();
  },

  async sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },

  async loadLocalGithubToken() {
    try {
      const res = await fetch('github_pat.json');
      if (res.ok) {
        const data = await res.json();
        if (data && data.pat) {
          localStorage.setItem('nexus_github_pat', data.pat.trim());
          console.log('GitHub Token auto-loaded from local configuration file.');
        }
      }
    } catch (e) {
      // Normal when deployed on GitHub Pages
    }
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

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const passwordInput = document.getElementById('admin-password');
      if (!passwordInput) return;

      const password = passwordInput.value;
      const hash = await this.sha256(password);
      const expectedHash = this.config.general.adminPasswordHash || '24075bab947d53b4b0e5110d7a961bebeb97cc93e5066a3d902d25087f9efb4b';

      if (hash === expectedHash) {
        this.isLoggedIn = true;
        sessionStorage.setItem('admin_logged_in', 'true');
        passwordInput.value = '';
        if (errorMsg) errorMsg.style.opacity = '0';
        this.render();
      } else {
        if (errorMsg) {
          errorMsg.textContent = 'Invalid administrator password.';
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

  // ==================== GITHUB INTEGRATION HELPERS ====================
  async githubUploadFile(file, base64Content, repo, branch, pat) {
    const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '');
    const extension = cleanName.split('.').pop() || 'png';
    const filename = `uploads/img-${Date.now()}.${extension}`;
    const url = `https://api.github.com/repos/${repo}/contents/${filename}`;
    
    // Split the data URL prefix if present
    const base64Data = base64Content.includes(',') ? base64Content.split(',')[1] : base64Content;

    const payload = {
      message: `Upload ${filename} via CMS Admin Panel`,
      content: base64Data,
      branch: branch
    };

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${pat}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'GitHub upload failed');
    }

    const data = await response.json();
    return `https://raw.githubusercontent.com/${repo}/${branch}/${filename}`;
  },

  async githubSaveConfig(config, repo, branch, pat) {
    const url = `https://api.github.com/repos/${repo}/contents/config.json`;
    
    // Get file SHA if it exists
    let sha = null;
    try {
      const getRes = await fetch(url, {
        headers: {
          'Authorization': `token ${pat}`,
          'Accept': 'application/vnd.github+json'
        }
      });
      if (getRes.ok) {
        const fileData = await getRes.json();
        sha = fileData.sha;
      }
    } catch (e) {
      console.log('config.json does not exist yet, creating fresh.');
    }

    const configStr = JSON.stringify(config, null, 2);
    const base64Content = btoa(unescape(encodeURIComponent(configStr)));

    const payload = {
      message: 'CMS Update: Sync website configurations',
      content: base64Content,
      branch: branch
    };
    if (sha) payload.sha = sha;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${pat}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Failed to save config.json to GitHub');
    }
  },

  loadGeneralSettings() {
    const form = document.getElementById('admin-general-form');
    if (!form) return;

    // Clone the form first to clear any old event listeners
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);

    // Now query active inputs from the newly cloned form
    const ghRepoInput = newForm.querySelector('#adm-github-repo');
    const ghBranchInput = newForm.querySelector('#adm-github-branch');
    const ghPatInput = newForm.querySelector('#adm-github-pat');

    // Info Inputs
    const companyInput = newForm.querySelector('#adm-company-name');
    const logoTxtInput = newForm.querySelector('#adm-logo-text');
    const logoIconInput = newForm.querySelector('#adm-logo-icon');
    const footerInput = newForm.querySelector('#adm-footer-copyright');

    // Logo Image Customization
    const logoTypeSelect = newForm.querySelector('#adm-logo-type');
    const logoImgGroup = newForm.querySelector('#adm-logo-image-group');
    const logoImgUrl = newForm.querySelector('#adm-logo-image-url');
    const logoFile = newForm.querySelector('#adm-logo-file');
    const logoPreviewRow = newForm.querySelector('#adm-logo-preview-row');
    const logoPreviewContainer = newForm.querySelector('#adm-logo-preview-container');

    // Hero Inputs
    const heroBadgeInput = newForm.querySelector('#adm-hero-badge');
    const heroTitleInput = newForm.querySelector('#adm-hero-title');
    const heroDescInput = newForm.querySelector('#adm-hero-desc');
    const heroCta1Input = newForm.querySelector('#adm-hero-cta1');
    const heroCta2Input = newForm.querySelector('#adm-hero-cta2');

    // Hero Image Customization
    const heroTypeSelect = newForm.querySelector('#adm-hero-type');
    const heroImgGroup = newForm.querySelector('#adm-hero-image-group');
    const heroImgUrl = newForm.querySelector('#adm-hero-image-url');
    const heroFile = newForm.querySelector('#adm-hero-file');
    const heroPreviewRow = newForm.querySelector('#adm-hero-preview-row');
    const heroPreviewContainer = newForm.querySelector('#adm-hero-preview-container');

    // Color Pickers
    const primaryPicker = newForm.querySelector('#color-primary');
    const secondaryPicker = newForm.querySelector('#color-secondary');
    const accentPicker = newForm.querySelector('#color-accent');

    // Password change inputs
    const newPasswordInput = newForm.querySelector('#adm-new-password');
    const confirmPasswordInput = newForm.querySelector('#adm-confirm-password');

    // Set initial values
    if (ghRepoInput) ghRepoInput.value = this.config.general.githubRepo || 'Ryuyjg/nexus-website';
    if (ghBranchInput) ghBranchInput.value = this.config.general.githubBranch || 'main';
    if (ghPatInput) ghPatInput.value = localStorage.getItem('nexus_github_pat') || '';

    if (companyInput) companyInput.value = this.config.general.companyName;
    if (logoTxtInput) logoTxtInput.value = this.config.general.logoText;
    if (logoIconInput) logoIconInput.value = this.config.general.logoIcon;
    if (footerInput) footerInput.value = this.config.general.copyright;

    if (logoTypeSelect) logoTypeSelect.value = this.config.general.logoType || 'text';
    if (logoImgUrl) logoImgUrl.value = this.config.general.logoImageUrl || '';

    if (heroBadgeInput) heroBadgeInput.value = this.config.hero.badge;
    if (heroTitleInput) heroTitleInput.value = this.config.hero.title;
    if (heroDescInput) heroDescInput.value = this.config.hero.subtitle;
    if (heroCta1Input) heroCta1Input.value = this.config.hero.ctaPrimaryText;
    if (heroCta2Input) heroCta2Input.value = this.config.hero.ctaSecondaryText;

    if (heroTypeSelect) heroTypeSelect.value = this.config.hero.visualType || 'mockup';
    if (heroImgUrl) heroImgUrl.value = this.config.hero.imageUrl || '';

    if (primaryPicker) primaryPicker.value = this.config.general.primaryColor;
    if (secondaryPicker) secondaryPicker.value = this.config.general.secondaryColor;
    if (accentPicker) accentPicker.value = this.config.general.accentColor;

    // Helper: update image preview
    const updatePreview = (inputEl, previewEl, rowEl) => {
      if (!inputEl || !previewEl || !rowEl) return;
      const url = inputEl.value.trim();
      if (url) {
        previewEl.innerHTML = `<img src="${url}" style="width: 100%; height: 100%; object-fit: contain; border-radius: inherit;" />`;
        rowEl.style.display = 'flex';
      } else {
        previewEl.innerHTML = `<span style="color: var(--text-muted); font-size: 11px;">Empty</span>`;
        rowEl.style.display = 'none';
      }
    };

    // Toggle fields visibility
    const toggleLogoFields = () => {
      if (logoTypeSelect && logoTypeSelect.value === 'image') {
        if (logoImgGroup) logoImgGroup.style.display = 'block';
        updatePreview(logoImgUrl, logoPreviewContainer, logoPreviewRow);
      } else {
        if (logoImgGroup) logoImgGroup.style.display = 'none';
        if (logoPreviewRow) logoPreviewRow.style.display = 'none';
      }
    };

    const toggleHeroFields = () => {
      if (heroTypeSelect && heroTypeSelect.value === 'image') {
        if (heroImgGroup) heroImgGroup.style.display = 'block';
        updatePreview(heroImgUrl, heroPreviewContainer, heroPreviewRow);
      } else {
        if (heroImgGroup) heroImgGroup.style.display = 'none';
        if (heroPreviewRow) heroPreviewRow.style.display = 'none';
      }
    };

    if (logoTypeSelect) logoTypeSelect.addEventListener('change', toggleLogoFields);
    if (heroTypeSelect) heroTypeSelect.addEventListener('change', toggleHeroFields);

    toggleLogoFields();
    toggleHeroFields();

    // Listeners for manual URL input paste
    if (logoImgUrl) logoImgUrl.addEventListener('input', () => updatePreview(logoImgUrl, logoPreviewContainer, logoPreviewRow));
    if (heroImgUrl) heroImgUrl.addEventListener('input', () => updatePreview(heroImgUrl, heroPreviewContainer, heroPreviewRow));

    // Handle Logo File Uploads
    if (logoFile) {
      logoFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (event) => {
          const base64 = event.target.result;
          const pat = ghPatInput.value.trim();
          const repo = ghRepoInput.value.trim();
          const branch = ghBranchInput.value.trim();

          if (pat && repo) {
            logoPreviewContainer.innerHTML = `<span style="color: var(--primary-color); font-size: 11px;">Uploading...</span>`;
            logoPreviewRow.style.display = 'flex';
            try {
              const uploadedUrl = await this.githubUploadFile(file, base64, repo, branch, pat);
              logoImgUrl.value = uploadedUrl;
              updatePreview(logoImgUrl, logoPreviewContainer, logoPreviewRow);
              alert('Logo uploaded directly to GitHub repository successfully!');
            } catch (err) {
              console.error(err);
              alert('GitHub upload failed. Falling back to local Base64 configuration.\nError: ' + err.message);
              logoImgUrl.value = base64;
              updatePreview(logoImgUrl, logoPreviewContainer, logoPreviewRow);
            }
          } else {
            logoImgUrl.value = base64;
            updatePreview(logoImgUrl, logoPreviewContainer, logoPreviewRow);
            alert('Configured locally! To make it live on the web, configure your GitHub repository and PAT token.');
          }
        };
        reader.readAsDataURL(file);
      });
    }

    // Handle Hero File Uploads
    if (heroFile) {
      heroFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (event) => {
          const base64 = event.target.result;
          const pat = ghPatInput.value.trim();
          const repo = ghRepoInput.value.trim();
          const branch = ghBranchInput.value.trim();

          if (pat && repo) {
            heroPreviewContainer.innerHTML = `<span style="color: var(--primary-color); font-size: 11px;">Uploading...</span>`;
            heroPreviewRow.style.display = 'flex';
            try {
              const uploadedUrl = await this.githubUploadFile(file, base64, repo, branch, pat);
              heroImgUrl.value = uploadedUrl;
              updatePreview(heroImgUrl, heroPreviewContainer, heroPreviewRow);
              alert('Hero image uploaded directly to GitHub repository successfully!');
            } catch (err) {
              console.error(err);
              alert('GitHub upload failed. Falling back to local Base64 configuration.\nError: ' + err.message);
              heroImgUrl.value = base64;
              updatePreview(heroImgUrl, heroPreviewContainer, heroPreviewRow);
            }
          } else {
            heroImgUrl.value = base64;
            updatePreview(heroImgUrl, heroPreviewContainer, heroPreviewRow);
            alert('Configured locally! To make it live on the web, configure your GitHub repository and PAT token.');
          }
        };
        reader.readAsDataURL(file);
      });
    }

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
    newForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const repo = ghRepoInput.value.trim();
      const branch = ghBranchInput.value.trim();
      const pat = ghPatInput.value.trim();

      const companyVal = companyInput.value;
      const logoTxtVal = logoTxtInput.value;
      const logoIconVal = logoIconInput.value;
      const logoTypeVal = logoTypeSelect.value;
      const logoImageUrlVal = logoImgUrl.value.trim();
      const copyrightVal = footerInput.value;

      const heroBadgeVal = heroBadgeInput.value;
      const heroTitleVal = heroTitleInput.value;
      const heroDescVal = heroDescInput.value;
      const heroCta1Val = heroCta1Input.value;
      const heroCta2Val = heroCta2Input.value;
      const heroVisualVal = heroTypeSelect.value;
      const heroImageUrlVal = heroImgUrl.value.trim();

      const primaryCol = primaryPicker.value;
      const secondaryCol = secondaryPicker.value;
      const accentCol = accentPicker.value;

      // Handle password change
      const newPasswordVal = newPasswordInput ? newPasswordInput.value : '';
      const confirmPasswordVal = confirmPasswordInput ? confirmPasswordInput.value : '';

      if (newPasswordVal) {
        if (newPasswordVal !== confirmPasswordVal) {
          alert('New passwords do not match. Please verify.');
          return;
        }
        const newPasswordHash = await this.sha256(newPasswordVal);
        this.config.general.adminPasswordHash = newPasswordHash;
      }

      // Save Token locally
      localStorage.setItem('nexus_github_pat', pat);

      // Build updated configuration structure
      this.config.general.githubRepo = repo;
      this.config.general.githubBranch = branch;
      this.config.general.companyName = companyVal;
      this.config.general.logoText = logoTxtVal;
      this.config.general.logoIcon = logoIconVal;
      this.config.general.logoType = logoTypeVal;
      this.config.general.logoImageUrl = logoImageUrlVal;
      this.config.general.copyright = copyrightVal;
      this.config.general.primaryColor = primaryCol;
      this.config.general.secondaryColor = secondaryCol;
      this.config.general.accentColor = accentCol;

      this.config.hero.badge = heroBadgeVal;
      this.config.hero.title = heroTitleVal;
      this.config.hero.subtitle = heroDescVal;
      this.config.hero.ctaPrimaryText = heroCta1Val;
      this.config.hero.ctaSecondaryText = heroCta2Val;
      this.config.hero.visualType = heroVisualVal;
      this.config.hero.imageUrl = heroImageUrlVal;

      window.Store.saveConfig(this.config);
      
      if (newPasswordInput) newPasswordInput.value = '';
      if (confirmPasswordInput) confirmPasswordInput.value = '';

      // Live updates header
      if (window.App) {
        window.App.renderHeaderFooter();
        window.App.renderHome();
      }

      // Handle GitHub Sync
      if (pat && repo) {
        const submitBtn = newForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Syncing config to GitHub...';
        submitBtn.disabled = true;
        try {
          await this.githubSaveConfig(this.config, repo, branch, pat);
          alert('Configurations saved locally and successfully pushed to GitHub!\n\nGitHub Pages will rebuild and go live with these edits in approximately 30 seconds.');
        } catch (err) {
          console.error(err);
          alert('Configurations saved locally, but syncing to GitHub failed.\nError: ' + err.message);
        } finally {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      } else {
        alert('Global configurations saved locally in this browser. To make this live on the web, please fill in your GitHub PAT and Repository details.');
      }
    });
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
      category: 'AI',
      imageUrl: ''
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
        <div class="form-row" style="margin-top: 16px;">
          <div class="form-group">
            <label for="srv-representation">Service Representation</label>
            <select id="srv-representation" class="form-control" style="background: var(--input-bg); height: 48px; border: 1px solid var(--input-border); color: var(--text-color); border-radius: 8px; width: 100%; outline: none; padding: 12px 16px;">
              <option value="emoji" ${!srv.imageUrl ? 'selected' : ''}>Emoji Icon</option>
              <option value="image" ${srv.imageUrl ? 'selected' : ''}>Custom Service Image</option>
            </select>
          </div>
          <div class="form-group" id="srv-image-group" style="${srv.imageUrl ? '' : 'display: none;'}">
            <label for="srv-image-url">Service Image Source</label>
            <div style="display: flex; gap: 8px; align-items: center;">
              <input type="file" id="srv-file" accept="image/*" style="display: none;">
              <button type="button" class="btn btn-secondary" onclick="document.getElementById('srv-file').click()" style="padding: 12px; height: 48px; font-size: 13px; white-space: nowrap;">Upload File</button>
              <input type="text" id="srv-image-url" class="form-control" value="${srv.imageUrl || ''}" placeholder="Or paste image URL">
            </div>
          </div>
        </div>
        <div class="form-row" id="srv-preview-row" style="${srv.imageUrl ? '' : 'display: none;'} margin-top: 12px;">
          <div class="form-group">
            <label>Service Image Preview</label>
            <div id="srv-preview-container" style="width: 56px; height: 56px; border: 1px dashed var(--card-border); border-radius: 12px; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 2px; background: rgba(0,0,0,0.15);">
              ${srv.imageUrl ? `<img src="${srv.imageUrl}" style="width:100%; height:100%; object-fit:cover; border-radius:inherit;" />` : '<span style="color: var(--text-muted); font-size: 11px;">Empty</span>'}
            </div>
          </div>
        </div>
        <div class="form-group" style="margin-top: 16px;">
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

    // Elements
    const representationSelect = document.getElementById('srv-representation');
    const srvImgGroup = document.getElementById('srv-image-group');
    const srvImgUrl = document.getElementById('srv-image-url');
    const srvFile = document.getElementById('srv-file');
    const srvPreviewRow = document.getElementById('srv-preview-row');
    const srvPreviewContainer = document.getElementById('srv-preview-container');

    // Previews updates helper
    const updateSrvPreview = () => {
      if (!srvImgUrl || !srvPreviewContainer || !srvPreviewRow) return;
      const url = srvImgUrl.value.trim();
      if (url) {
        srvPreviewContainer.innerHTML = `<img src="${url}" style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit;" />`;
        srvPreviewRow.style.display = 'flex';
      } else {
        srvPreviewContainer.innerHTML = `<span style="color: var(--text-muted); font-size: 11px;">Empty</span>`;
        srvPreviewRow.style.display = 'none';
      }
    };

    // Listeners
    if (representationSelect) {
      representationSelect.addEventListener('change', () => {
        if (representationSelect.value === 'image') {
          if (srvImgGroup) srvImgGroup.style.display = 'block';
          updateSrvPreview();
        } else {
          if (srvImgGroup) srvImgGroup.style.display = 'none';
          if (srvPreviewRow) srvPreviewRow.style.display = 'none';
        }
      });
    }

    if (srvImgUrl) srvImgUrl.addEventListener('input', updateSrvPreview);

    // Upload file
    if (srvFile) {
      srvFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (event) => {
          const base64 = event.target.result;
          const pat = localStorage.getItem('nexus_github_pat') || '';
          const repo = this.config.general.githubRepo || 'Ryuyjg/nexus-website';
          const branch = this.config.general.githubBranch || 'main';

          if (pat && repo) {
            srvPreviewContainer.innerHTML = `<span style="color: var(--primary-color); font-size: 11px;">Uploading...</span>`;
            srvPreviewRow.style.display = 'flex';
            try {
              const uploadedUrl = await this.githubUploadFile(file, base64, repo, branch, pat);
              srvImgUrl.value = uploadedUrl;
              updateSrvPreview();
              alert('Service image uploaded to GitHub successfully!');
            } catch (err) {
              console.error(err);
              alert('GitHub upload failed. Falling back to local Base64.\nError: ' + err.message);
              srvImgUrl.value = base64;
              updateSrvPreview();
            }
          } else {
            srvImgUrl.value = base64;
            updateSrvPreview();
            alert('Saved locally. To make it work on the web, configure your GitHub repository and PAT token.');
          }
        };
        reader.readAsDataURL(file);
      });
    }

    // Cancel Button
    document.getElementById('btn-srv-cancel').addEventListener('click', () => {
      this.loadServicesList();
    });

    // Form Submission
    document.getElementById('admin-srv-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const updatedSrv = {
        id: index !== null ? srv.id : 'srv-' + Date.now(),
        title: document.getElementById('srv-title').value,
        category: document.getElementById('srv-category').value,
        icon: document.getElementById('srv-icon').value,
        imageUrl: representationSelect.value === 'image' ? srvImgUrl.value.trim() : '',
        shortDesc: document.getElementById('srv-short-desc').value,
        longDesc: document.getElementById('srv-long-desc').value
      };

      if (index !== null) {
        this.config.services[index] = updatedSrv;
      } else {
        this.config.services.push(updatedSrv);
      }

      window.Store.saveConfig(this.config);

      // Live updates views
      if (window.App) {
        window.App.renderHome();
        window.App.renderServices();
      }

      // Handle GitHub sync
      const pat = localStorage.getItem('nexus_github_pat') || '';
      const repo = this.config.general.githubRepo;
      const branch = this.config.general.githubBranch || 'main';

      if (pat && repo) {
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Syncing config...';
        submitBtn.disabled = true;
        try {
          await this.githubSaveConfig(this.config, repo, branch, pat);
          alert('Service saved and successfully synced to GitHub!');
        } catch (err) {
          console.error(err);
          alert('Saved locally, but failed to sync to GitHub.\nError: ' + err.message);
        } finally {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          this.loadServicesList();
        }
      } else {
        alert('Service configurations saved locally.');
        this.loadServicesList();
      }
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
        ${inquiries.map(inq => {
          const escName = window.Store.escapeHTML(inq.name || 'Anonymous');
          const escEmail = window.Store.escapeHTML(inq.email || 'No email');
          const escCompany = window.Store.escapeHTML(inq.company || 'N/A');
          const escBudget = window.Store.escapeHTML(inq.budget || 'N/A');
          const escDate = window.Store.escapeHTML(inq.date || '');
          const escSubject = window.Store.escapeHTML(inq.subject || 'No Subject');
          const escMessage = window.Store.escapeHTML(inq.message || 'No message content.');
          return `
            <div class="inbox-card glass-card">
              <div class="inbox-header">
                <div class="inbox-meta">
                  <strong>Sender:</strong> ${escName} (${escEmail})<br>
                  <strong>Company:</strong> ${escCompany} &nbsp;|&nbsp; 
                  <strong>Budget:</strong> ${escBudget}
                </div>
                <div class="inbox-meta" style="text-align: right;">
                  ${escDate}
                </div>
              </div>
              <div class="inbox-subject">Subject: ${escSubject}</div>
              <div class="inbox-body">${escMessage}</div>
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
          `;
        }).join('')}
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
        ${apps.map(app => {
          const escName = window.Store.escapeHTML(app.name || 'Anonymous');
          const escEmail = window.Store.escapeHTML(app.email || '');
          const escJobTitle = window.Store.escapeHTML(app.jobTitle || '');
          const escResume = window.Store.escapeHTML(app.resume || '');
          const escDate = window.Store.escapeHTML(app.date || '');
          const escMessage = window.Store.escapeHTML(app.message || 'No cover letter provided.');
          return `
            <div class="inbox-card glass-card">
              <div class="inbox-header">
                <div class="inbox-meta">
                  <strong>Applicant:</strong> ${escName} (${escEmail})<br>
                  <strong>Applying for:</strong> <span style="color: var(--primary-color); font-weight: 700;">${escJobTitle}</span> &bull; 
                  <strong>Resume Link:</strong> <a href="${escResume}" target="_blank" style="color: var(--primary-color);">${escResume}</a>
                </div>
                <div class="inbox-meta" style="text-align: right;">
                  ${escDate}
                </div>
              </div>
              <div class="inbox-subject">Cover Letter / Interest Statement:</div>
              <div class="inbox-body">${escMessage}</div>
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
          `;
        }).join('')}
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
        ${tickets.map(t => {
          const escName = window.Store.escapeHTML(t.name || 'Anonymous');
          const escEmail = window.Store.escapeHTML(t.email || '');
          const escCategory = window.Store.escapeHTML(t.category || '');
          const escPriority = window.Store.escapeHTML(t.priority || '');
          const escDate = window.Store.escapeHTML(t.date || '');
          const escSubject = window.Store.escapeHTML(t.subject || 'No Subject');
          const escMessage = window.Store.escapeHTML(t.message || 'No message content.');
          return `
            <div class="inbox-card glass-card">
              <div class="inbox-header">
                <div class="inbox-meta">
                  <strong>Sender:</strong> ${escName} (${escEmail})<br>
                  <strong>Category:</strong> ${escCategory} &nbsp;|&nbsp; 
                  <strong>Priority:</strong> <span style="color: ${priorityColors[escPriority] || 'var(--text-color)'}; font-weight: 800;">${escPriority}</span>
                </div>
                <div class="inbox-meta" style="text-align: right;">
                  ${escDate}
                </div>
              </div>
              <div class="inbox-subject">Subject: ${escSubject}</div>
              <div class="inbox-body">${escMessage}</div>
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
          `;
        }).join('')}
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
