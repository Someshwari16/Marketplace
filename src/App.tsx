import Navbar from './components/Navbar';
import Header from './components/Header';
import FileUpload from './components/FileUpload';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Header />
      <main className="py-12">
        <FileUpload />
      </main>
    </div>
  );
}

export default App;