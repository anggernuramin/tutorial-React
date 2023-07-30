import Title from "./components/Title";
import FirstRequest from "./MethodAxios/RequestGET";
import Headers from "./MethodAxios/RequestHeaders";
import PostRequest from "./MethodAxios/RequestPost";
import GlobalInstance from "./MethodAxios/GlobalInstance";
import CustomInstance from "./MethodAxios/CustomInstance";
import PutRequest from "./MethodAxios/RequestPut";
import Interceptors from "./MethodAxios/Interceptors";

function App() {
  return (
    <main>
      <Title />
      <FirstRequest />
      <Headers />
      <PostRequest />
      <GlobalInstance />
      <CustomInstance />
      <PutRequest />
      <Interceptors />
    </main>
  );
}

export default App;
