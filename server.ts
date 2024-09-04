import { app } from "./app";
import { port } from "./config";

app.listen({ port: port, host: "0.0.0.0" }, (err, address) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Server listening at ${address}`);
});
