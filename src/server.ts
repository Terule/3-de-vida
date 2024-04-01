import { Middlewares } from "@middlewares/middlewares";
import app from "./app";

const middlewares = new Middlewares();

const port = process.env.PORT || 3001;

app.use(middlewares.errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
