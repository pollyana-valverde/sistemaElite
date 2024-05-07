//Lista de Usuarios
import React from "react";
import axios from "axios";

const FiltroContasReceber = () => {
    // const [contasReceber, setContaReceber] = useState([]);

    // const handleFiltroReceber = async (status) => {
    //     try {
    //     //   await axios.select(`http://localhost:3001/contasReceber/${status}`);
    //       // Atualiza a lista de cliente após a exclusão
    //       const { data } = await axios.get(`http://localhost:3001/contasReceber/${status}`);
    //       setContaReceber(data);
    //       console.log("Cliente excluído com sucesso!");
    //     } catch (error) {
    //       console.error("Erro ao excluir cliente:", error);
    //     }
    //   };

function filtroReceberBtn (){
        axios ({
            method:'GET',
            url: `http://localhost:3001/contasReceber/`
        }).then(res =>{
            console.log(res.data);
        })
    }

    return (
        <>
            <div>
                <select >
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
