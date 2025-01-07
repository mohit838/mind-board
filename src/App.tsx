import { DragAndDrop } from './components/dragAndDrop';
import Title from './components/title';

function App() {
  return (
    <div className="container flex flex-col items-center justify-start min-h-screen mx-auto gap-5">
      <Title />
      <DragAndDrop />
    </div>
  );
}

export default App;
