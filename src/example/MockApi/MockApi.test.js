import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { rest } from "msw";
import { setupServer } from "msw/node";
import MockApi from "./MockApi";

// 疑似サーバーを作っている。仮想APIでやりとりする。
// req：URIのパラメータとして使用
// res：レスポンス
// ctx：オブジェクトの内容
const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        username: "Bred Dummy",
      })
    );
  })
);

// テストファイルで最初に一度だけ実行されるメソッド
// ここでサーバーを起動する
beforeAll(() => server.listen());
// 各テストケースが終わるたびに実行されるメソッド
// 各テストごとでリセットする動作
afterEach(() => {
  server.resetHandlers();
});
// テストファイルで最後に一度だけ実行されるメソッド
// サーバーを閉じる動作
afterAll(() => server.close());

describe("モックAPIのテスト", () => {
  it("フェッチに成功した上で、フェッチしたデータを正しく表示し、ボタンを無効になる", async () => {
    render(<MockApi />);
    await userEvent.click(screen.getByRole("button"));

    // toHaveTextContent()：パラメータの文字と一致するか
    expect(await screen.findByRole("heading")).toHaveTextContent("Bred Dummy");

    // toHaveAttribute()：引数の属性があるかどうか　今回の場合はbuttonがdisabledか
    expect(screen.getByRole("button")).toHaveAttribute("disabled");
  });

  test("フェッチが失敗した時、エラーメッセージが表示され、ヘッダーは表示せずボタンは有効になる", async () => {
    // use()：サーバーの内容を変える。テストケースの中でのみ有効になる。　今回はレスポンス内容をエラーにする
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/users/1",
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );
    render(<MockApi />);
    await userEvent.click(screen.getByRole("button"));
    expect(await screen.findByTestId("error")).toHaveTextContent(
      "Fetching Failed !"
    );

    expect(screen.queryByRole("heading")).toBeNull();
    expect(screen.getByRole("button")).not.toHaveAttribute("disabled");
  });
});
