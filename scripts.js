// Function to load HTML modules
function loadHTML(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error('Error loading HTML:', error));
}

// Load header and footer
loadHTML('header', 'header.html');
loadHTML('footer', 'footer.html');

// Form submission and notification handling
const loginForm = document.getElementById('loginForm');
const notification = document.getElementById('notification');

function showNotification(message, type = 'error') {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    setTimeout(() => notification.style.display = 'none', 5000);
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Invalid credentials');
        }

        // Store JWT token
        localStorage.setItem('userToken', data.token);
        
        showNotification('Login successful!', 'success');
        
        // Redirect to dashboard after successful login
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 1000);
    } catch (error) {
        showNotification(error.message);
    }
});