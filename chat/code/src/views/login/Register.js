import { Form, Input, Button, Toast } from 'antd-mobile';
import { useState } from 'react';
import { sendEmail, register } from '../../api/register';
import { useNavigate } from 'react-router-dom';
import './Register.less';

function Register() {
  const navigate = useNavigate();

  const [from, updateFrom] = useState({
    name: '',
    email: '',
    verification_code: '',
    password: '',
    repassword: ''
  });
  return (
    <div className="register">
      <h1 style={{ marginLeft: '1rem' }}>请您注册</h1>
      <Form layout="horizontal" mode="card">
        <Form.Header>填写注册信息</Form.Header>
        <Form.Header />
        <Form.Item label="姓名">
          <Input
            onChange={e => {
              from.name = e;
              updateFrom({ ...from });
            }}
            placeholder="请输入"
          />
        </Form.Item>
        <Form.Item label="邮箱地址">
          <Input
            onChange={e => {
              from.email = e;
              updateFrom({ ...from });
            }}
            placeholder="请输入"
          />
        </Form.Item>
        <Form.Item label="请输入密码">
          <Input
            onChange={e => {
              from.password = e;
              updateFrom({ ...from });
            }}
            type="password"
            placeholder="请输入密码"
          />
        </Form.Item>
        <Form.Item label="确认密码">
          <Input
            onChange={e => {
              from.repassword = e;
              updateFrom({ ...from });
            }}
            type="password"
            placeholder="请输入确认密码"
          />
        </Form.Item>
        <Form.Header />
        <Form.Item
          label="邮箱验证码"
          extra={(() => {
            return (
              <a
                onClick={() => {
                  console.log(
                    sendEmail({
                      email: from.email
                    })
                  );
                }}>
                发送验证码
              </a>
            );
          })()}>
          <Input
            onChange={e => {
              from.verification_code = e;
              updateFrom({ ...from });
            }}
            placeholder="请输入"
          />
        </Form.Item>
      </Form>
      <div className="conf-but">
        <Button
          block
          color="primary"
          onClick={async () => {
            const result = await register(from);
            if (result.code == 200) {
              navigate('/home/main');
            } else {
              Toast.show({
                icon: 'success',
                content: '注册成功'
              });
            }
          }}>
          确认登录
        </Button>
      </div>
    </div>
  );
}

export default Register;
