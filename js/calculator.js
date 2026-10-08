/**
 * Módulo de Cálculos Matemáticos de Emissão de CO2 e Compensação
 */
const Calculator = {
    /**
     * Calcula a emissão de CO2 em kg para uma distância e tipo de transporte
     * @param {number} distanceKm - Distância em quilômetros
     * @param {string} transportType - Tipo de transporte (carro, onibus, caminhao, bicicleta)
     * @returns {number} Emissão em kg de CO2
     */
    calculateEmission(distanceKm, transportType) {
        const factor = CONFIG.EMISSION_FACTORS[transportType] ?? 0;
        // Emissão em gramas = distância (km) * fator (g/km)
        const totalGrams = distanceKm * factor;
        // Converte de gramas para kg (1 kg = 1000 g)
        return totalGrams / 1000;
    },

    /**
     * Calcula a quantidade de créditos de carbono necessários (1 crédito = 1 tonelada de CO2)
     * @param {number} emissionKg - Emissão total em kg de CO2
     * @returns {number} Quantidade de créditos de carbono (toneladas)
     */
    calculateCarbonCredits(emissionKg) {
        // 1 Tonelada = 1000 kg
        return emissionKg / 1000;
    },

    /**
     * Estima o custo de compensação em Reais (R$)
     * @param {number} credits - Quantidade de créditos de carbono
     * @returns {number} Valor estimado em R$
     */
    calculateOffsetCost(credits) {
        return credits * CONFIG.CARBON_CREDIT_PRICE_PER_TON;
    },

    /**
     * Retorna a comparação de emissões para todos os meios de transporte
     * @param {number} distanceKm - Distância em quilômetros
     * @returns {Array} Lista de objetos com tipo, label, ícone e emissão em kg
     */
    getComparisonAllTransports(distanceKm) {
        return Object.keys(CONFIG.EMISSION_FACTORS).map(type => {
            const meta = CONFIG.TRANSPORT_METADATA[type];
            const emissionKg = this.calculateEmission(distanceKm, type);
            return {
                type,
                label: meta.label,
                icon: meta.icon,
                emissionKg
            };
        });
    }
};
