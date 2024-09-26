const form = document.getElementById('loginForm');
const protectedContent = document.getElementById('protectedContent');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.token) {
            localStorage.setItem('token', data.token); // 토큰을 로컬 스토리지에 저장

            const protectedResponse = await fetch('/protected', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const protectedData = await protectedResponse.json();
            protectedContent.textContent = protectedData.message;
        } else {
            alert('로그인 실패');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});