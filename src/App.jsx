import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currencyOne, setCurrencyOne] = useState("THB");
  const [currencyTwo, setCurrencyTwo] = useState("USD");
  const [amountOne, setAmountOne] = useState(1);
  const [amountTwo, setAmountTwo] = useState(0);
  const [rateText, setRateText] = useState("");
  const [allCurrencies, setAllCurrencies] = useState([]);

  const API_KEY = "89ac95a6545f6398ad89e316"; /* API key */

  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currencyOne}`)
      .then(res => res.json())
      .then(data => {
        if (data.result === "success") {
          const rate = data.conversion_rates[currencyTwo];
          if (allCurrencies.length === 0) {
            setAllCurrencies(Object.keys(data.conversion_rates));
          }
          setAmountTwo((amountOne * rate).toFixed(2));
          setRateText(`1 ${currencyOne} = ${rate.toFixed(4)} ${currencyTwo}`);
        }
      })
  }, [currencyOne, currencyTwo, amountOne]);

  const handleSwap = (e) => {
    if (e) e.preventDefault();
    setCurrencyOne(currencyTwo);
    setCurrencyTwo(currencyOne);
  };

  return (
    <div className="mobile-screen">
      <div className="header">
        <button className="back-btn">‹</button>
        <span className="header-title">Pay</span>
        <button className="menu-btn">∷</button>
      </div>

      <div className="card-container">
        <form onSubmit={handleSwap}>
          {/* ช่องกรอกเงินต้นทาง */}
          <div className="input-group top-group">
            <label>Amount (From)</label>
            <div className="input-row">
              <select value={currencyOne} onChange={(e) => setCurrencyOne(e.target.value)}>
                {allCurrencies.map(cur => <option key={cur} value={cur}>{cur}</option>)}
              </select>
              <input type="number" value={amountOne} onChange={(e) => setAmountOne(e.target.value)} />
            </div>
          </div>

          {/* อัตราแลกเปลี่ยนตรงกลาง */}
          <div className="rate-display">
            <div className="rate-badge">{rateText}</div>
          </div>

          {/* ช่องผลลัพธ์ปลายทาง */}
          <div className="input-group bottom-group">
            <label>Converted Amount (To)</label>
            <div className="input-row">
              <select value={currencyTwo} onChange={(e) => setCurrencyTwo(e.target.value)}>
                {allCurrencies.map(cur => <option key={cur} value={cur}>{cur}</option>)}
              </select>
              <input type="number" value={amountTwo} readOnly className="result-input" />
            </div>
          </div>

          <button type="submit" className="main-submit-btn">สลับสกุลเงิน (Enter)</button>
        </form>
      </div>
    </div>
  )
}

export default App