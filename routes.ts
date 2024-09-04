import { app } from "./app";
import { create } from "./controllers/product/mutations";

app.post("/products", create);
