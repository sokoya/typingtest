import { BrowserRouter, Routes, Route } from "react-router-dom"


import { Navbar, Footer } from "./components"
import { Welcome, Challenge } from "./routes"

const App = () => {
  
  return (
	  <div className="min-h-screen">
		  <div className="gradient-bg-welcome">
			<Navbar />
				<BrowserRouter>
					<Routes>
						<Route index element={<Welcome />} />
						<Route path="/challenge" element={<Challenge />} />
					</Routes>	
				</BrowserRouter>
			<Footer />
	  	</div>
	  </div>
  )
}

export default App
