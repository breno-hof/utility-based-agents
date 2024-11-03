type Stock = { symbol: string, price: number };
type Action = "buy" | "sell" | "hold";

class StockTradingAgent {
    private balance: number;
    private portfolio: { [symbol: string]: number };
    private utilityFunction: (stock: Stock, action: Action) => number;

    constructor(initialBalance: number) {
        this.balance = initialBalance;
        this.portfolio = {};
        this.utilityFunction = this.calculateUtility.bind(this);
    }

    // Função de utilidade: Retorno esperado para cada ação
    private calculateUtility(stock: Stock, action: Action): number {
        if (action === "buy" && stock.price < this.balance) {
            return this.expectedReturn(stock) - this.risk(stock); // Alta utilidade para ações com alto retorno e baixo risco
        } else if (action === "sell" && this.portfolio[stock.symbol] > 0) {
            return this.expectedReturn(stock) * 0.8; // Reduz utilidade ao vender, pois implica em lucro realizado
        }
        return -Infinity; // "Hold" ou ações impossíveis têm baixa utilidade
    }

    // Função para estimar o retorno esperado (simplificado)
    private expectedReturn(stock: Stock): number {
        // Simula a expectativa de retorno como uma função do preço
        return stock.price * 1.1; // Exemplo: espera-se um aumento de 10%
    }

    // Função para calcular o risco (simplificado)
    private risk(stock: Stock): number {
        // Exemplo: risco calculado em função do preço e volatilidade simulada
        return stock.price * 0.05; // Exemplo: risco é 5% do preço atual
    }

    // Decide a ação com base na utilidade
    public decideAction(stock: Stock): Action {
        const actions: Action[] = ["buy", "sell", "hold"];
        let bestAction: Action = "hold";
        let maxUtility = -Infinity;

        for (const action of actions) {
            const utility = this.utilityFunction(stock, action);
            if (utility > maxUtility) {
                maxUtility = utility;
                bestAction = action;
            }
        }

        return bestAction;
    }

    // Realiza a ação decidida
    public executeAction(stock: Stock): void {
        const action = this.decideAction(stock);
        
        switch (action) {
            case "buy":
                if (stock.price <= this.balance) {
                    this.balance -= stock.price;
                    this.portfolio[stock.symbol] = (this.portfolio[stock.symbol] || 0) + 1;
                    console.log(`Comprou ação ${stock.symbol} por ${stock.price}. Saldo: ${this.balance}`);
                }
                break;

            case "sell":
                if (this.portfolio[stock.symbol] > 0) {
                    this.balance += stock.price;
                    this.portfolio[stock.symbol] -= 1;
                    console.log(`Vendeu ação ${stock.symbol} por ${stock.price}. Saldo: ${this.balance}`);
                }
                break;

            default:
                console.log(`Aguardando melhores condições para ${stock.symbol}.`);
                break;
        }
    }

    // Exibe o portfólio atual e saldo
    public showPortfolio(): void {
        console.log("Portfólio atual:", this.portfolio);
        console.log("Saldo atual:", this.balance);
    }
}

// Simulação
const agent = new StockTradingAgent(10000); // Iniciando com $1000
const marketStocks: Stock[] = [
    { symbol: "AAPL", price: 150 },
    { symbol: "GOOGL", price: 2800 },
    { symbol: "TSLA", price: 700 },
    { symbol: "AMZN", price: 3400 }
];

// Executa o agente para cada ação no mercado
marketStocks.forEach(stock => {
    agent.executeAction(stock);
    agent.showPortfolio();
});
