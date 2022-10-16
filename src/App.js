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
  const diff = eng.length - hun.length;
  const wordDiff = Math.floor(diff / 6.5);
  const symbol = wordDiff > 0 ? '+' : '-';

  function Smiley() {

    let src = neutral;
    const percent = Math.abs(diff / hun.length * 100);

    if(percent >= 15) {
      src = bad;
    }
    if(percent < 15) {
      src = poor;
    }
    if(percent < 10) {
      src = good;
    }
    if(percent < 5) {
      src = excellent;
    }

    console.log('percernt', percent);

    return (
      <img src={src} alt='smiley face indicator' />
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Studio700</h1>
      </header>
      <section className='Boxes'>
        <textarea onChange={(e)=>{setHun(e.target.value)}}></textarea>
        <textarea onChange={(e)=>{setEng(e.target.value)}}></textarea>
      </section>
      <Smiley />

      <p>
        {wordDiff !== 0 && <>{symbol}{Math.abs(wordDiff)} Szó </>}
        {wordDiff === 0 && <>~ 0 </>}
        különbség ({Math.abs(diff)} karakter)
      </p>
    </div>
  );
}

export default App;
