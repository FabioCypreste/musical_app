import react from 'react';
import {useNavigate} from 'react-router-dom';
import './homepage.css';

import ClapImage from './imagens/clap.png';
import ANovicaRebelde from './imagens/a_novica_rebelde.png';
import EpicTheMusical from './imagens/epic_the_musical.png';
import Heathers from './imagens/heathers.png';
import Lalaland from './imagens/la_la_land.png';
import MammaMia from './imagens/mamma_mia.png';
import OsMiseraveis from './imagens/os_miseraveis.png';
import TheGreatestShowman from './imagens/the_greatest_showman.png';
import Wicked from './imagens/wicked.png';
import ""

export default function Homepage() {
    const navigate = useNavigate();

    const musicais = [
        { id: 'epic', name: 'Epic: The Musical', image: epicImage, path: './imagens/clap.png' },
        { id: 'hamilton', name: 'Hamilton', image: hamiltonImage, path: './imagens/hamilton.png' },
        { id: 'novica-rebelde', name: 'A Noviça Rebelde', image: novicaRebeldeImage, path: './imagens/a_novica_rebelde.png' },
        { id: 'wicked', name: 'The Wicked', image: wickedImage, path: './imagens/wicked' },
        { id: 'os-miseraveis', name: 'Os Miseráveis', image: osMiseraveisImage, path: './imagens/os_miseraveis' },
        { id: 'greatest-showman', name: 'The Greatest Showman', image: greatestShowmanImage, path: './imagens/the_greatest_showman' },
        { id: 'mamma-mia', name: 'Mamma Mia!', image: mammaMiaImage, path: './imagens/mamma_mia' },
        { id: 'la-la-land', name: 'La La Land', image: laLaLandImage, path: './imagens/la_la_land' },
        { id: 'heathers', name: 'Heathers', image: heathersImage, path: './imagens/heathers' },
    ];

    const handleMusicalClick = (path) => {
        navigate(path);
    };

    return (
        <div className="home-container">
            <div className="header">
                {/* Aqui você pode usar uma imagem para o "Clap!" ou um texto estilizado */}
                <h1>Clap!</h1>
                <p>Onde a magia dos musicais nunca cai de cartaza.</p>
            </div>

            <div className="grid-container">
                {musicals.map((musical) => (
                    <div key={musical.id} className="musical-item">
                        <button 
                            className="musical-button" 
                            onClick={() => handleMusicalClick(musical.path)}
                            aria-label={`Ver detalhes de ${musical.name}`}
                        >
                            <img src={musical.image} alt={musical.name} />
                        </button>
                        <p>{musical.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
