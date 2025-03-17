import { useEffect , useState} from "react"
import TinyMCE from "./components/tinymce/TinyMCE"
import SearchableDropdown from "./components/UI/SearchableDropdown"
import 'react-select-search/style.css'
import { useDispatch } from "react-redux"
import authService from "./services/appwrite/auth"
import {login, logout} from "./store/authSlice"


function App() {

  const [loading, setLoading] = useState(true) 
  
  const dispatch = useDispatch();

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
    <>
        <SearchableDropdown />
        <TinyMCE />
    </>
  ): <div>Loading...</div>;
}

export default App
