const slides = [
      {
        title: "Your Next Home is<br>Just a Click away",
        desc: "Access property details, submit inquiries, upload your requirements, and track your journey.",
        // Replace with your own image URL or local file path
        img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Modern Architectural<br>Masterpieces",
        desc: "Handpicked premium properties curated for comfort, prestige, and high capital growth.",
        img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Verified Listings,<br>Direct Support",
        desc: "Schedule private viewings and consult directly with licensed CD Miranda Realty brokers.",
        img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
      }
    ];

    let currentSlide = 0;

    function setSlide(index) {
      currentSlide = index;
      const titleEl = document.getElementById('slideTitle');
      const descEl = document.getElementById('slideDesc');
      const imgEl = document.getElementById('slideImage');
      const dots = document.querySelectorAll('.dot');

      // Update text & image
      titleEl.innerHTML = slides[index].title;
      descEl.textContent = slides[index].desc;
      imgEl.src = slides[index].img;

      // Update dots active class
      dots.forEach((dot, idx) => {
        if (idx === index) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    // Auto rotate every 6 seconds
    setInterval(() => {
      const next = (currentSlide + 1) % slides.length;
      setSlide(next);
    }, 6000);

    /* --- FORM SWITCHING (LOGIN / REGISTER) --- */
    function switchView(target) {
      clearNotice();
      const loginPanel = document.getElementById('loginPanel');
      const registerPanel = document.getElementById('registerPanel');

      if (target === 'register') {
        loginPanel.classList.remove('active');
        registerPanel.classList.add('active');
      } else {
        registerPanel.classList.remove('active');
        loginPanel.classList.add('active');
      }
    }

    /* --- SHOW / HIDE PASSWORD --- */
    function togglePassword(inputId, btn) {
      const input = document.getElementById(inputId);
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';

      // Switch icon
      btn.innerHTML = isPassword
        ? `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
        : `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
    }

    /* --- STATUS NOTIFICATION HELPER --- */
    function notify(message, type) {
      const notice = document.getElementById('statusNotice');
      notice.textContent = message;
      notice.className = `status-msg ${type}`;
    }

    function clearNotice() {
      const notice = document.getElementById('statusNotice');
      notice.textContent = '';
      notice.className = 'status-msg';
    }

    /* --- FORM SUBMISSION HANDLERS --- */
    function handleLogin(event) {
      event.preventDefault();
      const email = document.getElementById('loginEmail').value;
      notify(`Welcome back! Logging in as ${email}...`, 'success');
    }

    function handleRegister(event) {
      event.preventDefault();
      const pass = document.getElementById('regPassword').value;
      const confirmPass = document.getElementById('regConfirmPassword').value;

      if (pass !== confirmPass) {
        notify('Passwords do not match. Please verify.', 'error');
        return;
      }

      notify('Account created successfully! Switching to login...', 'success');
      setTimeout(() => {
        document.getElementById('registerForm').reset();
        switchView('login');
      }, 1500);
    }