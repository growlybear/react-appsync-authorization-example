input CreateRecipeInput {
	id: ID!
	name: String!
	directions: [String]!
	ingredients: [String]!
}

input DeleteRecipeInput {
	id: ID!
}

type Mutation {
	createRecipe(input: CreateRecipeInput!): Recipe
	updateRecipe(input: UpdateRecipeInput!): Recipe
	deleteRecipe(input: DeleteRecipeInput!): Recipe
}

type Query {
	fetchRecipe(id: ID!): Recipe
	getRecipe(id: ID!): Recipe
	listRecipes(first: Int, after: String): RecipeConnection
}

type Recipe {
	id: ID!
	name: String!
	directions: [String]!
	ingredients: [String]!
}

type RecipeConnection {
	items: [Recipe]
	nextToken: String
}

type Subscription {
	onCreateRecipe(
		id: ID,
		name: String,
		directions: [String],
		ingredients: [String]
	): Recipe
		@aws_subscribe(mutations: ["createRecipe"])
	onUpdateRecipe(
		id: ID,
		name: String,
		directions: [String],
		ingredients: [String]
	): Recipe
		@aws_subscribe(mutations: ["updateRecipe"])
	onDeleteRecipe(
		id: ID,
		name: String,
		directions: [String],
		ingredients: [String]
	): Recipe
		@aws_subscribe(mutations: ["deleteRecipe"])
}

input UpdateRecipeInput {
	id: ID!
	name: String
	directions: [String]
	ingredients: [String]
}
