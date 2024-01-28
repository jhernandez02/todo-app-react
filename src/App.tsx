import { AppProvider } from "./contexts/AppContext";
import AppGuard from "./helpers/AppGuard";
import "./App.css";

function App() {
  return (
    <AppProvider>
      <AppGuard />
    </AppProvider>
  )
}

export default App;
