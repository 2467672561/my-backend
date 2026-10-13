const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 测试接口
app.get('/api/hello', (req, res) => {
  res.json({
    message: '你好，我是后端！',
    time: new Date().toLocaleString()
  });
});

// 留言板数据（临时用内存）
let messages = [
  { id: 1, user: '小明', text: '这个网站真不错！' },
  { id: 2, user: '小红', text: '我也来留言～' }
];

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.post('/api/messages', (req, res) => {
  const { user, text } = req.body;
  if (!user || !text) {
    return res.status(400).json({ error: '用户名和内容不能为空' });
  }
  const newMsg = { id: Date.now(), user, text };
  messages.push(newMsg);
  res.json(newMsg);
});

app.listen(PORT, () => {
  console.log(`✅ 后端已启动：http://localhost:${PORT}`);
});