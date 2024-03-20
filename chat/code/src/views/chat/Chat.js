import { Button, NavBar, TextArea, Card, Divider, Avatar } from 'antd-mobile';
import './Chat.less';
import { useEffect } from 'react';
import { useState } from 'react';
import ReactMarkendown from 'react-markdown';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const user =
  'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ';
function Chat() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [message, setMessage] = useState([]);
  const [userMsg, setUserMsg] = useState('');
  const [socket, setSocket] = useState(null);
  const messageRef = useRef(null);
  useEffect(() => {
    //const websocket = new WebSocket('ws://127.0.0.1:2000');
    const websocket = new WebSocket('ws://chat-ws.80boys.com');
    websocket.onopen = () => {
      setSocket(websocket);
    };
    websocket.onmessage = data => {
      setMessage(msg => {
        msg[msg.length - 1].msg += data.data;
        messageRef.current.scrollIntoView({ block: 'end' });
        return [...msg];
      });
    };
  }, []);

  return (
    <div className="chat">
      <NavBar
        onBack={() => {
          navigate(-1);
        }}>
        聊天
      </NavBar>
      <div style={{ width: '100%', overflow: 'auto' }} ref={messageRef}>
        {message.map((msg, index) => {
          return (
            <Card
              bodyStyle={{ textAlign: msg.type == 'gpt' ? 'left' : 'right' }}
              key={index}
              title={msg.type == 'gpt' ? <Avatar src={state.avatar} /> : ''}
              extra={msg.type == 'user' ? <Avatar src={user} /> : ''}
              style={{ borderRadius: '16px' }}>
              <div>
                <ReactMarkendown
                  components={{
                    code: ({ inline, className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={nightOwl}
                          language={match[1]}
                          children={String(children).replace(/\n$/, '')}
                          {...props}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }
                  }}
                  remarkPlugins={[remarkGfm]}>
                  {msg.msg}
                </ReactMarkendown>
              </div>
            </Card>
          );
        })}
      </div>
      <div style={{ height: '14rem' }}></div>
      <div className="user-input">
        <Divider />
        <TextArea
          value={userMsg}
          onChange={setUserMsg}
          style={{ padding: '1rem' }}
          placeholder="请输入内容"
          rows={3}
        />
        <Button
          color="primary"
          onClick={() => {
            if (socket) {
              setMessage([
                ...message,
                {
                  type: 'user',
                  msg: userMsg
                },
                {
                  type: 'gpt',
                  msg: ''
                }
              ]);
              const msg = {
                system: state.system,
                message: userMsg
              };
              socket.send(JSON.stringify(msg));
              setUserMsg('');
            }
          }}
          fill="none">
          发送
        </Button>
      </div>
    </div>
  );
}
export default Chat;
