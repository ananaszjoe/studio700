import { useState } from 'react';
import neutral from './0.png';
import bad from './1.png';
import poor from './2.png';
import good from './3.png';
import excellent from './4.png';
import './App.css';

function App() {
  const [hun, setHun] = useState('');
  const [eng, setEng] = useState('');
  const [lastChanged, setLastChanged] = useState('hun');

  const diff = Math.abs(eng.length - hun.length);
  const wordDiff = Math.floor(diff / 6.5);
  const symbol = wordDiff > 0 ? '+' : '-';

  const percent = Math.abs(diff / (lastChanged === 'hun' ? eng.length : hun.length) * 100);
  let score = 0;

  const limits = {
    eng: [15, 10, 5],
    hun: [30, 21, 12]
  }

  const currentLimits = eng.length < hun.length ? limits.eng : limits.hun;
  
  if(percent >= currentLimits[0]) {
    score = 1;
  }
  if(percent < currentLimits[0]) {
    score = 2;
  }
  if(percent < currentLimits[1]) {
    score = 3;
  }
  if(percent < currentLimits[2]) {
    score = 4;
  }
  if(hun === '' || eng === '') {
    score = 0;
  }

  const scrs = [neutral, bad, poor, good, excellent];
  const colors = ['#acc9e1', '#ff3600', '#ffb400', '#b3ee00', '#00df00'];

  function Smiley() {

    return (
      <img src={scrs[score]} alt='smiley face indicator' />
    )
  }

  function Bar() {
    return (
      <span className='Bar' style={{ verticalAlign: 'middle', margin: '0 16px', display: 'inline-block', backgroundColor: colors[score], height: 20, width: 20 + Math.min(100, diff)}} />
    )
  }

  const handleHunChange = (e) => {
    setHun(e.target.value);
    setLastChanged('hun');
  }
  const handleEngChange = (e) => {
    setEng(e.target.value);
    setLastChanged('eng');
  }

  const Wording = () => (
    <>
      {wordDiff !== 0 && <>{symbol}{Math.abs(wordDiff)} szó </>}
      {wordDiff === 0 && <>~ 0 szó</>}
      különbség ({Math.abs(diff)} karakter)
      {eng.length < hun.length ? ' az angolhoz' : ' a magyarhoz'} képest
    </>
  )

  return (
    <div className="App">
      <header className="App-header">
        <h1>Studio700</h1>
      </header>
      <section className='Boxes'>
        <textarea onChange={handleEngChange} placeholder='English'></textarea>
        <textarea onChange={handleHunChange} placeholder='Magyar'></textarea>
      </section>

      <div className="result">
        <div className="fifty">
          <p>
            {eng.length >= hun.length && (
              <>
                <Wording />
                <Bar />
              </>
            )}
          </p>
        </div>
        <Smiley />
        <div className="fifty">
          <p>
            {eng.length < hun.length && (
              <>
                <Bar />
                <Wording />
              </>
            )}
          </p>
        </div>
        
      </div>
    </div>
  );
}

export default App;
