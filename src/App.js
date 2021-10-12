import './App.css';
import Facet from './components/facet/facet';
function App() {
  return (
    <div className="App flex flex-col items-center align-center h-screen w-full justify-center">
     <Facet field="region"/>
     <Facet field="color"/>
    </div>
  );
}
export default App;
