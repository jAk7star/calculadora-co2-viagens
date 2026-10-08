/**
 * Configurações da Calculadora de CO2
 * Fatores de emissão em gramas de CO2 por quilômetro (g/km)
 * Preço de crédito de carbono em reais por tonelada (R$/ton)
 */
const CONFIG = {
    // Fatores de emissão por transporte em g CO2/km
    EMISSION_FACTORS: {
        bicicleta: 0,     // 0g/km
        onibus: 30,       // 30g/km por passageiro
        carro: 120,       // 120g/km
        caminhao: 900     // 900g/km
    },

    // R$ 50,00 por Tonelada de CO2
    CARBON_CREDIT_PRICE_PER_TON: 50.00,

    // Nomes amigáveis dos transportes e ícones
    TRANSPORT_METADATA: {
        bicicleta: { label: 'Bicicleta', icon: '🚲' },
        onibus: { label: 'Ônibus', icon: '🚌' },
        carro: { label: 'Carro', icon: '🚗' },
        caminhao: { label: 'Caminhão', icon: '🚛' }
    }
};
