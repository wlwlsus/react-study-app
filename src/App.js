import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [seed, setSeed] = useState(0);
  const [coinPrice, setCoinPrice] = useState(0);

  const handle = (pr) => {
    setCoinPrice(pr.target.value);
  };
  const onSeedChange = (prev) => {
    setSeed(prev.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=100")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      <label htmlFor="seed">Your Seed : </label>
      <input
        onChange={onSeedChange}
        type="number"
        id="seed"
        placeholder="Write your amount"
      ></input>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={handle}>
          <option>- 코인을 선택하세요. - </option>
          {coins.map((coin, index) => {
            const price = coin.quotes.USD.price;
            return (
              <option key={index} value={price}>
                {index + 1}. {coin.name} ({coin.symbol}) : ${price} USD
              </option>
            );
          })}
        </select>
      )}
      <h1>구입 가능한 코인 수 : {coinPrice ? seed / coinPrice : 0}개!</h1>
    </div>
  );
}

export default App;
