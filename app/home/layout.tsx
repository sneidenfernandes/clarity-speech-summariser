import Navbar from '../components/Navbar';
import "../globals.css"
import { DeleteContextProvider } from '../context/deleteContext';
import { VeiwContextProvider } from '../context/viewContext';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
  return (

      <DeleteContextProvider>
      <VeiwContextProvider>
        <div className='bg-zinc-500 w-full overflow-x-auto min-h-screen relative'>
            <Navbar />
            <main className='p-5 '>
              {children}
            </main>
        </div>
        </VeiwContextProvider>
    </DeleteContextProvider>

    
        
  );
}