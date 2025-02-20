import React from 'react';
import './index.css';
import SkiaUIRenderer from './render/SkiaUIRenderer';
import SkiaApp from "./SkiaApp";
import MusicApp from "./MusicApp";

import {
  createMemoryRouter, RouterProvider, useLocation, useNavigate,
} from 'react-router-dom';

// 路由配置
const router = createMemoryRouter([
  {
	path: '/',
	element: <WrapperComponent component={SkiaApp}/>,
  },
  {
	path: '/music',
	element: <WrapperComponent component={MusicApp}/>,
  }
]);

// 连接类组件与路由 Hook 的包装器F
function WrapperComponent({component: Component}) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
	  <Component
		  {...location}
		  navigate={navigate}
	  />
  );
}

SkiaUIRenderer.render(<SkiaApp/>);

// SkiaUIRenderer.render(
// 	<RouterProvider router={router}/>
// );
