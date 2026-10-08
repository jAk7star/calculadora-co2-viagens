/**
 * Script Principal de Eventos da Aplicação
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o autocompleter de cidades
    UI.setupAutocomplete();

    // Event listener do formulário principal
    UI.elements.form.addEventListener('submit', (e) => {
        e.preventDefault();

        const origin = UI.elements.originInput.value.trim();
        const destination = UI.elements.destinationInput.value.trim();
        let distanceKm = parseFloat(UI.elements.distanceInput.value);
        const transport = UI.elements.transportSelect.value;

        // Se a distância manual não foi preenchida, tenta buscar rota simulada
        let routeName = '';
        if ((!distanceKm || isNaN(distanceKm)) && origin && destination) {
            const simulatedRoute = findSimulatedRoute(origin, destination);
            if (simulatedRoute) {
                distanceKm = simulatedRoute.distanceKm;
                routeName = `${simulatedRoute.origin} ➔ ${simulatedRoute.destination}`;
            }
        } else if (origin && destination) {
            routeName = `${origin} ➔ ${destination}`;
        }

        // Validação final de distância
        if (!distanceKm || isNaN(distanceKm) || distanceKm <= 0) {
            alert('Por favor, informe uma rota válida com cidades cadastradas ou digite a distância em km.');
            return;
        }

        // Realiza os cálculos usando a calculadora
        const emissionKg = Calculator.calculateEmission(distanceKm, transport);
        const credits = Calculator.calculateCarbonCredits(emissionKg);
        const cost = Calculator.calculateOffsetCost(credits);
        const comparisons = Calculator.getComparisonAllTransports(distanceKm);

        // Atualiza a interface
        UI.renderResults(
            distanceKm, 
            transport, 
            emissionKg, 
            credits, 
            cost, 
            comparisons, 
            routeName
        );
    });
});
