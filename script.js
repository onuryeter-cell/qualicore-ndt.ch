document.addEventListener('DOMContentLoaded', function () {
  // 1. Mobil Menü Açma/Kapama İşlemi
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // 2. İletişim Formunu Formspree ile Sayfa Değiştirmeden Gönderme
  var form = document.querySelector('form.inquiry');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault(); 

      var btn = form.querySelector('button[type="submit"]');
      var note = form.querySelector('.form-note');
      var originalBtnText = btn.textContent;

      btn.textContent = 'Sending...';
      btn.disabled = true;

      var data = new FormData(form);

      try {
        var response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          btn.textContent = 'Sent';
          if (note) note.textContent = "Thank you! Your message has been sent successfully.";
          form.reset();
        } else {
          btn.textContent = originalBtnText;
          btn.disabled = false;
          if (note) note.textContent = "Oops! There was a problem submitting your form.";
        }
      } catch (error) {
        btn.textContent = originalBtnText;
        btn.disabled = false;
        if (note) note.textContent = "Oops! There was a problem submitting your form.";
      }
    });
  }
});