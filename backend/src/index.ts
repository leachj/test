import { buildApp } from './app';
import { AppState } from './state';

const port = Number.parseInt(process.env.PORT ?? '3001', 10) || 3001;

const app = buildApp(new AppState());

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend server running on http://localhost:${port}`);
});
