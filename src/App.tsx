import './App.css';
import CalendarControls from './components/CalendarControls';
import ContextStoreProvider from './context/contextStore';
function App() {
  return (
    <div className="App">
      <ContextStoreProvider>
        <CalendarControls />
      </ContextStoreProvider>
    </div>
  );
}

export default App;
