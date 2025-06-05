const container = document.getElementById('user-container');
const reloadButton = document.getElementById('reload');

function fetchUserData() {
  container.innerHTML = 'Loading...';

  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      displayUsers(data);
    })
    .catch(error => {
      container.innerHTML = `<p style="color: red;">Error fetching data: ${error.message}</p>`;
    });
}

function displayUsers(users) {
  container.innerHTML = ''; // Clear previous content

  users.forEach(user => {
    const card = document.createElement('div');
    card.className = 'user-card';
    card.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
    `;
    container.appendChild(card);
  });
}

// Initial load
fetchUserData();

// Reload button
reloadButton.addEventListener('click', fetchUserData);
