import express from "express";
import cors from "cors";
import { getNotas } from "./controllers/notaController";
import { getPedidos, getPedidosPendentes } from "./controllers/pedidoController";

const app = express();
app.use(cors());
const port = 3000;

app.get("/notas", getNotas);
app.get("/pedidos", getPedidos);
app.get("/pedidos-pendentes", getPedidosPendentes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});