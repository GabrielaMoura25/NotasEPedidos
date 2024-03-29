import { Request, Response } from "express";
import { buscarNotas } from "../services/notaService";

export function getNotas(_: Request, res: Response): void {
  try {
    const notas = buscarNotas();
    res.json(notas);
  } catch (error) {
    console.error("Erro ao buscar notas:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}