const userContainer = document.getElementById('userContainer');
const reloadBtn = document.getElementById('reloadBtn');

async function fetchUsers() {
  userContainer.innerHTML = 'Loading...';
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    userContainer.innerHTML = `<p class="error">Error fetching data: ${error.message}</p>`;
  }
}

function displayUsers(users) {
  userContainer.innerHTML = '';
  users.forEach(user => {
    const { name, email, address } = user;
    const userDiv = document.createElement('div');
    userDiv.classList.add('user-card');
    userDiv.innerHTML = `
      <h2>${name}</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Address:</strong> ${address.street}, ${address.city}, ${address.zipcode}</p>
    `;
    userContainer.appendChild(userDiv);
  });
}

reloadBtn.addEventListener('click', fetchUsers);
fetchUsers();
