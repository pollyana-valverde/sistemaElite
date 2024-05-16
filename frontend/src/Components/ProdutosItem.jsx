import {React, useState} from 'react';

const ProdutosItem = ({produto, onDelete }) => {
  return (

      <tr key={produto.idCarro}>
        <td>{produto.idCarro}</td>
        <td>{produto.Marca}</td>
        <td>{produto.Modelo}</td>
        <td>{produto.classificacao}</td>
        <td>{produto.cor}</td>
        <td>{produto.anoFabricacao}</td>
        <td>{produto.potencia}</td>
        <td>{produto.tipoMotor}</td>
        <td>{produto.tipoTransmissao}</td>
        <td>{produto.numeroIdentificacao}</td>
        <td>{produto.valor}</td>
        <td>
          <button onClick={() => onDelete(produto.idCarro)}>Excluir</button>
        </td>
      </tr>
    
  );
};

export default ProdutosItem;