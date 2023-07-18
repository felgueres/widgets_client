## Widgets 

Give immediate and accurate answers to common queries using widgets.

### Features 

- Simple input to submit queries
- Shows appropriate widget on submission with the answer
- Supports widgets: weather, calculator, and current time

### Implementation

- User submits query
- Runs LLM classifier to determine if and which widget to use 
- Runs LLM to extract arguments for function 
- Evaluates 
- Returns answer 

![flow](./public/assets/flow.png)

### Widgets

**Weather widget**: Shows current weather for requested location or in user’s locale if none specified.

- Current weather with: Hi / lo temperatures
- Current humidity, temp, wind speeds

**Calculator widget**: Shows the evaluated value of the math expression

- Determine if the query is a math expression and evaluate it. You can use the `eval` function in python to evaluate the expression.
  
**Time widget**: Shows the time for the requested location or in user’s locale if none specified.

### Quickstart
```bash
npm install
npm run dev
```

Runs at [http://localhost:3000](http://localhost:3000).

### Bonus features

**Classifier to route queries**: For the minimal version you can assume all submissions will follow a certain format. For bonus points, it would be able to route a query in any format to the appropriate widget. Would need an LLM classifier here. You can use OpenAI api to create a classifier by prompting the model.
