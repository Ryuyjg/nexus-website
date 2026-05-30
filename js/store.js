// LocalStorage State Manager
const Store = {
  configKey: 'nexus_site_config',
  configVersion: 'nexus_config_v',
  currentVersion: 3, // Bump this when config structure changes
  inquiriesKey: 'nexus_inquiries_db',
  appsKey: 'nexus_job_apps',
  ticketsKey: 'nexus_support_tickets',
  blogsKey: 'nexus_blog_posts',
  commentsKey: 'nexus_blog_comments',

  // Load configuration from LocalStorage or fallback to DEFAULT_CONFIG
  loadConfig() {
    try {
      const storedVersion = localStorage.getItem(this.configVersion);
      const stored = localStorage.getItem(this.configKey);
      // If version matches and config exists, use stored
      if (stored && parseInt(storedVersion) === this.currentVersion) {
        const config = JSON.parse(stored);
        // Apply theme on load
        this.applyThemeColors(config.general);
        return config;
      }
    } catch (e) {
      console.error('Failed to parse site config from localStorage', e);
    }
    // Fallback to default (version mismatch or no data), and write to store
    localStorage.setItem(this.configVersion, this.currentVersion);
    this.saveConfig(window.DEFAULT_CONFIG);
    return window.DEFAULT_CONFIG;
  },

  // Save updated config
  saveConfig(config) {
    try {
      localStorage.setItem(this.configKey, JSON.stringify(config));
      // Re-apply primary and secondary variables immediately to the DOM
      this.applyThemeColors(config.general);
      return true;
    } catch (e) {
      console.error('Failed to save config to localStorage', e);
      return false;
    }
  },

  // Reset to original factory settings
  resetConfig() {
    this.saveConfig(window.DEFAULT_CONFIG);
    return window.DEFAULT_CONFIG;
  },

  // Apply accent colors dynamically to the CSS variables
  applyThemeColors(generalConfig) {
    if (!generalConfig) return;
    const root = document.documentElement;
    
    // Helper to convert hex to RGB
    const hexToRgb = (hex) => {
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
      return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
    };

    // Handle body theme class FIRST so CSS variables apply correctly
    if (generalConfig.isDarkTheme === false) {
      document.body.classList.add('light-mode');
      // In light mode, clear any inline overrides so CSS body.light-mode rules take effect
      root.style.removeProperty('--primary-color');
      root.style.removeProperty('--primary-color-rgb');
      root.style.removeProperty('--secondary-color');
      root.style.removeProperty('--secondary-color-rgb');
      root.style.removeProperty('--accent-color');
      root.style.removeProperty('--accent-color-rgb');
    } else {
      document.body.classList.remove('light-mode');
      // In dark mode, apply admin-customized colors
      if (generalConfig.primaryColor) {
        root.style.setProperty('--primary-color', generalConfig.primaryColor);
        const rgb = hexToRgb(generalConfig.primaryColor);
        if (rgb) root.style.setProperty('--primary-color-rgb', rgb);
      }
      if (generalConfig.secondaryColor) {
        root.style.setProperty('--secondary-color', generalConfig.secondaryColor);
        const rgb = hexToRgb(generalConfig.secondaryColor);
        if (rgb) root.style.setProperty('--secondary-color-rgb', rgb);
      }
      if (generalConfig.accentColor) {
        root.style.setProperty('--accent-color', generalConfig.accentColor);
        const rgb = hexToRgb(generalConfig.accentColor);
        if (rgb) root.style.setProperty('--accent-color-rgb', rgb);
      }
    }
  },

  // Retrieve inquiries
  getInquiries() {
    try {
      const stored = localStorage.getItem(this.inquiriesKey);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to load inquiries', e);
      return [];
    }
  },

  // Save new inquiry
  saveInquiry(inquiry) {
    try {
      const inquiries = this.getInquiries();
      const newInquiry = {
        ...inquiry,
        id: Date.now(),
        date: new Date().toLocaleString()
      };
      inquiries.unshift(newInquiry); // Add to beginning (latest first)
      localStorage.setItem(this.inquiriesKey, JSON.stringify(inquiries));
      return true;
    } catch (e) {
      console.error('Failed to save inquiry', e);
      return false;
    }
  },

  // Delete an inquiry
  deleteInquiry(id) {
    try {
      let inquiries = this.getInquiries();
      inquiries = inquiries.filter(item => item.id !== id);
      localStorage.setItem(this.inquiriesKey, JSON.stringify(inquiries));
      return true;
    } catch (e) {
      console.error('Failed to delete inquiry', e);
      return false;
    }
  },

  // ==================== BLOG POSTS STORE ====================
  getBlogPosts() {
    try {
      const stored = localStorage.getItem(this.blogsKey);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to load blog posts', e);
    }
    // Fallback to config default blog posts if not set
    const config = this.loadConfig();
    return config.blogPosts || [];
  },

  saveBlogPost(post) {
    try {
      const posts = this.getBlogPosts();
      if (post.id) {
        // Edit existing
        const index = posts.findIndex(p => p.id === post.id);
        if (index !== -1) posts[index] = post;
      } else {
        // Add new
        post.id = 'blog-' + Date.now();
        post.date = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
        posts.unshift(post);
      }
      localStorage.setItem(this.blogsKey, JSON.stringify(posts));
      
      // Also write back to config so it is unified
      const config = this.loadConfig();
      config.blogPosts = posts;
      this.saveConfig(config);
      return true;
    } catch (e) {
      console.error('Failed to save blog post', e);
      return false;
    }
  },

  deleteBlogPost(id) {
    try {
      let posts = this.getBlogPosts();
      posts = posts.filter(p => p.id !== id);
      localStorage.setItem(this.blogsKey, JSON.stringify(posts));
      
      const config = this.loadConfig();
      config.blogPosts = posts;
      this.saveConfig(config);
      return true;
    } catch (e) {
      console.error('Failed to delete blog post', e);
      return false;
    }
  },

  // ==================== JOB APPLICATIONS STORE ====================
  getJobApplications() {
    try {
      const stored = localStorage.getItem(this.appsKey);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to load job apps', e);
      return [];
    }
  },

  saveJobApplication(app) {
    try {
      const apps = this.getJobApplications();
      const newApp = {
        ...app,
        id: Date.now(),
        date: new Date().toLocaleString()
      };
      apps.unshift(newApp);
      localStorage.setItem(this.appsKey, JSON.stringify(apps));
      return true;
    } catch (e) {
      console.error('Failed to save job application', e);
      return false;
    }
  },

  deleteJobApplication(id) {
    try {
      let apps = this.getJobApplications();
      apps = apps.filter(a => a.id !== id);
      localStorage.setItem(this.appsKey, JSON.stringify(apps));
      return true;
    } catch (e) {
      console.error('Failed to delete job application', e);
      return false;
    }
  },

  // ==================== SUPPORT TICKETS STORE ====================
  getSupportTickets() {
    try {
      const stored = localStorage.getItem(this.ticketsKey);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to load support tickets', e);
      return [];
    }
  },

  saveSupportTicket(ticket) {
    try {
      const tickets = this.getSupportTickets();
      const newTicket = {
        ...ticket,
        id: Date.now(),
        date: new Date().toLocaleString()
      };
      tickets.unshift(newTicket);
      localStorage.setItem(this.ticketsKey, JSON.stringify(tickets));
      return true;
    } catch (e) {
      console.error('Failed to save support ticket', e);
      return false;
    }
  },

  deleteSupportTicket(id) {
    try {
      let tickets = this.getSupportTickets();
      tickets = tickets.filter(t => t.id !== id);
      localStorage.setItem(this.ticketsKey, JSON.stringify(tickets));
      return true;
    } catch (e) {
      console.error('Failed to delete support ticket', e);
      return false;
    }
  },

  // ==================== BLOG COMMENTS STORE ====================
  getComments(postId) {
    try {
      const stored = localStorage.getItem(this.commentsKey);
      const commentsMap = stored ? JSON.parse(stored) : {};
      return commentsMap[postId] || [];
    } catch (e) {
      console.error('Failed to load comments', e);
      return [];
    }
  },

  saveComment(postId, comment) {
    try {
      const stored = localStorage.getItem(this.commentsKey);
      const commentsMap = stored ? JSON.parse(stored) : {};
      if (!commentsMap[postId]) commentsMap[postId] = [];
      
      const newComment = {
        ...comment,
        id: Date.now(),
        date: new Date().toLocaleString()
      };
      commentsMap[postId].push(newComment);
      localStorage.setItem(this.commentsKey, JSON.stringify(commentsMap));
      return true;
    } catch (e) {
      console.error('Failed to save comment', e);
      return false;
    }
  }
};

window.Store = Store;
