import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";


import styles from "../App.module.css"
//import Footer from "./Footer";
//import Header from "./Header";


const BuscaCep = () => {

    const [cep, setCep] = useState<string>("");
    const [localidade, setLocalidade] = useState<string>("");
    const [uf, setUf] = useState<string>("");
    const [Erro, setErro] = useState<string>("")

    const findCep = (e: FormEvent) => {
        e.preventDefault();

        fetch('https://viacep.com.br/ws/' + cep + '/json/',
            {
                method: 'GET'
            }
        ).then(response => response.json())
            .then(
                data => {
                    setLocalidade(data.localidade);
                    setCep(data.cep);
                    setUf(data.uf);
                    setErro("");
                }
            ).catch(error => { 
                setErro("Pesquisa Inválida");
            });


    }

    const submitForm = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name = "cep") {
            setCep(e.target.value);
        }

    }
    return (
        <div>
           
            <main className={styles.main}>
            <form onSubmit={findCep}>
                <label htmlFor="cep">CEP</label>
                <input className={styles.in} type="text" name="cep" id="cep" onChange={submitForm} />
                <input className={styles.button4} type="submit" value="Pesquisar" />
            </form>
            

            <p>Cidade: {localidade} </p> 
            <p>Estado:{uf} </p> 
            <p>CEP: {cep}   </p> 
            <p className={styles.error}>{Erro}</p>
            </main>
            
        </div>
    );
}

export default BuscaCep