import { Product } from '../models/product.model';

export const PRODUCTS: Product[] = [
    {
        id: 1,
        name: 'Guitarra Strato HSS',
        description: 'Guitarra versátil com excelente timbre para apresentações ao vivo, ensaios e gravações em estúdio.',
        specs: [ 'Corpo em madeira premium', 'captadores HSS', 'ponte tremolo e acabamento profissional.' ],
        price: 2850,
        oldPrice: 3200,
        imageUrl: 'assets/products/guitarra-strato.png',
        stock: 8,
        category: 'Guitarras'
    },

    {
        id: 2,
        name: 'Kit de Pratos B20',
        description: 'Kit de pratos profissionais produzido em liga B20, ideal para bateristas que buscam excelente definição sonora.',
        specs: ['Liga B20', 'acabamento brilhante', 'alta projeção sonora e excelente resposta dinâmica.'],
        price: 1890,
        oldPrice: 2150,
        imageUrl: 'assets/products/kit-pratos-b20.png',
        stock: 5,
        category: 'Baterias'
    },

    {
        id: 3,
        name: 'Pedal IR',
        description: 'Pedal de efeitos compacto com resposta dinâmica e excelente qualidade para apresentações e gravações.',
        specs: ['Processamento digital', 'múltiplos presets', 'entrada para instrumento e saída de áudio.'],
        price: 890,
        oldPrice: 990,
        imageUrl: 'assets/products/pedal-ir.png',
        stock: 12,
        category: 'Pedais & Efeitos'
    },

    {
        id: 4,
        name: 'Interface de Áudio USB',
        description: 'Interface de áudio profissional para gravações, produção musical, podcasts e streaming.',
        specs: ['2 entradas combinadas', 'alimentação phantom 48V', 'monitoramento direto e conexão USB.'],
        price: 1290,
        oldPrice: 1490,
        imageUrl: 'assets/products/interface-audio.png',
        stock: 8,
        category: 'Áudio Pro'
    },

    {
        id: 5,
        name: 'Guitarra Les Paul Classic',
        description: 'Guitarra de corpo sólido com dois captadores humbucker e sonoridade encorpada.',
        specs: ['Corpo sólido', 'dois humbuckers', 'ponte fixa e acabamento premium.'],
        price: 3490,
        oldPrice: 3890,
        imageUrl: 'assets/products/guitarra-les-paul.png',
        stock: 6,
        category: 'Guitarras'
    },

    {
        id: 6,
        name: 'Bateria Acústica Completa',
        description: 'Kit completo de bateria acústica para estudos, ensaios e apresentações.',
        specs: ['Shells em madeira', 'bumbo, tons, surdo e ferragens inclusas.'],
        price: 4590,
        oldPrice: 4990,
        imageUrl: 'assets/products/bateria-acustica.png',
        stock: 3,
        category: 'Baterias'
    }
];