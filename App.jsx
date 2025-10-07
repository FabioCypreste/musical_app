import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './src/components/homepage';

const MusicalDetailPage = ({ musicalName }) => (
    <div>
        <h2>Página de {musicalName}</h2>
        <p>Detalhes sobre este musical virão aqui.</p>
    </div>
);

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                {/* Rotas para as páginas de detalhes dos musicais */}
                <Route path="/epic" element={<MusicalDetailPage musicalName="Epic: The Musical" />} />
                <Route path="/hamilton" element={<MusicalDetailPage musicalName="Hamilton" />} />
                <Route path="/novica-rebelde" element={<MusicalDetailPage musicalName="A Noviça Rebelde" />} />
                <Route path="/wicked" element={<MusicalDetailPage musicalName="The Wicked" />} />
                <Route path="/os-miseraveis" element={<MusicalDetailPage musicalName="Os Miseráveis" />} />
                <Route path="/greatest-showman" element={<MusicalDetailPage musicalName="The Greatest Showman" />} />
                <Route path="/mamma-mia" element={<MusicalDetailPage musicalName="Mamma Mia!" />} />
                <Route path="/la-la-land" element={<MusicalDetailPage musicalName="La La Land" />} />
                <Route path="/heathers" element={<MusicalDetailPage musicalName="Heathers" />} />
            </Routes>
        </Router>
    );
}

export default App;