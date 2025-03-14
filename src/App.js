import { useEffect, useState } from "react";
import "./index.css";
import "./App.css";

const Header = ({ resetView }) => {
  const handleLogoClick = (e) => {
    e.target.classList.add("spin");
    setTimeout(() => e.target.classList.remove("spin"), 1000);
    resetView();
  };

  return (
    <header id="main-header">
      <img
        src="repentlogo.png"
        alt="Repentance and Holiness"
        onClick={handleLogoClick}
      />
      <br/>
      <span className="heading">
        <strong>ONGATA RONGAI MAIN ALTAR</strong>
      </span>
    </header>
  
  );
};

const DisplayAcc = (account, setActiveAccount) => {
  setActiveAccount(account);
};

const Content = ({ setActiveAccount }) => {
  const accounts = ["ACCOUNT 1", "ACCOUNT 2", "ACCOUNT 3", "ACCOUNT 4"];
  const contacts = ["CONTACT 1", "CONTACT 2", "CONTACT 3", "CONTACT 4"];

  useEffect(() => {
    const handleScroll = () => {
      const account1 = document.getElementById("account-1");
      const header = document.getElementById("main-header");
      const caption = document.querySelector("caption");
      const thead = document.querySelector("thead");

      if (account1) {
        const rect = account1.getBoundingClientRect();
        if (rect.top <= header.offsetHeight + caption.offsetHeight) {
          header.classList.add("blurred");
          caption.classList.add("blurred");
          thead.classList.add("blurred");
        } else {
          header.classList.remove("blurred");
          caption.classList.remove("blurred");
          thead.classList.remove("blurred");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="content">
      <table id="accncont">
        <caption>
          <h2>ACCOUNTS & CONTACTS</h2>
        </caption>

        <thead>
          <tr>
            <th className="heads">ACCOUNTS</th>
            <th>CONTACTS</th>
          </tr>
        </thead>

        <tbody className="buttons">
          {accounts.map((acc, index) => (
            <tr key={index}>
              <td>
                <span
                  id={index === 0 ? "account-1" : ""}
                  onClick={() => DisplayAcc(acc, setActiveAccount)}
                >
                  {acc}
                </span>
              </td>
              <td>
                <span>{contacts[index]}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

const AccountDetails = ({ account, resetView }) => (
  <div className="account-details">
    <h2>{account}</h2>
    <p>Details for {account} will be displayed here.</p>
    <button onClick={resetView}>Go Back</button>
  </div>
);

function App() {
  const [activeAccount, setActiveAccount] = useState(null);

  const resetView = () => setActiveAccount(null);

  return (
    <div className="App">
      <Header resetView={resetView} />
      {activeAccount ? (
        <AccountDetails account={activeAccount} resetView={resetView} />
      ) : (
        <Content setActiveAccount={setActiveAccount} />
      )}
    </div>
  );
}

export default App;
