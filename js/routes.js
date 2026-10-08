/**
 * Base de Dados Simulada de Cidades e Rotas Brasileiras
 */
const CITY_ROUTES = [
    { origin: "São Paulo", destination: "Rio de Janeiro", distanceKm: 435 },
    { origin: "São Paulo", destination: "Campinas", distanceKm: 95 },
    { origin: "São Paulo", destination: "Curitiba", distanceKm: 408 },
    { origin: "São Paulo", destination: "Belo Horizonte", distanceKm: 586 },
    { origin: "Rio de Janeiro", destination: "Belo Horizonte", distanceKm: 434 },
    { origin: "Rio de Janeiro", destination: "Vitória", distanceKm: 521 },
    { origin: "Belo Horizonte", destination: "Brasília", distanceKm: 740 },
    { origin: "Curitiba", destination: "Florianópolis", distanceKm: 300 },
    { origin: "Florianópolis", destination: "Porto Alegre", distanceKm: 460 },
    { origin: "Brasília", destination: "Goiânia", distanceKm: 209 },
    { origin: "Salvador", destination: "Aracaju", distanceKm: 320 },
    { origin: "Recife", destination: "Maceió", distanceKm: 258 },
    { origin: "Recife", destination: "João Pessoa", distanceKm: 120 },
    { origin: "Fortaleza", destination: "Natal", distanceKm: 530 }
];

/**
 * Retorna uma lista com todas as cidades únicas cadastradas para o autocomplete
 */
function getUniqueCities() {
    const citiesSet = new Set();
    CITY_ROUTES.forEach(route => {
        citiesSet.add(route.origin);
        citiesSet.add(route.destination);
    });
    return Array.from(citiesSet).sort();
}

/**
 * Procura se existe uma rota simulada pré-cadastrada entre duas cidades
 */
function findSimulatedRoute(origin, destination) {
    if (!origin || !destination) return null;
    
    const normalizedOrigin = origin.trim().toLowerCase();
    const normalizedDest = destination.trim().toLowerCase();

    return CITY_ROUTES.find(r => 
        (r.origin.toLowerCase() === normalizedOrigin && r.destination.toLowerCase() === normalizedDest) ||
        (r.origin.toLowerCase() === normalizedDest && r.destination.toLowerCase() === normalizedOrigin)
    );
}
