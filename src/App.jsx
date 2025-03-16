import TinyMCE from "./components/tinymce/TinyMCE"


function App() {
  return (
    <>
         <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Hello, Tailwind CSS!</h1>
        <p className="text-gray-700">This is a simple example of using Tailwind CSS in a React project.</p>
        <TinyMCE />
      </div>
    </div>
    </>
  )
}

export default App
