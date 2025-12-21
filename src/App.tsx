import Header from './components/Header';
import Converter from './components/Converter';
import UrlUsage from './components/UrlUsage';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Header />
        <main className="mt-8">
          <Converter />
        </main>
        <UrlUsage />
      </div>
    </div>
  );
}

export default App;