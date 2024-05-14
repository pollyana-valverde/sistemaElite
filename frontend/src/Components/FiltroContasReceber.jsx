//Lista de Usuarios
import React from "react";
import axios from "axios";

const FiltroContasReceber = () => {

function filtroReceberBtn (){

    const selectValue = document.getElementById("filtroReceber").value;

    // console.log(selectValue)

        axios ({
            method:'GET',
            url: `http://localhost:3001/filtroContasReceber/${selectValue}`
        })
        .then(res =>{
            console.log(res.data);
        })
        .catch((error) =>{
            console.error(error)
        })
    }

    return (
        <>
            <div>
                <select id="filtroReceber">
                    <option selected>Open this select menu</option>
                    <option value="Pendente" >Pendente</option>
                    <option value="Baixado" >Baixado</option>
                </select>
                <button type="submit" onClick={filtroReceberBtn} id="btnFiltroReceber"  value="Pesquisa">Pesquisar</button>
            </div>
        </>
    );
};

export default FiltroContasReceber;
