document.getElementById('cta-main').addEventListener('click', function () {
    dataLayer.push({ event: 'CTA_click', cta_id: 'cta-main', cta_location: 'hero' });
    document.getElementById('signup').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('cta-secondary').addEventListener('click', function () {
    dataLayer.push({ event: 'CTA_click', cta_id: 'cta-secondary', cta_location: 'community' });
    alert('Kliknięto „Dołącz do społeczności", dołączasz do naszej społeczności!');
});

document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var email = this.querySelector('input[name="email"]').value;
    dataLayer.push({ event: 'form_submit', form_email: email });
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
