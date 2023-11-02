/**
 * Reduxの結合テストでのAPIのテストは、今までのことを応用して、mockで擬似serverを作り、storeを作成してテストをする。
 */

import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import customCounterSlice from "../../features/customCounter/customCounterSlice";
import ReduxAsync from "./ReduxAsync";

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: "雰囲気ステラおばさん" }));
  })
);
beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

describe("モックAPIとReduxの結合テスト", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterSlice,
      },
    });
  });

  test("成功した場合、h1タグにユーザーネームが表示される", async () => {
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );
    expect(screen.queryByRole("heading")).toBeNull();
    await userEvent.click(screen.getByText("FETCHJSON"));

    expect(await screen.findByText("雰囲気ステラおばさん")).toBeInTheDocument();
  });

  test("失敗した場合、h1タグにanonymousが表示される", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/users/1",
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );
    expect(screen.queryByRole("heading")).toBeNull();
    await userEvent.click(screen.getByText("FETCHJSON"));

    expect(await screen.findByText("anonymous")).toBeInTheDocument();
  });
});
