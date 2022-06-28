import { useState } from "react";
import styles from "./App.module.css";
import headerImage from "./assets/powered.png";
import leftArrowImage from "./assets/leftarrow.png";
import { GridItem } from "./components/GridItem/index";

import { levels, calculadoraImc, Level } from "./helpers/imc";

const App = ()=> {
  const [campoAltura, setCampoAltura] = useState<number>(0)
  const [campoPeso, setCampoPeso] = useState<number>(0)
  const [mostreItem, setMostreItem] = useState<Level | null>(null)

  const calcularButton = ()=> {
    if(campoAltura && campoPeso){
      setMostreItem(calculadoraImc( campoAltura, campoPeso ))
    }else{
      alert('Digite todos os campos!')
    }
  }

  const buttonFechar = ()=> {
    setCampoAltura(0)
    setCampoPeso(0)
    setMostreItem(null)
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={headerImage} alt="" width={150} />
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

          <input type="number" placeholder="Digite a sua altura. Exp 1.5 (em métros)"
            value={campoAltura > 0 ? campoAltura : ''} 
            onChange={e => setCampoAltura(parseFloat( e.target.value ))}
            disabled={mostreItem ? true : false}
          />

          <input type="number" placeholder="Digite a seu peso. Exp 75.3 (em kg)" 
            value={campoPeso > 0 ? campoPeso : ''} 
            onChange={e => setCampoPeso(parseFloat( e.target.value ))}
            disabled={mostreItem ? true : false}
          />

          <button onClick={calcularButton} disabled={mostreItem ? true : false}>Calcular</button>         
        </div>

        <div className={styles.rightSide}>
          {!mostreItem &&
            <div className={styles.grid}>
              {levels.map((item, key)=> ( <GridItem key={key} item={item} /> ))}
            </div>
          }
          {mostreItem &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={buttonFechar}>
                <img src={leftArrowImage} alt="VOLTAR" width={25} />
              </div>
              <GridItem item={mostreItem} />
            </div>
          }
        </div>

      </div>
    </div>
  )
}

export default App