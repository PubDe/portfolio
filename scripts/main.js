// Shared site-wide JS: AOS init, feather icons, menu/theme toggles, skeleton spinner, and nav handler
(function(){
  // Initialize AOS when library is available
  function initAOS(){
    if(window.AOS && typeof AOS.init === 'function'){
      AOS.init({ once: true, duration: 1000 });
    }
  }

  // Replace feather icons if available
  function initFeather(){
    if(window.feather && typeof feather.replace === 'function'){
      feather.replace();
    }
  }

  // Mobile menu toggle
  function initMenuToggle(){
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if(menuBtn && mobileMenu){
      menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    }
  }

  // Theme toggle (dark / light) safe initializer
  function initThemeToggle(){
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    try{
      if(themeIcon){
        if(localStorage.getItem('theme') === 'dark'){
          document.documentElement.classList.add('dark');
          themeIcon.setAttribute('data-feather','moon');
        } else {
          document.documentElement.classList.remove('dark');
          themeIcon.setAttribute('data-feather','sun');
        }
      }

      if(themeToggle){
        themeToggle.addEventListener('click', () => {
          document.documentElement.classList.toggle('dark');
          if(document.documentElement.classList.contains('dark')){
            if(themeIcon) themeIcon.setAttribute('data-feather','moon');
            localStorage.setItem('theme','dark');
          } else {
            if(themeIcon) themeIcon.setAttribute('data-feather','sun');
            localStorage.setItem('theme','light');
          }
          initFeather();
        });
      }
    }catch(e){
      console.warn('Theme toggle init failed', e);
    }
  }

  // Fade out + remove skeleton overlay once all resources are loaded
  function initSkeletonFade(){
    window.addEventListener('load', function() {
      const s = document.getElementById('skeleton');
      if (!s) return;
      setTimeout(function() {
        s.style.transition = 'opacity 300ms ease';
        s.style.opacity = '0';
        setTimeout(function() { s.remove(); }, 350);
      }, 250);
    });
  }

  // Create a compact spinner overlay used for navigation clicks and return it
  function createSkeletonSpinner(){
    const existing = document.getElementById('skeleton-spinner');
    if(existing) return existing;
    const spinner = document.createElement('div');
    spinner.id = 'skeleton-spinner';
    spinner.className = 'fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900';
    spinner.style.zIndex = '99999';
    spinner.innerHTML = '\n   <div class="flex flex-col items-center gap-4">\n <svg aria-hidden="true" class="w-8 h-8 text-neutral-tertiary text-gray-500 animate-spin fill-indigo-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">\n <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>\n <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>\n  </svg>\n <div class="text-sm text-gray-700 dark:text-gray-300">Loading…</div>\n </div>\n        ';
    document.body.appendChild(spinner);
    return spinner;
  }

  // Nav link click handler: show skeleton then navigate
  function handleNavClick(e){
    const a = e.currentTarget;
    const href = a.getAttribute('href');
    if(!href || href.startsWith('#')) return; // ignore in-page anchors
    e.preventDefault();
    createSkeletonSpinner();
    requestAnimationFrame(function(){ window.location.href = href; });
  }

  function attachNavHandlers(){
    const links = document.querySelectorAll('nav a, #mobileMenu a');
    links.forEach(l => l.addEventListener('click', handleNavClick));
  }

  // Run safe initializers when DOM is ready
  document.addEventListener('DOMContentLoaded', function(){
    initFeather();
    initMenuToggle();
    initThemeToggle();
    attachNavHandlers();
    initAOS();
  });

  // Run any window-load behaviors
  initSkeletonFade();

})();
