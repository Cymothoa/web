import { Routes, Route, useNavigate } from 'react-router-dom';
import { Badge, TabBar } from 'antd-mobile';
import List from './List';
import Me from './Me';
import Main from './Main';
import './Home.less';
import {
  AppOutline,
  UnorderedListOutline,
  UserOutline
} from 'antd-mobile-icons';

function Home() {
  const navigate = useNavigate();
  const tabs = [
    {
      key: '/home/main',
      title: '首页',
      icon: <AppOutline />,
      badge: Badge.dot
    },
    {
      key: '/home/list',
      title: '列表',
      icon: <UnorderedListOutline />,
      badge: '5'
    },
    {
      key: '/home/me',
      title: '我的',
      icon: <UserOutline />
    }
  ];
  return (
    <div className="home">
      <Routes>
        <Route element={<Me />} path="me" />
        <Route element={<List />} path="list" />
        <Route element={<Main />} path="main" />
      </Routes>
      <div className="navi">
        <TabBar onChange={value => navigate(value)}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
}
export default Home;
