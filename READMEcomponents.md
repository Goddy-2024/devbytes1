#  Breakdown of Components
This React app consists of different functional components, each with its own role:

`Header` - Displays the header and resets the view when the logo is clicked.<br>
`Content` - Shows a list of accounts and contacts and handles scrolling effects.<br>
`AccountDetails `- Displays details of the selected account.<br>
`App` - The main component that combines all these components.<br>
## `Header Component`
jsx

    const Header = ({ resetView }) => {
    const handleLogoClick = (e) => {
    e.target.classList.add("spin");  // Adds the "spin" CSS class to the logo
    setTimeout(() => e.target.classList.remove("spin"), 1000);  // Removes "spin" after 1 second
    resetView();  // Calls the resetView function from props
    };
    return (
    <header id="main-header">
      <img
        src="repentlogo.png"
        alt="Repentance and Holiness"
        onClick={handleLogoClick} // When clicked, spins the logo and resets the view
      />
      <br />
      <span className="heading">
        <strong>ONGATA RONGAI MAIN ALTAR</strong>
      </span>
    </header>
    );
    };

### What does this component do?
*Displays a header with a logo*<br>
*When you click the logo, it spins for 1 second and resets the view*<br>

## `Content Component`
Inside Content Component
jsx

        const Content = ({ setActiveAccount }) => {
        const accounts = ["ACCOUNT 1", "ACCOUNT 2", "ACCOUNT 3", "ACCOUNT 4"];
        const contacts = ["CONTACT 1", "CONTACT 2", "CONTACT 3", "CONTACT 4"];
*accounts is an array containing account names*<br>
*contacts is an array containing matching contacts*<br>

## Scroll Effect Handling (useEffect)
jsx

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
### What does this do?
* useEffect runs when the component mounts<br>
* When the user scrolls, it checks if account-1 has moved under the header<br>
* If true, it adds a blur effect to the header and caption<br>
* When scrolled back up, it removes the blur effect<br>
* It also removes the event listener when the component unmounts (cleanup)<br>

## Table for Accounts and Contacts

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
                  onClick={() => setActiveAccount(acc)} // Fixed onClick function
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
### What does this do?
*Displays a table with two columns – one for accounts and one for contacts*<br>
*When an account is clicked, it updates the state by calling setActiveAccount(acc)*<br>

## `AccountDetails Component`

    const AccountDetails = ({ account, resetView }) => (
    <div className="account-details">
    <h2>{account}</h2>
    <p>Details for {account} will be displayed here.</p>
    <button onClick={resetView}>Go Back</button>
    </div>
    );

### What does this do?
* Displays the selected account name<br>
* Shows a placeholder message for account details<br>
* Has a "Go Back" button that resets the view<br>

## `Main App Component`

    function App() {
    const [activeAccount, setActiveAccount] = useState(null); // State to track the selected account

    const resetView = () => setActiveAccount(null); // Function to reset view

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
### What does this do?
* Defines state (activeAccount) to store the selected account<br>
* If an account is selected, it displays AccountDetails<br>
* If no account is selected, it shows the accounts list (Content)<br>
* The resetView function resets the view by setting activeAccount to null<br>




