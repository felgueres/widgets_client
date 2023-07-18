## Widgets 

Give immediate and accurate answers to common queries using widgets.

### Features 

- Simple input to submit queries
- Depending on the type of the query, shows the appropriate widget on submission with the answer
- Widgets for Weather, calculator, and current time

### Implementation

![flow](./public/assets/flow.png)

**Weather widget**: Shows weather for requested location or in user’s locale if none specified.

Includes:
- Current weather with: Hi / lo temperatures
- Current humidity, temp, wind speeds

**API**
```python
def get_weather(timezone :str, location=None :str)-> weather_results : dict :
    '''Get weather in given location or locale if none specified
    Examples:
    get_weather('America/Los_Angeles')
    get_weather('America/Los_Angeles', 'San Francisco')
    '''
    if not location: location = get_location_from_timezone()
    # call weatherapi.com
    return weather_results

```

**Calculator widget** will only show the evaluated value of the math expression

- Determine if the query is a math expression and evaluate it. You can use the `eval` function in python to evaluate the expression.
  
**Time widget** will simply show the time for the requested location or in user’s locale if none specified

### Quickstart
```bash
npm run dev
```

Runs at [http://localhost:3000](http://localhost:3000).

### Bonus features

**Classifier to route queries**: For the minimal version you can assume all submissions will follow a certain format. For bonus points, it would be able to route a query in any format to the appropriate widget. Would need an LLM classifier here. You can use OpenAI api to create a classifier by prompting the model (ask for help if needed)
