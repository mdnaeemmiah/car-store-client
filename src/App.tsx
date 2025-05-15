import MainLayout from "./components/layout/MainLayout";
// import ProtectedRoute from "./components/layout/sidevar/ProtectedRoute";

function App() {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
     {/* <ProtectedRoute> */}
     <MainLayout />
     {/* </ProtectedRoute> */}
    </div>
  );
}

export default App;
