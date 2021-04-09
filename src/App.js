import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import MainContainer from "./components/main-container.jsx";
import "./less/App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <MainContainer />
      <Footer />
    </div>
  );
}

export default App;
