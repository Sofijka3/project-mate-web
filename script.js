document.getElementById('cta-main').addEventListener('click', function () {
    document.getElementById('signup').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('cta-secondary').addEventListener('click', function () {
    alert('Kliknięto „Dołącz do społeczności", dołączasz do naszej społeczności!');
});

document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var email = this.querySelector('input[name="email"]').value;
    alert('Dziękujemy za zapisanie się! Potwierdzenie wyślemy na: ' + email);
});

document.querySelectorAll('.btn-pricing').forEach(function (btn) {
    btn.addEventListener('click', function () {
        var plan = this.closest('.plan').querySelector('h2').textContent;
        dataLayer.push({ event: 'select_plan', plan_name: plan });
    });
});

(function () {
    var params = new URLSearchParams(window.location.search);
    var plan = params.get('plan');
    if (plan) {
        var notification = document.createElement('div');
        notification.className = 'plan-notification';
        notification.textContent = 'Wybrałeś plan: ' + plan + ' — wypełnij formularz, aby dokończyć rejestrację!';
        var signupSection = document.getElementById('signup');
        if (signupSection) {
            signupSection.insertBefore(notification, signupSection.firstChild.nextSibling);
        }
    }
})();
