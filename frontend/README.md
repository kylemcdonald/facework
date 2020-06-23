# mfe frontend

## Dependencies

You'll need pnpm, which you can `brew install pnpm` on macOS. And node.js.

## CLI Commands

- `pnpm install`: Installs dependencies

- `pnpm run start`: Runs `serve` or `dev`, depending on `NODE_ENV` value. Defaults to `dev server`

- `pnpm run dev`: Run a development, HMR server

- `pnpm run serve`: Run a production-like server

- `pnpm run build`: Production-ready build

- `pnpm run lint`: Pass TypeScript files using TSLint

- `pnpm run test`: Run Jest and [`preact-render-spy`](https://github.com/mzgoddard/preact-render-spy) for your tests

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).
