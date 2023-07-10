import Left from "./components/Left";
import Right from "./components/Right";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Left />
        <Right />
      </div>
    </Provider>
  );
}

export default App;
