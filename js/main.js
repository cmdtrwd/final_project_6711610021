const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    menuToggle.textContent = navLinks.classList.contains('show') ? '✕' : '☰';
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      menuToggle.textContent = '☰';
    });
  });
}

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
  .forEach(el => revealObserver.observe(el));

$(function () {
  $('.filter-btn').on('click', function () {
    const target = $(this).data('filter');

    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    $('.menu-category').stop(true, true).fadeOut(200, function () {
    });

    setTimeout(function () {
      $('.menu-category').hide().removeClass('active');
      $('#' + target).addClass('active').hide().fadeIn(350);

      $('#' + target + ' .reveal').each(function (i) {
        const $el = $(this);
        $el.removeClass('visible');
        setTimeout(function () { $el.addClass('visible'); }, 60 + i * 80);
      });
    }, 210);
  });

  $(document).on('mouseenter', '.card', function () {
    $(this).find('.price').addClass('text-accent');
  }).on('mouseleave', '.card', function () {
    $(this).find('.price').removeClass('text-accent');
  });

  $('a[href^="#"]').on('click', function (e) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 80 }, 700, 'swing');
    }
  });

  const $stats = $('.stat-number');
  if ($stats.length) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          $(entry.target).css({ opacity: 0, transform: 'translateY(20px)' })
            .animate({ opacity: 1 }, {
              duration: 600,
              step: function (now) {
                $(this).css('transform', `translateY(${(1 - now) * 20}px)`);
              }
            });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    $stats.each(function () { statsObserver.observe(this); });
  }

  $('img').on('error', function () {
    const alt = $(this).attr('alt') || 'coffee';
    const seed = encodeURIComponent(alt);
    $(this).attr('src', `https://picsum.photos/seed/${seed}/600/450`);
  });
});
