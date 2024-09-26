const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// 비밀 키 설정 (안전하게 관리해야 합니다!)
const secretKey = 'your_secret_key'; // 실제로는 더 복잡한 비밀 키를 사용해야 합니다.

// 사용자 정보 (임시 데이터)
const users = {
    'user1': 'password1',
};

// 로그인 라우트
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (users[username] === password) {
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: '로그인 실패' });
    }
});

// 보호된 페이지
app.get('/protected', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.sendStatus(403);
        res.send(`안녕하세요, ${decoded.username}님!`);
    });
});

app.listen(port, () => {
    console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});