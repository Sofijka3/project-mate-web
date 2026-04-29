(function () {
    var variants = {
        A: { h1: 'ProjectMate', p: 'Połącz skille, stwórz projekt, zdobądź ocenę.' },
        B: { 
            h1: 'Znajdź swój zespół projektowy', 
            p: 'Matchuj się z innymi studentami i buduj projekty razem.' 
        }
    };

    var variant = localStorage.getItem('ab_variant');
    if (!variant) {
        variant = Math.random() < 0.5 ? 'A' : 'B';
        localStorage.setItem('ab_variant', variant);
    }

    var v = variants[variant];
    if (!v) {
        v = variants['A'];
        localStorage.setItem('ab_variant', 'A');
    }
    document.querySelector('.hero h1').textContent = v.h1;
    document.querySelector('.hero p').textContent = v.p;

    dataLayer.push({ event: 'ab_impression', variant: variant });
})();

document.getElementById('cta-main').addEventListener('click', function () {
    var variant = localStorage.getItem('ab_variant');
    dataLayer.push({ event: 'CTA_click', cta_id: 'cta-main', cta_location: 'hero', variant: variant });
    document.getElementById('signup').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('cta-secondary').addEventListener('click', function () {
    dataLayer.push({ event: 'CTA_click', cta_id: 'cta-secondary', cta_location: 'community' });
    alert('Kliknięto „Dołącz do społeczności", dołączasz do naszej społeczności!');
});

document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var email = this.querySelector('input[name="email"]').value;
    var variant = localStorage.getItem('ab_variant');
    dataLayer.push({ event: 'form_submit', form_email: email, variant: variant });
    alert('Dziękujemy za zapisanie się! Potwierdzenie wyślemy na: ' + email);
});

document.querySelectorAll('.btn-pricing').forEach(function (btn) {
    btn.addEventListener('click', function () {
        var plan = this.closest('.plan').querySelector('h2').textContent;
        dataLayer.push({ event: 'select_plan', plan_name: plan });
    });
});

var scroll75Fired = false;
window.addEventListener('scroll', function () {
    if (scroll75Fired) return;
    var scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
    if (scrollPercent >= 75) {
        dataLayer.push({ event: 'scroll_75', scroll_percent: 75 });
        scroll75Fired = true;
    }
});

(function () {
    var params = new URLSearchParams(window.location.search);
    var plan = params.get('plan');
    if (plan) {
        var notification = document.createElement('div');
        notification.className = 'plan-notification';
        notification.textContent = 'Wybrałeś plan: ' + plan + '. Wypełnij formularz, aby dokończyć rejestrację.';
        var signupSection = document.getElementById('signup');
        if (signupSection) {
            signupSection.insertBefore(notification, signupSection.firstChild.nextSibling);
        }
    }
})();
