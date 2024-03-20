import { Swiper, NavBar, Image } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { banner } from '../../api/chatapp';
import { useEffect, useState } from 'react';
function Main() {
  const navigate = useNavigate();
  const [bannerArr, updateBanner] = useState([]);
  useEffect(() => {
    banner().then(result => {
      console.log(result);
      if (result.code == 200) {
        updateBanner([...result.data]);
      }
    });
  }, []);
  const items = bannerArr.map((item, index) => (
    <Swiper.Item key={index}>
      <div className="chat-swiper">
        <Image fit="cover" src={item.image_url} />
      </div>
    </Swiper.Item>
  ));
  return (
    <div className="main">
      <NavBar onBack={() => navigate(-1)}>首页</NavBar>
      {bannerArr.length > 0 ? <Swiper>{items}</Swiper> : ''}
    </div>
  );
}

export default Main;
