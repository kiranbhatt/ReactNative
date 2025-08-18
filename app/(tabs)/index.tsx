import { registerRootComponent } from "expo";
import React from "react";
import AuthScreen from "../(screens)/AuthScreen";

const App = () => {
  return <AuthScreen />;
};

registerRootComponent(App);
export default App;