import './App.css'; 

// Components
import NabVar from './components/NavBar';
import PermissionList from './components/PermissionList';
// import AllPermissions from './components/AllPermissions';


function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
        <NabVar />
        <PermissionList />
      {/* </header> */}
    </div>
  );
}

export default App;
