import fs from "fs";

export function readFileSync(filePath: string): string {
  return fs.readFileSync(filePath, "utf-8");
}

export function readdirSync(directoryPath: string): string[] {
  return fs.readdirSync(directoryPath);
}

export function writeFileSync(filePath: string, data: string): void {
  fs.writeFileSync(filePath, data, "utf-8");
}

export function writePedidosPendentesToFile(pedidosPendentes: string): void {
  writeFileSync("pedidosPendentes.txt", pedidosPendentes);
}