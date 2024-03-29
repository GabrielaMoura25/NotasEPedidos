import Pedido from "../models/Pedido";
import PedidoPendente from "../models/PedidoPendente";
import { readFileSync, readdirSync } from "../utils/fileUtils";

const pedidosDiretorio = "./src/data/pedidos";

export function buscarPedidos(): Pedido[] {
  const pedidosArquivos = readdirSync(pedidosDiretorio);
  const pedidos: Pedido[] = [];

  for (const pedidoArquivo of pedidosArquivos) {
    const pedidoContent = readFileSync(`${pedidosDiretorio}/${pedidoArquivo}`);
    const pedidoLinhas = pedidoContent.trim().split("\n");

    for (const linha of pedidoLinhas) {
      const pedido = JSON.parse(linha);
      pedidos.push(pedido);
    }
  }

  return pedidos;
}

export function buscarPedidosPendentes(
    notasDiretorio: string,
    pedidosDiretorio: string
  ): PedidoPendente[] {
    const notasArquivos: string[] = readdirSync(notasDiretorio);
    const pedidosArquivos: string[] = readdirSync(pedidosDiretorio);
    const pedidosPendentes: PedidoPendente[] = [];
    let existemPedidosPendentes = false;
  
    for (const pedidoArquivo of pedidosArquivos) {
      const matchResult: RegExpMatchArray | null = pedidoArquivo.match(/\d+/);
      const numeroPedido: number = matchResult ? Number(matchResult[0]) : -1;
      const pedidoContent: string = readFileSync(
        `${pedidosDiretorio}/${pedidoArquivo}`
      );
  
      for (const linhaPedido of pedidoContent.trim().split("\n")) {
        const pedido: any = JSON.parse(linhaPedido);
        const idItem: any = pedido.número_item;
        const quantidadePedida: any = pedido.quantidade_produto;
        let quantidadeAtendida = 0;
  
        for (const notaArquivo of notasArquivos) {
          const notaContent: string = readFileSync(
            `${notasDiretorio}/${notaArquivo}`
          );
  
          for (const linhaNota of notaContent.trim().split("\n")) {
            const nota: any = JSON.parse(linhaNota);
            const idPedido: any = nota.id_pedido;
            const numeroItem: any = nota.número_item;
            const quantidadeNota: any = nota.quantidade_produto;
  
            if (idPedido == numeroPedido && numeroItem == idItem) {
              quantidadeAtendida += quantidadeNota;
            }
          }
        }
  
        if (quantidadeAtendida < quantidadePedida) {
          existemPedidosPendentes = true;
          const saldoQuantidade: number = quantidadePedida - quantidadeAtendida;
  
          const pedidoPendente: PedidoPendente = {
            numeroPedido,
            idItem,
            quantidadePedida,
            quantidadeNota: quantidadeAtendida,
            saldoQuantidade,
            valorPedido: pedido.valor_unitário_produto,
          };
  
          pedidosPendentes.push(pedidoPendente);
        } else if (quantidadeAtendida > quantidadePedida) {
          throw new Error(
            `Quantidade atendida maior do que a quantidade pedida para o item ${idItem} do pedido ${numeroPedido}.`
          );
        }
      }
    }
  
    if (!existemPedidosPendentes) {
      console.log("Não há pedidos pendentes.");
    }
  
    return pedidosPendentes;
  }