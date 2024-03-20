import {
  Form,
  TextArea,
  NavBar,
  Input,
  Button,
  ImageUploader
} from 'antd-mobile';
import { useState } from 'react';
import { imageUpload, mask } from '../../api/chatapp';
import { useNavigate } from 'react-router-dom';

function Role() {
  const [form, updateForm] = useState({
    title: '',
    avatar: '',
    system: '',
    brief: ''
  });
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  return (
    <>
      <NavBar>角色创建</NavBar>
      <Form
        onFinish={async () => {
          const result = await mask(form);
          if (result.code == 200) {
            navigate('/home/list');
          }
        }}
        style={{ marginTop: '8vh' }}
        layout="horizontal"
        footer={
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        }>
        <Form.Header>创建或者修改角色</Form.Header>
        <Form.Item
          name="name"
          label="角色名称"
          rules={[{ required: true, message: '角色不能为空' }]}>
          <Input
            onChange={e => {
              form.title = e;
              updateForm({ ...form });
            }}
            placeholder="请输入角色"
          />
        </Form.Item>
        <Form.Item
          name="address"
          label="角色限定词"
          rules={[{ required: true, message: '限定词不能为空' }]}>
          <TextArea
            onChange={e => {
              form.system = e;
              updateForm({ ...form });
            }}
            placeholder="请输入地址"
            maxLength={100}
            rows={2}
            showCount
          />
        </Form.Item>
        <Form.Item
          name="amount"
          rules={[{ required: true, message: '限定词不能为空' }]}
          label="角色头像">
          <ImageUploader
            maxCount={1}
            value={fileList}
            onChange={setFileList}
            upload={async file => {
              const result = await imageUpload(file);
              if (result.code == 200) {
                form.avatar = result.data.url;
                updateForm({ ...form });
                return {
                  url: result.data.url
                };
              }
            }}
          />
        </Form.Item>
        <Form.Item
          name="delivery"
          rules={[{ required: true, message: '限定词不能为空' }]}
          label="角色说明">
          <Input
            onChange={e => {
              form.brief = e;
              updateForm({ ...form });
            }}
            placeholder="请输入角色说明"
          />
        </Form.Item>
      </Form>
    </>
  );
}

export default Role;
