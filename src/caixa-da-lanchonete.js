class CaixaDaLanchonete {

    constructor(cardapio,metodosDePagamento) {
        this.cardapio = cardapio =  {
            cafe: {
                descricao: 'Café',
                valor: 3,
            },
            chantily: {
                descricao: 'Chantily (extra do Café)',
                valor: 1.5,
            },
            suco:{
                descricao: 'Suco Natural',
                valor: 6.20,
            },
            sanduiche: {
                descricao: 'Sanduiche',
                valor: 6.5,
            },
            queijo: {
                descricao: 'Queijo (extra do Sanduíche)',
                valor: 2,
            },
            salgado: {
                descricao: 'Salgado',
                valor: 7.25,
            },
            combo1: {
                descricao: '1 Suco e 1 Sanduíche',
                valor: 9.5,
            },
            combo2: {
                descricao: '1 Café e 1 Sanduíche',
                valor: 7.5,
            }
        };
        this.metodosDePagamento = metodosDePagamento = ['dinheiro', 'debito', 'credito'];
    }

    descontosOuTaxas(metodosDePagamento,valor) {

        switch(metodosDePagamento) {
            case 'dinheiro': valor -= valor * 0.05; return `R$ ${valor.toFixed(2).split('.').join(',')}`;
            case 'credito': valor += valor * 0.03; return `R$ ${valor.toFixed(2).split('.').join(',')}`;
            case 'debito': valor; return `R$ ${valor.toFixed(2).split('.').join(',')}`;
            default: return 'Forma de pagamento inválida!';
        }
        
    }

    calcularValorDaCompra(metodoDePagamento, itens) {

        if(!itens.length) return 'Não há itens no carrinho de compra!';

        const itensTratados = itens.map((item) => {
            return(
                item.split(',')
            )
        })
        
        const codigoItens = itensTratados.map((item) => {
            return(
                item[0]
            )
        })

        const codigoCardapio = Object.keys(this.cardapio)
        for(let i=0; i < codigoItens.length; i++){
            if(!codigoCardapio.includes(codigoItens[i])) return 'Item inválido!';
        }

        if(codigoItens.includes('chantily')){
            if(!codigoItens.includes('cafe')) return 'Item extra não pode ser pedido sem o principal';
        }

        if(codigoItens.includes('queijo')){
            if(!codigoItens.includes('sanduiche')) return 'Item extra não pode ser pedido sem o principal';
        }

        const quantidadeItens = itensTratados.map((item) => {
            return(
                item[1]
            )
        })

        if(quantidadeItens.includes('0')) return 'Quantidade inválida!';


        const valorTotal = itensTratados.reduce((acumulador, valorAtual) => {
            return(
                acumulador += this.cardapio[valorAtual[0]].valor * valorAtual[1]
            )
        }, 0)
        
        return new CaixaDaLanchonete().descontosOuTaxas(metodoDePagamento, valorTotal);
    }

}

const resultado = new CaixaDaLanchonete().calcularValorDaCompra('dinheiro', ['cafe,1','chantily,1']);
console.log('Valor do pedido:', resultado);


export { CaixaDaLanchonete };
