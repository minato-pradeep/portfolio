$(document).ready(function() {
    // Fade in the name after page load
    $('#heroName').delay(600).animate({opacity: 1}, 1200);

    // Contact form feedback
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        $('#formMessage').text("Thank you for contacting!");
        this.reset();
    });

    // Animated scroll for nav links
    $('nav .nav-link').on('click', function(e) {
        const href = $(this).attr('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(href).offset().top - 60
            }, 700);
        }
    });

    // Active nav highlight on scroll
    $(window).on('scroll', function() {
        let scrollPos = $(document).scrollTop();
        $('section').each(function() {
            if (scrollPos >= $(this).offset().top - 80) {
                let id = $(this).attr('id');
                $('nav .nav-link').removeClass('active');
                $(`nav .nav-link[href="#${id}"]`).addClass('active');
            }
        });
    });

    // Staggered fade-in for sections
   // Staggered fade-in for sections
$('section').css({opacity: 0, transform: 'translateY(40px)'});
function fadeSections() {
    $('section').each(function(i) {
        if ($(window).scrollTop() + $(window).height() > $(this).offset().top + 40) {
            $(this).delay(i * 150).animate({opacity: 1, top: 0}, 800).css('transform', 'none');
        }
    });
}
// Run fadeSections immediately on load
fadeSections();
$(window).on('scroll', fadeSections);

    // Ripple effect on buttons
    $('.btn-accent').on('click', function(e) {
        let $btn = $(this);
        let $ripple = $('<span class="ripple"></span>');
        let x = e.pageX - $btn.offset().left;
        let y = e.pageY - $btn.offset().top;
        $ripple.css({left: x, top: y});
        $btn.append($ripple);
        setTimeout(() => $ripple.remove(), 600);
    });

    // Animated skill badges on hover
    $('.skill-badge').hover(
        function() { $(this).animate({fontSize: '1.3rem', paddingLeft: '2.7rem', paddingRight: '2.7rem'}, 200); },
        function() { $(this).animate({fontSize: '1.1rem', paddingLeft: '2rem', paddingRight: '2rem'}, 200); }
    );

    // Modal popup for Demo buttons
    $('.btn-accent').filter(function() {
        return $(this).text().trim().toLowerCase() === 'demo';
    }).on('click', function(e) {
        e.preventDefault();
        showModal('Demo Unavailable', 'Pradeep, add your project link soon! 😊');
    });

    // Scroll-to-top button
    let $scrollBtn = $('<button/>', {
        text: '↑',
        css: {
            position: 'fixed', bottom: '30px', right: '30px', background: '#06b6d4', color: '#fff',
            border: 'none', borderRadius: '50%', width: '48px', height: '48px', fontSize: '1.5rem',
            boxShadow: '0 4px 24px rgba(6,182,212,0.12)', cursor: 'pointer', display: 'none', zIndex: 999
        }
    }).appendTo('body');
    $(window).on('scroll', function() {
        $scrollBtn.toggle($(window).scrollTop() > 400);
    });
    $scrollBtn.on('click', function() {
        $('html, body').animate({scrollTop: 0}, 700);
    });

    // Theme switcher
    let $themeBtn = $('<button/>', {
        text: '🌙',
        title: 'Toggle dark mode',
        css: {
            position: 'fixed', bottom: '90px', right: '30px', background: '#6366f1', color: '#fff',
            border: 'none', borderRadius: '50%', width: '48px', height: '48px', fontSize: '1.5rem',
            boxShadow: '0 4px 24px rgba(99,102,241,0.12)', cursor: 'pointer', zIndex: 999
        }
    }).appendTo('body');
    $themeBtn.on('click', function() {
        $('body').toggleClass('dark-mode');
        if ($('body').hasClass('dark-mode')) {
            $themeBtn.text('☀️');
            $('body').css('background', 'linear-gradient(135deg, #18181b 0%, #6366f1 100%)');
            $('footer').css('background', '#18181b');
        } else {
            $themeBtn.text('🌙');
            $('body').css('background', '');
            $('footer').css('background', '#6366f1');
        }
    });

    // Modal function
    function showModal(title, message) {
        let $modal = $('#customModal');
        if ($modal.length === 0) {
            $modal = $(`
                <div id="customModal" style="position:fixed;top:0;left:0;width:100vw;height:100vh;
                    background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;z-index:2000;">
                    <div style="background:#fff;padding:2rem 2.5rem;border-radius:1.5rem;box-shadow:0 8px 32px rgba(99,102,241,0.10);max-width:90vw;min-width:300px;text-align:center;position:relative;">
                        <h4 style="color:#6366f1;font-weight:700;">${title}</h4>
                        <p style="margin:1rem 0 2rem 0;">${message}</p>
                        <button id="closeModalBtn" style="background:#06b6d4;color:#fff;border:none;border-radius:1rem;padding:0.7rem 2rem;font-weight:600;box-shadow:0 4px 24px rgba(6,182,212,0.12);cursor:pointer;">Close</button>
                    </div>
                </div>
            `).appendTo('body');
        }
        $modal.show();
        $('#closeModalBtn').on('click', function() {
            $modal.hide();
        });
    }
});

// Ripple effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.innerHTML = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(6,182,212,0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
    width: 100px;
    height: 100px;
    left: 50%;
    top: 50%;
    margin-left: -50px;
    margin-top: -50px;
    z-index: 1;
}
@keyframes ripple {
    to {
        transform: scale(2.5);
        opacity: 0;
    }
}
`;
document.head.appendChild(rippleStyle);