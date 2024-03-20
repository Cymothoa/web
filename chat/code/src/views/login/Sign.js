import { Form, Input, Image, Button, Space, Toast } from 'antd-mobile';
import './Sign.less';
import { login } from '../../api/register';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Sign() {
  const navigate = useNavigate();
  const [from, setFrom] = useState({
    email: '',
    password: ''
  });
  return (
    <div className="sign">
      <div className="logo">
        <div style={{ display: 'inline-block' }}>
          <Image
            src={require('../../assets/images/react.png')}
            width={104}
            height={104}
            fit="cover"
          />
        </div>
      </div>
      <Form layout="horizontal" mode="card">
        <Form.Header>请登录后操作</Form.Header>
        <Form.Header />
        <Form.Item label="邮箱地址">
          <Input
            onChange={result => {
              from.email = result;
              setFrom({ ...from });
            }}
            placeholder="请输入"
          />
        </Form.Item>
        <Form.Item label="用户密码">
          <Input
            onChange={result => {
              from.password = result;
              setFrom({ ...from });
            }}
            placeholder="请输入"
          />
        </Form.Item>
        <Form.Header />
      </Form>
      <div className="conf-but">
        <Space direction="vertical" block>
          <Button
            block
            color="primary"
            onClick={async () => {
              const result = await login(from);
              if (result.code == 200) {
                console.log('登录成功');
                sessionStorage.setItem('access', result.data.access_token);
                sessionStorage.setItem('refresh', result.data.refresh_token);
                navigate('/home/main');
              } else {
                Toast.show({
                  icon: 'error',
                  content: result.message
                });
              }
            }}>
            确认登录
          </Button>
          <Button
            block
            color="primary"
            onClick={() => {
              navigate('/register');
            }}>
            前往注册
          </Button>
        </Space>
      </div>
    </div>
  );
}

export default Sign;
