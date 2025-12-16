import { useState,useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8);
  const [numallowed, setnumallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [password, setpassword] = useState("");

  //useRef hook to reference the password input field
  const passwordRef = useRef(null);


  const passwordgen =useCallback(() => {
    let  str= "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (charallowed) {
      str +="!%'()&$#*+,-./:;<=>?@[\]^_`{|}~";
    }
    if (numallowed) {
      str += "0123456789";
    }

    let pass = "";   
    for (let i = 1; i <=length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      pass += str[randomIndex];
    }
    setpassword(pass);
  }, [length,charallowed, numallowed,setpassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password)
  }, [password]);
    
  useEffect(() => {
    passwordgen();
  }, [length, charallowed, numallowed, passwordgen]);

  return (
    <>
    <div className="w-full max-w-2xl mx-auto shadow-2xl rounded-2xl px-8 py-10 my-20 bg-gray-800 text-orange-500 scale-105 transition-transform duration-300">
  <h1 className="text-white text-3xl text-center mb-6 font-semibold tracking-wide">
    Password generator
  </h1>

  <div className="flex shadow-lg rounded-lg overflow-hidden mb-8">
    <input
      type="text"
      value={password}
      className="outline-none w-full py-5 px-4 text-green-500 bg-gray-900 text-xl"
      placeholder="Password"
      readOnly
      ref={passwordRef}
    />
    <button
      onClick={copyPasswordToClipboard}
      className="outline-none bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-all duration-200 text-white px-6 py-2 font-semibold shadow-md"
    >
      Copy
    </button>
  </div>

  <div className="flex flex-wrap justify-between items-center text-base gap-y-4">
    <div className="flex items-center gap-x-3">
      <input
        type="range"
        min={6}
        max={20}
        value={length}
        className="cursor-pointer accent-blue-500 w-40"
        onChange={(e) => setlength(e.target.value)}
      />
      <label className="font-medium">Length: {length}</label>
    </div>

    <div className="flex items-center gap-x-2">
      <input
        type="checkbox"
        defaultChecked={numallowed}
        id="numberInput"
        onChange={() => setnumallowed((prev) => !prev)}
        className="cursor-pointer accent-orange-500 w-5 h-5"
      />
      <label htmlFor="numberInput" className="font-medium">
        Numbers
      </label>
    </div>

    <div className="flex items-center gap-x-2">
      <input
        type="checkbox"
        defaultChecked={charallowed}
        id="charInput"
        onChange={() => setcharallowed((prev) => !prev)}
        className="cursor-pointer accent-orange-500 w-5 h-5"
      />
      <label htmlFor="charInput" className="font-medium">
        Characters
      </label>
    </div>
  </div>
</div>

   
    </>
  )
}

export default App
