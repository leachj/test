import { TaskList } from './components/TaskList';

function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#f7fafc', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ background: '#2b6cb0', color: '#fff', padding: '1rem 2rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>📋 Task Manager</h1>
      </header>
      <main style={{ maxWidth: '640px', margin: '2rem auto', padding: '0 1rem' }}>
        <TaskList />
      </main>
    </div>
  );
}

export default App;
