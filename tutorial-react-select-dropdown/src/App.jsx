import ReactSelect from "./components/ReactSelect";
import "./index.css";

function App() {
  return (
    <div className="container">
      <h1>Membuat Dropdown menggunakan Library react-dropdown</h1>
      <ul>
        <h4>Requiretmens</h4>
        <li>Menampilkan nama dengan Urutan ascending</li>
        <li>Tampilkan dalam dropdown menu</li>
        <li>Terdapat fitur search secara real time</li>
      </ul>
      <ReactSelect />
    </div>
  );
}

export default App;
