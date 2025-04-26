# AI HR APPLICATION

This is a project to learn about AI development flows and challenges. The goal of this project is to learn how to integrate AI into our common tools and use it to generate results that would otherwise require dedicated coded modules.

## Getting Started

### AI Key

For this project we need an AI model that can handle the following features:
- Tooling
- Structured Output

Additionally working with as much context capability as possible is a plus.

You can subscribe for an API from your selected platform, in this approach you will need to mody the [chat route](src/app/api/graph-ai/route.ts) to support your chosen model.

Or you can look for free models that have the necessary requirements in [Open Router](https://openrouter.ai/models?fmt=cards&max_price=0&supported_parameters=tools%2Cstructured_outputs). In this approach you will need to update the `model` name in [chat route](src/app/api/graph-ai/route.ts) file.

### Running this project

1. Install dependencies using `pnpm i`
2. Start a local postgreSQL service and create a table called `ai-hr-app`
3. Run `pnpm drizzle-kit-push` to push the defined schema into your local postgreSQL database
4. Run `pnpm seed` to insert data into the database
5. Run `pnpm dev`
6. You can run `pnpm drizzle-kit-studio` to get open a nice UI for editing database entries