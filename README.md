# go-cook

This is a collection of my favorite recipes, accessible from anywhere,
like my phone, in the kitchen.
This includes recipes collected by my mother
from family and friends, as well as how I actually cook these recipes from my family, as well as new things that
I cook now.

## Layout

A layout like this will be automatically indexed with navigation elements in the Material theme.

```text
cookbook/
├── index.md        # The main landing page (your current file)
├── breads/         # Breads and Doughs
├── soups/          # Stocks, Soups, and Stews
├── breakfast/      # Breakfast, Eggs, and Dairy
├── appetizers/     # Apps, Snacks, and Finger Foods
├── greens/         # Greens, Salads, and Dressings
├── vegetables/     # Cooking Vegetables
├── grains/         # Pasta, Rice, and Ancient Grains
├── casseroles/     # Casseroles, Bakes, and One-Dish Meals
├── ground-meats/   # Ground Meats
├── dry-heat/       # Dry-Heat Cooking: Frying and Broiling Proteins
├── braises/        # Braised and Sauced
├── roasting/       # Roasting: Turkey, Chicken, Prime Rib, and Pork
├── fried/          # Battered and Fried
├── ferments/       # Ferments and Pickles
├── deserts/        # Desserts
├── barrel/         # Bottom of the Barrel
├── experimental/   # My Test Kitchen
├── __snippets/     # Markdown fragments to include in many files
├── js/             # Javascript for minimal special effects
└── stylesheets/    # CSS to make it pretty
```

### Build

```terminal
uv run mkdocs build
```

### Serve Locally

```terminal
uv run mkdocs serve
```
