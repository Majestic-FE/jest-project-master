/**
 * Reduxを使用したコンポーネントの結合テストは、Test用のStoreを作成する。
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import Redux from "./Redux";
import { configureStore } from "@reduxjs/toolkit";
import customCounterSlice from "../../features/customCounter/customCounterSlice";

describe("Reduxとコンポーネントの結合テスト", () => {
  let store;
  // テストケースごとにstoreをリセットする処理
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterSlice,
      },
    });
  });

  it("クリックごとに1ずつ増加され、表示される", async () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );

    // クリック3回分を指している。
    await userEvent.click(screen.getByText("+"));
    await userEvent.click(screen.getByText("+"));
    await userEvent.click(screen.getByText("+"));

    expect(screen.getByTestId("count-value")).toHaveTextContent("3");
  });

  it("クリックごとに1ずつ減少して、表示される", async () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );

    // クリック2回分を指している。
    await userEvent.click(screen.getByText("-"));
    await userEvent.click(screen.getByText("-"));

    expect(screen.getByTestId("count-value")).toHaveTextContent("-2");
  });

  it("入力された値がincrementByAmountで正常計算されている", async () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );

    // 29をタイプしていることを指している。
    await userEvent.type(screen.getByPlaceholderText("Enter"), "29");
    await userEvent.click(screen.getByText("IncrementByAmount"));
    expect(screen.getByTestId("count-value")).toHaveTextContent("29");
  });
});
