import Navbar from "../../../components/navbar/Navbar";
import styles from "./Prova.module.css";

import axios from "axios";
import api from "../../../api";
import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Prova = () => {
  const [provaData, setProvaData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [resposta, setResposta] = useState([])

  // const handleCheckboxChange = (event, index, idx) => {
  //   const { name, checked } = event.target;
  //   setSelectedOptions(prevState => ({
  //     ...prevState,
  //     [name]: {
  //       alternativa: checked ? provaData[index].perguntas[idx].alternativas : '',
  //       correta: provaData[index].perguntas[idx].respostaCerta
  //     }
  //   }));
  // };

  const request = async () => {
    try {
      const response = await axios.get(`${api}/provas/Prova/1`, {
        params: {
          percentage: "100"
        }
      });

      if (response && response.data && Array.isArray(response.data)) {
        const conteudoProva = response.data[0];
        const formattedData = JSON.parse(conteudoProva.conteudo_prova).map((item) => ({
          enunciado: item.Enunciado,
          perguntas: item.perguntas.map((pergunta) => ({
            alternativas: pergunta.alternativas,
            respostaCerta: pergunta.respostaCerta
          }))
        }));

        setProvaData(formattedData);
      } else {
        console.error("Dados da API estão em um formato inválido:", response);
      }
    } catch (error) {
      console.error("Erro ao obter os dados da API:", error);
    }
  };

  useEffect(() => {
    request();
  }, []);

  // const EnviarResposta = async () => {
  //   try {
    
  //     const response = await axios.get(`${api}/provas/verificar_resposta`, {
  //       params: {
  //         resposta: resposta
  //       }
  //     });
  //     // Aqui você deve implementar a lógica para verificar as respostas
  //     // e enviar para o backend para processamento
  //     toast.success("Resposta está correta.", { position: "top-right" });
  //   } catch (error) {
  //     console.error("Erro ao enviar dados:", error);
  //     toast.error("A alternativa está errada.", { position: "top-right" });
  //   }
  // };

  const handleClick = () => {
    setExecutarCodigo(true);
    // Coloque o código que você quer executar após o clique do botão aqui
    {Object.entries(selectedOptions).map(([key, value]) => (
      <li key={key}>
        {value.alternativa}
        {value.correta ? (
          <h1>Resposta correta</h1>
        ) : (
          <h1>Resposta errada</h1>
        )}
      </li>
    ))}

  };






  const [respostasEnviadas, setRespostasEnviadas] = useState(false);

  const handleCheckboxChange = (event, index, idx) => {
    const { name, checked } = event.target;
    setSelectedOptions(prevState => ({
      ...prevState,
      [name]: {
        alternativa: name,
        correta: checked
      }
    }));
  };





  const EnviarResposta = () => {
    setRespostasEnviadas(true);
  };


//   return (
//     <div className={styles.container}>
//       <Navbar />
//       <div className={styles.cont}>
//         {provaData.map((prova, index) => (
//           <div key={index}>
//             <h3>Questão {index + 1}: {prova.enunciado}</h3>
//             <ul>
//               {prova.perguntas.map((pergunta, idx) => (
//                 <li key={idx}>
//                   <label>
//                     <input type="checkbox" name={`questao_${index}_alternativa_${idx}`}
//                       onChange={(event) => handleCheckboxChange(event, index, idx)} />
//                     {pergunta.alternativas}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//       <button onClick={EnviarResposta}>Enviar Respostas</button>

//       <h4>Seleções do usuário:</h4>
//       <ul>
//         {Object.entries(selectedOptions).map(([key, value]) => (
//           <li key={key}>
//             {value.alternativa}
//             {value.correta ? (
//               <h1>Resposta correta</h1>
//             ) : (
//               <h1>Resposta errada</h1>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Prova;



return (
  <div className={styles.container}>
    <Navbar />
    <div className={styles.cont}>
      {provaData.map((prova, index) => (
        <div key={index}>
          <h3>Questão {index + 1}: {prova.enunciado}</h3>
          <ul>
            {prova.perguntas.map((pergunta, idx) => (
              <li key={idx}>
                <label>
                  <input type="checkbox" name={`questao_${index}_alternativa_${idx}`}
                    onChange={(event) => handleCheckboxChange(event, index, idx)} />
                  {pergunta.alternativas}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <button onClick={EnviarResposta}>Enviar Respostas</button>

    {respostasEnviadas && (
      <div>
        <h4>Seleções do usuário:</h4>
        <ul>
          {Object.entries(selectedOptions).map(([key, value]) => (
            <li key={key}>
              {value.alternativa}
              {value.correta ? (
                <h1>Resposta correta</h1>
              ) : (
                <h1>Resposta errada</h1>
              )}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);
}

export default Prova;