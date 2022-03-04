import './App.css';
import Main from './components/Main'
import Header from './components/Header'
import { TodoProvider } from './components/hooks'

function App(){
  return (
    <TodoProvider>
      <Header />
      <Main />
    </TodoProvider>
  )
}

export default App