import React from "react";
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import "./App.css";
import CustomHooks from "./example/HooksTest/CustomHooks";
import Input from "./example/Input/Input";
import List from "./example/List/List";
import MockServer from "./example/MockApi/MockApi";
import ReduxAsync from "./example/ReduxAsyncIntegration/ReduxAsync";
import Redux from "./example/ReduxIntegration/Redux";

function App() {
  const data = [
    {
      id: 0,
      name: "山本博",
    },
    {
      id: 1,
      name: "秋山竜次",
    },
    {
      id: 2,
      name: "馬場裕之",
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <span>Learn </span>
        <Input
          onConsole={(val) => {
            console.log("表示されたら成功です", val);
          }}
        />
        <List items={data} />
        <MockServer />
        <Redux />
        <ReduxAsync />
        <CustomHooks />
      </header>
    </div>
  );
}

export default App;
