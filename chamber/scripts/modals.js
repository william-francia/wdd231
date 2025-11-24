const myInfo = new URLSearchParams(window.location.search);

document.addEventListener("DOMContentLoaded", () => {
  const results = document.querySelector('#results');

  results.innerHTML = `
    <h2>Thank you, ${myInfo.get('firstName')} ${myInfo.get('lastName')}!</h2>
    <p>Your organization: ${myInfo.get('organization')}</p>
    <p>Your title: ${myInfo.get('orgTitle')}</p>
    <p>Email: ${myInfo.get('email')}</p>
    <p>Phone: ${myInfo.get('phone')}</p>
    <p>Membership Level: ${myInfo.get('membership')}</p>
    <p>Submitted on: ${myInfo.get('timestamp')}</p>
  `;
});

