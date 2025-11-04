document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('bankingToggle');
  const menu = document.getElementById('topLinks');
  const settingsIcon = document.querySelector('.settings_icon img');
  const settingsPopover = document.getElementById('settingsPopover');
  const toggleThemeBtn = document.getElementById('toggleTheme');
  const languageSelect = document.getElementById('languageSelect');

  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  };

  const toggleMenu = () => {
    const isOpen = menu.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && e.target !== toggle) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // ===== Settings popover =====
  const openSettings = () => {
    if (settingsPopover) settingsPopover.removeAttribute('hidden');
  };

  const closeSettings = () => {
    if (settingsPopover) settingsPopover.setAttribute('hidden', '');
  };

  const toggleSettings = () => {
    if (!settingsPopover) return;
    const isHidden = settingsPopover.hasAttribute('hidden');
    if (isHidden) openSettings(); else closeSettings();
  };

  if (settingsIcon) {
    settingsIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSettings();
    });
  }

  document.addEventListener('click', (e) => {
    if (settingsPopover && !settingsPopover.hasAttribute('hidden')) {
      if (!settingsPopover.contains(e.target) && e.target !== settingsIcon) {
        closeSettings();
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSettings();
  });

  // ===== Dark theme toggle =====
  const applyTheme = (isDark) => {
    document.body.classList.toggle('dark', isDark);
    if (toggleThemeBtn) toggleThemeBtn.setAttribute('aria-pressed', String(isDark));
  };

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') applyTheme(true);

  if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener('click', () => {
      const isDark = !document.body.classList.contains('dark');
      applyTheme(isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // ===== Language switch =====
  const savedLang = localStorage.getItem('lang');
  if (savedLang && languageSelect) {
    languageSelect.value = savedLang;
    document.documentElement.lang = savedLang;
  }

  if (languageSelect) {
    languageSelect.addEventListener('change', () => {
      const val = languageSelect.value;
      document.documentElement.lang = val;
      localStorage.setItem('lang', val);
    });
  }
});
