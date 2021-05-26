## Authorization

### Register an Account

~~ ~~POST /api/auth/register~~

Body:
| Parameter | Type | Notes |
| :-- | :-- | :-- |
| username | string | (required) |
| password | string | (required) |
| email | string | (required) |

Response:

    { token: <authorization> }

### Login

~~ ~~POST /api/auth/login~~

Body:
| Parameter | Type | Notes |
| :-- | :-- | :-- |
| username | string | (required) |
| password | string | (required) |

Response:

    { token: <authorization> }

## Recipes

### Get all recipes by user

    GET /api/recipes

~~(auth)~~

    Headers authorization: 5678, user_id: (integer)

Response:

     [
    {
        "recipe_id": 1,
        "recipe_name": "Broccoli Pesto Pasta",
        "recipe_source": "myself",
        "user_id": 1,
        "category_id": 1
    },
    {
        "recipe_id": 4,
        "recipe_name": "boiled water",
        "recipe_source": "me",
        "user_id": 1,
        "category_id": 5
    },
       ...
     ]

### Get full recipe

    GET /api/recipes/:recipe_id

~~(auth)~~

    Headers authorization: 5678, user_id: (integer)

Response:

    {
    "recipe": {
        "recipe_id": 1,
        "recipe_name": "Broccoli Pesto Pasta",
        "recipe_source": "myself",
        "user_id": 1
    },
    "category": {
        "category_id": 1,
        "category": "pasta"
    },
    "steps": [
        {
            "step_id": 1,
            "step_description": "Heat pan",
            "step_number": 1,
            "step_ingredients": []
        },
        {
            "step_id": 2,
            "step_description": "Add Broccoli",
            "step_number": 2,
            "step_ingredients": [
                {
                    "step_ingredient_id": 1,
                    "quantity": 1,
                    "ingredient": {
                        "ingredient_id": 1,
                        "ingredient_name": "Broccoli",
                        "ingredient_unit": "lbs"
                    }
                }
            ]
        },
        {
            "step_id": 3,
            "step_description": "Add pesto mixed with pasta",
            "step_number": 3,
            "step_ingredients": [
                {
                    "step_ingredient_id": 2,
                    "quantity": 1.5,
                    "ingredient": {
                        "ingredient_id": 2,
                        "ingredient_name": "Pesto",
                        "ingredient_unit": "lbs"
                    }
                },
                {
                    "step_ingredient_id": 3,
                    "quantity": 2,
                    "ingredient": {
                        "ingredient_id": 3,
                        "ingredient_name": "Pasta",
                        "ingredient_unit": "lbs"
                    }
                }
            ]
        }
      ]
    }

### Post a recipe

    POST /api/items

~~(auth)~~

    Headers authorization: 5678, user_id: (integer)

| Parameter        | Type   | Notes                                 |
| :--------------- | :----- | :------------------------------------ |
| recipe_name      | string | (required)                            |
| recipe_source    | string | (required)                            |
| category         | string | (required)                            |
| recipe_steps     | array  | of objects, defined below, (required) |
| step_description | string | (required)                            |
| step_number      | number | (required)                            |
| step_ingredients | array  | of objects, defined below             |
| quantity         | number | (required)                            |
| ingredient       | object | defined below, (required)             |
| ingredient_name  | string | (required)                            |
| ingredient_unit  | string | (required if ingredient is new)       |

Response: The created item

    {
        "recipe_id": 4,
        "recipe_name": "boiled water",
        "recipe_source": "me",
        "user_id": 1,
        "category": {
            "category_id": 4,
            "category": "soups"
        },
        "steps": [
            {
                "step_id": 9,
                "step_description": "heat water in pot",
                "step_number": 1,
                "step_ingredients": [
                    {
                        "step_ingredient_id": 7,
                        "quantity": 8,
                        "ingredient": {
                            "ingredient_id": 7,
                            "ingredient_name": "water",
                            "ingredient_unit": "oz"
                        }
                    }
                ]
            }
        ]
    }
