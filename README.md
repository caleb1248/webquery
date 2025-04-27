# WebQuery

A simple web ui to query your postgres database.

## How to run

1. First, install dependencies

```bash
bun install
```

2. Then start the program.

```bash
bun run index.ts
```

3. Follow the instructions in the terminal. It will prompt your for the database name, and the username and password of a user that has access to the database. Make sure your postgres server is running on `localhost:5432`. Other hosts or ports are currently unsupported.

> Note: You can also run `bun run build` to compile the project into a single file executable, which you can then move into your path or bin directory, allowing you to run WebQuery from anywhere.
