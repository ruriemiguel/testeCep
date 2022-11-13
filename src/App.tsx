import { ChangeEvent, useEffect, useState } from 'react';
import { render } from 'react-dom';
import './App.css';
import { CEPInterface } from './model/Cep';
import { busca } from './service/Service';

function App() {
  const [cep, setCep] = useState<CEPInterface>({
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: '',
  });

  async function getCep() {
    try {
      await busca(`/${cep.cep}/json`, setCep);

      console.log(cep);
    } catch (error) {
      alert('cep invalido');
    }
  }

  function updateCep(event: ChangeEvent<HTMLInputElement>) {
    setCep({
      ...cep,
      [event.target.name]: event.target.value,
    });
  }

  function clear() {
    setCep({
      ...cep,
      cep: '',
      logradouro: ''
    })
    
  }

  useEffect(() => {
    if (cep.cep.length >= 8) {
      getCep();
    }
  }, [cep.cep]);

  return (
    <div className="flex justify-center flex-col items-center h-[100vh] p-0 m-0 bg-blue-300">
      <h1 className="font-bold text-4xl mb-4">Pesquise aqui o CEP</h1>
      <div className="flex flex-col w-48">
        {/* <label className="text-lg font-bold">CEP</label> */}
        <input
          required
          autoFocus={cep.cep === ''}
          type="text"
          name="cep"
          placeholder='CEP'
          className="border-blue-800 border-2 rounded-lg px-4 py-2 font-bold text-slate-800 tracking-widest font-mono text-2xl"
          id="cep"
          value={cep.cep}
          onChange={(event: ChangeEvent<HTMLInputElement>) => updateCep(event)}
        />
      </div>

      {cep.logradouro !== '' && 
      <div className="w-[50vw] flex flex-col justify-center items-center gap-4 mt-4 lightSpeedIn">
        <h2 className='font-bold text-2xl text-slate-800'>Endereço completo:</h2>
        <p className='font-thin font-serif text-slate-900 tracking-wide text-xl w-fit'>{cep.logradouro}, {cep.complemento !== '' && <span>{cep.complemento},</span>} Bairro: {cep.bairro}</p>
        <p className='font-thin font-serif text-slate-900 tracking-wide text-xl'>Cidade: {cep.localidade} - {cep.uf}</p>
        <button className='p-2 rounded-lg bg-blue-800 hover:bg-blue-900 text-slate-100 hover:text-white' onClick={clear}>Nova pesquisa</button>
      </div>}
    </div>
  );
}

export default App;
