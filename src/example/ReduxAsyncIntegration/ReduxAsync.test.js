import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import customCounterSlice from "../../features/customCounter/customCounterSlice";

import ReduxAsync from "./ReduxAsync";

describe("Reduxの非同期テスト", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterSlice,
      },
    });
  });

  test("2秒後に100 + payloadの計算がされている", async () => {
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );

    await userEvent.click(screen.getByText("FETCHDUMMY"));
    expect(await screen.findByTestId("count-value")).toHaveTextContent("105");
  });
});
