import { TextProcessor } from "./components/TextProcessor";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";

function App() {
  return (
    <ErrorBoundary>
      <TextProcessor />
      <Footer />
    </ErrorBoundary>
  );
}

export default App;
