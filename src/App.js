
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [boxShadow, setBoxShadow] = useState('');
  const [choose, setChoose] = useState(0);
  const [array, setArray] = useState([{
    shiftRight: 0,
    shiftDown: 0,
    spread: 0,
    blur: 0,
    opacity: 0,
    inset: null,
    backgroundColor: 'rgba(255,0,0,0)',
    color: 'rgba(0, 217, 255,1)',
    boxShadowColor: 'rgba(255,0,0,0.34)',
  }
  ])
  const [properties, setProperties] = useState({
    shiftRight: 0,
    shiftDown: 0,
    spread: 0,
    blur: 0,
    opacity: 0,
    inset: null,
    backgroundColor: 'rgba(255,0,0,0)',
    color: 'rgba(0, 217, 255,1)',
    boxShadowColor: 'rgba(255,0,0,0.34)',
  });
  const changeValue = (e) => {
    if (e.target.name !== 'inset' && e.target.name !== 'backgroundColor' && e.target.name !== 'color' && e.target.name !== 'boxShadowColor' && e.target.name !== 'opacity') {
      setProperties({
        ...properties,
        [e.target.name]: e.target.value
      })
    }
    else if (e.target.name === 'inset') {
      setProperties({
        ...properties,
        [e.target.name]: e.target.checked
      })
    }
    else if (e.target.name === 'backgroundColor') {
      const r = parseInt(e.target.value.substr(1, 2), 16)
      const g = parseInt(e.target.value.substr(3, 2), 16)
      const b = parseInt(e.target.value.substr(5, 2), 16)
      setProperties({
        ...properties,
        [e.target.name]: `rgb(${r},${g},${b})`
      })
    }
    else if (e.target.name === 'color') {
      const r = parseInt(e.target.value.substr(1, 2), 16)
      const g = parseInt(e.target.value.substr(3, 2), 16)
      const b = parseInt(e.target.value.substr(5, 2), 16)
      setProperties({
        ...properties,
        [e.target.name]: `rgb(${r},${g},${b})`
      })
    }
    else if (e.target.name === 'opacity') {
      const boxShadowColor = properties.boxShadowColor.split(',');
      boxShadowColor[3] = e.target.value / 100;
      setProperties({
        ...properties,
        'boxShadowColor': boxShadowColor.join(',') + ')',
        [e.target.name]: e.target.value
      })
    }
    else if (e.target.name === 'boxShadowColor') {
      const r = parseInt(e.target.value.substr(1, 2), 16)
      const g = parseInt(e.target.value.substr(3, 2), 16)
      const b = parseInt(e.target.value.substr(5, 2), 16)
      setProperties({
        ...properties,
        [e.target.name]: `rgba(${r},${g},${b},${properties.opacity / 100})`
      })
    }
    array[choose] = {
      ...array[choose],
      ...properties
    }
    run()
  }
  const removeLayer = (id) => {
    if (array.length > 1) {
      const newArray = array.filter((item, index) => index !== id);
      setArray(newArray);
    }
  }
  const addLayer = () => {
    setArray([...array, properties]);
  }
  const run = () => {
    let boxShadow = '';
    array.forEach((item, index) => {
      boxShadow += `${item.boxShadowColor} ${item.shiftRight}px ${item.shiftDown}px ${item.spread}px ${item.blur}px ${item.inset ? 'inset' : ''}`;
      if (index !== array.length - 1) {
        boxShadow += ', ';
      }
    }
    )
    setBoxShadow(boxShadow);
  }
  useEffect(() => { run() }, [array, boxShadow])
  return (
    <div className="App">
      <div className="custom">
        <h1>Box-Shadow CSS Generator</h1>
        <div className="custom__item">
          <p>Shift right</p>
          <input type="range" min={-50} max={50} value={properties.shiftRight} name="shiftRight" onChange={changeValue} className="range" />
        </div>
        <div className="custom__item">
          <p>Shift down</p>
          <input type="range" min={-50} max={50} value={properties.shiftDown} name="shiftDown" onChange={changeValue} className="range" />
        </div>
        <div className="custom__item">
          <p>Spread</p>
          <input type="range" min={0} max={100} value={properties.spread} name="spread" onChange={changeValue} className="range" />
        </div>
        <div className="custom__item">
          <p>Blur</p>
          <input type="range" min={0} max={100} value={properties.blur} name="blur" onChange={changeValue} className="range" />
        </div>
        <div className="custom__item">
          <p>Opacity</p>
          <input type="range" min={0} max={100} value={properties.opacity} name="opacity" onChange={changeValue} className="range" />
        </div>
        <div className="custom__checkbox">
          <input type="checkbox" name='inset' onChange={changeValue} className="color" />
          <p>Inset</p>
        </div>
        <input type="color" name='boxShadowColor' onChange={changeValue} value="#ff0000" />
        <button className='button' onClick={addLayer}>Add Layer</button>

              <div className="layers" >
                {array.map((item, index) => {
                  return (
                        <div className="layer" key={index} >

                          <div className={choose === index ? "layer__item active" : "layer__item"} onClick={() => {
                            setChoose(index)
                            setProperties(item)
                          }}>
                            <p className='layer__item__p'>{item.shiftRight} {item.shiftDown} {item.spread} {item.blur} {item.boxShadowColor}</p>
                            <div className="remove">
                              <button className='button__remove' onClick={() => {
                                removeLayer(index)
                              }}>X</button>
                            </div>
                          </div>
                        </div>
                  )
                })}
              </div>
      </div>
      <div className="review">
        <div className="review-box">
          <div className="review-box__top">
            <div className="review-box__top-left">
              <h1>Preview</h1>
            </div>
            <div className="review-box__top-right">
              <div className="review-box__top-right__color">
                <input type="color" name='backgroundColor' onChange={changeValue} value="#ffffff" className="color" />
                <input type="color" name='color' onChange={changeValue} value="#00d9ff" className="color" />
              </div>
            </div>
          </div>

          <div className="review-box__bottom" style={{
            backgroundColor: properties.backgroundColor,
          }}>
            {/* absolute */}

            <div className="review-box__bottom__box" style={{
              backgroundColor: properties.color,
              boxShadow: `${boxShadow}`,
            }}>

            </div>
          </div>
        </div>
        <div className="review-box-csscode">
          <h1>CSS Code</h1>
          <p>
            {/* {`box-shadow: ${properties.boxShadowColor} ${properties.shiftRight}px ${properties.shiftDown}px ${properties.spread}px ${properties.blur}px ${properties.inset ? 'inset' : ''};`} */}
            {`box-shadow: ${boxShadow};`}
          </p>
          {/* {boxShadow} */}
        </div>
      </div>
    </div>
  );
}

export default App;
