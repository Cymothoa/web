import { InfiniteScroll, List, NavBar } from 'antd-mobile';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Order() {
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  return (
    <div>
      <NavBar onBack={() => navigate(-1)}>我创建的角色</NavBar>
      <List>
        {data.map((item, index) => (
          <List.Item key={index}>{item}</List.Item>
        ))}
      </List>
      <InfiniteScroll
        loadMore={() => {
          setTimeout(() => {
            const append = ['1', '1', '1', '1', '1', '1'];
            setData(val => [...val, ...append]);
            setHasMore(data.length > 50);
          }, 3000);
        }}
        hasMore={hasMore}
      />
    </div>
  );
}

export default Order;
