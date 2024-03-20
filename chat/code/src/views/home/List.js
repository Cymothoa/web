import { NavBar, Space, List, Avatar, Button } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { AddSquareOutline } from 'antd-mobile-icons';
import { maskList, maskDelete } from '../../api/chatapp';
import './List.less';
import { useState } from 'react';
import { useEffect } from 'react';
function RoleList() {
  const navigate = useNavigate();
  const [list, updateList] = useState([]);
  const fetchData = () => {
    maskList().then(r => {
      updateList(() => {
        return r.data;
      });
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const right = (
    <div
      onClick={() => {
        navigate('/role');
      }}
      style={{ fontSize: 24 }}>
      <Space style={{ '--gap': '16px' }}>
        <AddSquareOutline />
      </Space>
    </div>
  );
  return (
    <div className="item-list">
      <NavBar right={right} onBack={() => navigate(-1)}>
        我创建的角色
      </NavBar>
      <div>
        <List>
          {list.map((item, index) => {
            return (
              <List.Item
                extra={
                  <Button
                    style={{ fontSize: '0.7rem' }}
                    color="primary"
                    fill="none"
                    onClick={() => {
                      maskDelete(item.id);
                      fetchData();
                    }}>
                    删除
                  </Button>
                }
                key={index}
                prefix={<Avatar src={item.avatar} />}
                description={item.title}>
                <div
                  onClick={() => {
                    navigate('/chat', {
                      state: item
                    });
                  }}>
                  {item.brief}
                </div>
              </List.Item>
            );
          })}
        </List>
      </div>
    </div>
  );
}

export default RoleList;
