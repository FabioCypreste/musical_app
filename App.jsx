import React, { useState } from 'react';
import HomeScreen from './telas/paginaInicial';
import DetailScreen from './telas/paginaDetalhes';

export default function App() {
  const [musicalSelecionado, setMusicalSelecionado] = useState(null);

  return (
    <>
      {musicalSelecionado ? (
        <DetailScreen 
          musical={musicalSelecionado} 
          onBack={() => setMusicalSelecionado(null)} 
        />
      ) : (
        <HomeScreen 
          onSelectMusical={setMusicalSelecionado} 
        />
      )}
    </>
  );
}
