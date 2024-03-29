import { Request, Response } from "express";
import { buscarPedidos, buscarPedidosPendentes } from "../services/pedidoService";
import { writePedidosPendentesToFile } from "../utils/fileUtils";
import PedidoPendente from "../models/PedidoPendente";


const notasDiretorio = "./src/data/notas";
const pedidosDiretorio = "./src/data/pedidos";


export function getPedidos(_: Request, res: Response): void {
  try {
    const pedidos = buscarPedidos();
    res.json(pedidos);
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export function getPedidosPendentes(_: Request, res: Response): void {
  const pedidosPendentes = buscarPedidosPendentes(notasDiretorio, pedidosDiretorio);
  const formattedData = formatData(pedidosPendentes);
  writePedidosPendentesToFile(formattedData);
  res.json(pedidosPendentes);
}

function formatData(pedidosPendentes: PedidoPendente[]): string {
  let formattedData = "";

  for (const pedido of pedidosPendentes) {
    const saldoValorItem = parseFloat(pedido.valorPedido.replace(",", ".")) * pedido.saldoQuantidade;
    const valorTotalPedido = saldoValorItem + (pedido.quantidadePedida - pedido.saldoQuantidade) * parseFloat(pedido.valorPedido.replace(",", "."));
    
    formattedData += `Número do pedido: ${pedido.numeroPedido}\n`;
    formattedData += `Valor total do pedido: R$ ${valorTotalPedido.toFixed(2)}\n`;
    formattedData += `Número do item: ${pedido.idItem}, Saldo da quantidade: ${pedido.saldoQuantidade}\n`;
    formattedData += `Valor por unidade: R$ ${pedido.valorPedido}\n`;
    formattedData += `Saldo do valor do item: R$ ${saldoValorItem.toFixed(2)}\n\n`;
  }

  return formattedData;
}