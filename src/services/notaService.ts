import Nota from "../models/Nota";
import { readFileSync, readdirSync } from "../utils/fileUtils";

const notasDiretorio = "./src/data/notas";

export function buscarNotas(): Nota[] {
  const notasArquivos = readdirSync(notasDiretorio);
  const notas: Nota[] = [];

  for (const notaArquivo of notasArquivos) {
    const notaContent = readFileSync(`${notasDiretorio}/${notaArquivo}`);
    const notaLinhas = notaContent.trim().split("\n");

    for (const linha of notaLinhas) {
      const nota = JSON.parse(linha);
      notas.push(nota);
    }
  }

  return notas;
}