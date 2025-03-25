import { useEffect , useState} from "react"
import TinyMCE from "./components/tinymce/TinyMCE"
import SearchableDropdown from "./components/UI/SearchableDropdown"
import 'react-select-search/style.css'
import { useDispatch } from "react-redux"
import authService from "./services/appwrite/auth"
import {login, logout} from "./store/authSlice"
import BlogForm from "./components/BlogForm/BlogForm"
import { Outlet } from "react-router-dom"
import { Container, Header , Footer } from "./components"
function App() {

  const [loading, setLoading] = useState(true) 
  
  const dispatch = useDispatch();

  //check if the user is logged in at the beginning
  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if(userData) {
        dispatch(login({userData}))
      }
      else {
        dispatch(logout())
      } 
      
    }).finally( setLoading(false))

  },[]);

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between  '>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet/> 
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App