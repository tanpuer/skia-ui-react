import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SkiaUIRenderer from './render/SkiaUIRenderer';
import SkiaApp from "./SkiaApp";

if (global.SkiaUI) {
  SkiaUIRenderer.render(<SkiaApp/>);
} else {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
	  <React.StrictMode>
		<App/>
	  </React.StrictMode>
  );
}

