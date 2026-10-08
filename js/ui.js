/**
 * Módulo de Interface e Manipulação do DOM
 */
const UI = {
    elements: {
        form: document.getElementById('calculator-form'),
        originInput: document.getElementById('origin-input'),
        originList: document.getElementById('origin-list'),
        destinationInput: document.getElementById('destination-input'),
        destinationList: document.getElementById('destination-list'),
        distanceInput: document.getElementById('distance-input'),
        transportSelect: document.getElementById('transport-select'),
        
        // Sections & Results
        resultsSection: document.getElementById('results-section'),
        routeBadge: document.getElementById('route-badge'),
        resDistance: document.getElementById('res-distance'),
        resEmission: document.getElementById('res-emission'),
        resEmissionText: document.getElementById('res-emission-text'),
        resCredits: document.getElementById('res-credits'),
        resCost: document.getElementById('res-cost'),
        comparisonGrid: document.getElementById('comparison-grid')
    },

    /**
     * Inicializa os autocompletes das cidades
     */
    setupAutocomplete() {
        const cities = getUniqueCities();

        this.bindAutocomplete(this.elements.originInput, this.elements.originList, cities);
        this.bindAutocomplete(this.elements.destinationInput, this.elements.destinationList, cities);

        // Ao preencher origem e destino, tenta auto-preencher a distância se a rota existir
        const checkAutoDistance = () => {
            const origin = this.elements.originInput.value;
            const dest = this.elements.destinationInput.value;
            const route = findSimulatedRoute(origin, dest);
            if (route) {
                this.elements.distanceInput.value = route.distanceKm;
            }
        };

        this.elements.originInput.addEventListener('change', checkAutoDistance);
        this.elements.destinationInput.addEventListener('change', checkAutoDistance);
    },

    /**
     * Binda os eventos de um campo com sua lista de sugestões
     */
    bindAutocomplete(inputEl, listEl, items) {
        inputEl.addEventListener('input', () => {
            const query = inputEl.value.trim().toLowerCase();
            listEl.innerHTML = '';

            if (!query) {
                listEl.classList.add('hidden');
                return;
            }

            const matches = items.filter(city => city.toLowerCase().includes(query));

            if (matches.length === 0) {
                listEl.classList.add('hidden');
                return;
            }

            matches.forEach(city => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'autocomplete-item';
                itemDiv.textContent = city;
                itemDiv.addEventListener('click', () => {
                    inputEl.value = city;
                    listEl.classList.add('hidden');
                    inputEl.dispatchEvent(new Event('change'));
                });
                listEl.appendChild(itemDiv);
            });

            listEl.classList.remove('hidden');
        });

        // Oculta ao clicar fora
        document.addEventListener('click', (e) => {
            if (!inputEl.contains(e.target) && !listEl.contains(e.target)) {
                listEl.classList.add('hidden');
            }
        });
    },

    /**
     * Exibe o resultado e preenche as métricas na tela
     */
    renderResults(distanceKm, selectedTransport, emissionKg, credits, cost, comparisons, routeName) {
        // Revela a seção de resultados
        this.elements.resultsSection.classList.remove('hidden');

        // Atualiza a badge da rota
        this.elements.routeBadge.textContent = routeName || 'Rota Personalizada';

        // Métricas principais
        this.elements.resDistance.textContent = distanceKm.toLocaleString('pt-BR', { maximumFractionDigits: 1 });
        this.elements.resEmission.textContent = emissionKg.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.elements.resEmissionText.textContent = `${emissionKg.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kg`;

        // Créditos de carbono e custo
        this.elements.resCredits.textContent = credits.toFixed(4);
        this.elements.resCost.textContent = cost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        // Renderiza cards de comparação
        this.renderComparisonCards(comparisons, selectedTransport);

        // Scroll suave até os resultados
        this.elements.resultsSection.scrollIntoView({ behavior: 'smooth' });
    },

    /**
     * Gera os cards comparativos entre todos os meios de transporte
     */
    renderComparisonCards(comparisons, selectedTransport) {
        this.elements.comparisonGrid.innerHTML = '';

        comparisons.forEach(item => {
            const isSelected = item.type === selectedTransport;
            const card = document.createElement('div');
            card.className = `transport-card ${isSelected ? 'transport-card--selected' : ''}`;
            
            card.innerHTML = `
                <div class="transport-card__header">
                    <span>${item.icon}</span>
                    <span>${item.label}</span>
                </div>
                <div class="transport-card__emission">${item.emissionKg.toFixed(1)} <small style="font-size:0.8rem">kg CO₂</small></div>
                <div class="transport-card__factor">${CONFIG.EMISSION_FACTORS[item.type]} g/km</div>
            `;
            this.elements.comparisonGrid.appendChild(card);
        });
    }
};
