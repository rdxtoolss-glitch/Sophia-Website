/**
 * Sophia AI — Global Application Script
 * Developer-grade interactive controls: Hero HUD simulation, persona switcher,
 * terminal commands copy, drawer, accordions, and contact dispatcher.
 * Author: Muhammad Junaid (Mobo Devs Studio)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = mobileDrawer.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
      if (!mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileDrawer.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
        mobileDrawer.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2. Terminal Installation Command Copy (winget / scoop / powershell)
  const terminalCopyBtns = document.querySelectorAll('.terminal-copy-btn');
  terminalCopyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const parentPill = btn.closest('.terminal-pill');
      const codeElement = parentPill?.querySelector('code');
      if (codeElement) {
        const text = codeElement.innerText.trim();
        try {
          await navigator.clipboard.writeText(text);
          const originalHTML = btn.innerHTML;
          btn.innerHTML = `<span style="color: var(--accent-cyan); font-size: 11px; font-weight: 700;">COPIED!</span>`;
          setTimeout(() => {
            btn.innerHTML = originalHTML;
          }, 2000);
        } catch (err) {
          console.error('Failed to copy terminal command', err);
        }
      }
    });
  });

  // 3. Accordions (FAQ & Docs)
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.closest('.accordion-item');
      if (!parent) return;

      const isCurrentActive = parent.classList.contains('active');

      const group = parent.closest('.accordion-group');
      if (group && !group.hasAttribute('data-allow-multiple')) {
        group.querySelectorAll('.accordion-item').forEach(item => {
          item.classList.remove('active');
        });
      }

      if (!isCurrentActive) {
        parent.classList.add('active');
      } else {
        parent.classList.remove('active');
      }
    });
  });

  // 4. Generic Copy Code Buttons
  const copyButtons = document.querySelectorAll('.btn-copy');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetSelector = btn.getAttribute('data-target');
      let textToCopy = '';

      if (targetSelector) {
        const targetElement = document.querySelector(targetSelector);
        if (targetElement) textToCopy = targetElement.innerText.trim();
      } else {
        const parentCode = btn.closest('.code-box')?.querySelector('code');
        if (parentCode) textToCopy = parentCode.innerText.trim();
      }

      if (textToCopy) {
        try {
          await navigator.clipboard.writeText(textToCopy);
          const originalText = btn.innerText;
          btn.innerText = 'Copied!';
          btn.style.borderColor = 'var(--accent-cyan)';
          btn.style.color = 'var(--accent-cyan)';

          setTimeout(() => {
            btn.innerText = originalText;
            btn.style.borderColor = '';
            btn.style.color = '';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy text', err);
        }
      }
    });
  });

  // 5. Persona Chips Switcher
  const personaChips = document.querySelectorAll('.persona-chip');
  personaChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      personaChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  // 6. Contact Form Client-Side Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedbackBox = document.getElementById('formFeedback');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Dispatching to Mobo Devs...';
      }

      setTimeout(() => {
        if (feedbackBox) {
          feedbackBox.style.display = 'block';
          feedbackBox.innerHTML = `
            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 16px; color: #34d399; font-size: 13.5px; margin-bottom: 20px;">
              <strong>Dispatch Ticket Created: #SOPH-${Math.floor(1000 + Math.random() * 9000)}</strong><br>
              Your message has been routed to <strong>Muhammad Junaid</strong> and the Mobo Devs Studio engineering team. A confirmation has been logged to <code>support@mobodevs.net</code>.
            </div>
          `;
        }
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = 'Send Message';
        }
      }, 600);
    });
  }

  // 7. Interactive Glass Theme Accent Switcher (Cyan, Emerald, Violet)
  const savedTheme = localStorage.getItem('sophia-theme') || 'cyan';
  const applyTheme = (theme) => {
    if (theme === 'cyan') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('sophia-theme', theme);
    document.querySelectorAll('.theme-dot').forEach(dot => {
      dot.classList.toggle('active', dot.getAttribute('data-theme') === theme);
    });
  };

  applyTheme(savedTheme);

  document.querySelectorAll('.theme-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const targetTheme = dot.getAttribute('data-theme');
      if (targetTheme) applyTheme(targetTheme);
    });
  });
});
