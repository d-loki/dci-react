import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App';
import Settings from './pages/settings/index';
import Layout from '@/layout.tsx';

ReactDOM.createRoot( document.getElementById( 'root' ) as HTMLElement ).render(
    <React.StrictMode>
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={ <App /> } />
                    <Route path="/settings" element={ <Settings /> } />
                </Routes>
            </Layout>
        </BrowserRouter>
    </React.StrictMode>,
);
