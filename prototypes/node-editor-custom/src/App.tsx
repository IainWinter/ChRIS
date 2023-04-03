import './css/App.css';
import "./css/Node.css"
import { WNodeComponent } from './components/NodeComponent';

function App() {
  return (
    <div className="node-editor">
		<WNodeComponent />
		<WNodeComponent />
    </div>
  );
}

export default App;
