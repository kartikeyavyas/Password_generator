import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {

  const [length,setLength] = useState(8);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const [Password,setPassword] = useState("");

  const passwordref = useRef(null)
  const GeneratePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed){
      str += "0123456789";
    }

    if(charAllowed){
      str+="!@#$%^&*|-";
    }

    for(let i=1;i<length;i++){
      let char = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  },
  [length,numberAllowed,charAllowed])

  const copyPasswordToClipbord = useCallback(()=> {
    passwordref.current?.select()
    window.navigator.clipboard.writeText(Password)
  },[Password])
  useEffect(() => {
    GeneratePassword();
  },[length,numberAllowed,charAllowed]);

  return (
    <>

      <div className='box'>

      <h1 className='hed'>Password Generator</h1>

      <input type="text"
      readOnly
      value={Password}
      ref={passwordref} 
      placeholder='password'/>

      <div>
      <input type="range"
      className='range'
      min={6}
      max={100}
      value={length} 
      onChange={(e)=>{
        setLength(e.target.value);
      }}/>
       <label className='lab1'>Length : {length}</label>
      </div>
      
      <button className='btn' onClick={copyPasswordToClipbord} >Click</button>

      <div>
      <input type="checkbox" 
      className='chbox'
      id='numberinput'
      defaultChecked={numberAllowed}
      onChange={()=>{setNumberAllowed((prev) =>!prev)}} />
      <label className='lab2'>Numbers</label>
      </div>

      <div>
      <input type="checkbox" 
      className='chbox1'
      id='numberinput'
      defaultChecked={charAllowed}
      onChange={()=>{setCharAllowed((prev) =>!prev)}} />
      <label className='lab3'>Characters</label>
      </div>

      </div>
      
    </>
  )
 

  }

export default App
