# utility-based-agents
Intelligent agents that choose actions to maximize a utility function, which evaluates the “value” of different states of the environment.

## stock trading

Imagine a stock trading agent, your objective is to maximize your utility by buying and selling shares based on market conditions, defined by expected profit metrics. The agent decides when to buy or sell based on a set of criteria, such as price trends and risk analysis. The agent has:

- State: Represents available stocks, your balance and current stock portfolio.
- Objective: Maximize profit when deciding to buy or sell.
- Actions: Buy, hold or sell stocks.
- Utility function: Calculate a utility for each action based on the expected profit (the higher the profit, the higher the utility).