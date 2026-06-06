/**
 * Login Form — validation, interactions, and submit handling
 */

export function initLoginForm() {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const pwInput = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const submitBtn = document.getElementById('submitBtn');
  const toggleBtn = document.getElementById('togglePw');
  const eyeIcon = document.getElementById('eyeIcon');

  if (!form) return;

  let pwVisible = false;

  // Toast utility
  function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = 'toast ' + type;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // Email validation
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Password toggle
  if (toggleBtn && pwInput && eyeIcon) {
    toggleBtn.addEventListener('click', () => {
      pwVisible = !pwVisible;
      pwInput.type = pwVisible ? 'text' : 'password';
      eyeIcon.innerHTML = pwVisible
        ? '<path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" stroke="currentColor" stroke-width="1.6" fill="none"/>'
        : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
    });
  }

  // Ripple effect on submit button
  if (submitBtn) {
    submitBtn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
      ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  }

  // Clear validation errors on input
  if (emailInput && emailError) {
    emailInput.addEventListener('input', () => {
      emailInput.classList.remove('error');
      emailError.classList.remove('show');
    });
  }

  if (pwInput && passwordError) {
    pwInput.addEventListener('input', () => {
      pwInput.classList.remove('error');
      passwordError.classList.remove('show');
    });
  }

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    if (!isValidEmail(emailInput.value)) {
      emailInput.classList.add('error');
      emailError.classList.add('show');
      valid = false;
    }

    if (pwInput.value.length < 6) {
      pwInput.classList.add('error');
      passwordError.classList.add('show');
      valid = false;
    }

    if (!valid) {
      showToast('Please fix the errors above', 'error');
      return;
    }

    // Simulate sign-in
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Signing in...';

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.classList.add('success');
      submitBtn.textContent = 'Welcome!';
      showToast('Signed in successfully!', 'success');

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    }, 2000);
  });

  // Social button clicks
  const googleBtn = document.getElementById('googleBtn');
  const githubBtn = document.getElementById('githubBtn');

  if (googleBtn) {
    googleBtn.addEventListener('click', () => showToast('Google sign-in coming soon!', 'info'));
  }
  if (githubBtn) {
    githubBtn.addEventListener('click', () => showToast('GitHub sign-in coming soon!', 'info'));
  }

  // Forgot password
  const forgotLink = document.getElementById('forgotLink');
  if (forgotLink) {
    forgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Password reset link sent to your email', 'success');
    });
  }

  // Sign up link
  const signupLink = document.getElementById('signupLink');
  if (signupLink) {
    signupLink.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Sign up page coming soon!', 'info');
    });
  }
}
