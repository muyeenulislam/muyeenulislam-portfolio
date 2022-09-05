import { sendEmail } from './sendEmail';

// contact form
const contactForm = document.querySelector('.form-group');

// send mail
contactForm.addEventListener('submit', async e => {
  e.preventDefault();
  document.querySelector('.form-btn').textContent = 'Sending...';
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const textarea = document.getElementById('textarea');

  const formData = {
    name: name.value,
    email: email.value,
    textarea: textarea.value,
  };

  await sendEmail(formData);

  document.querySelector('.form-btn').textContent = 'Submit';
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('textarea').value = '';
});
