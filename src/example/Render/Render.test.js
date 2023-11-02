import React from "react";
import { render, screen } from "@testing-library/react";
import Render from "./index";

// describe：テストのタイトル
describe("レンダリング 体験", () => {
  // it：テストケース
  it("UIがレンダリングされていること", () => {
    // コンポーネントをレンダリングする関数
    render(<Render />);
    // debug()：レンダリングしたHTML構造を見ることができる。
    // screen.debug();

    /**
     * getByRole：htmlタグを検索し取得する。以下のリンクで指定方法の一覧がある。
     * https://github.com/A11yance/aria-query#elements-to-roles
     * 今回の場合は、h1タグを取得している。
     * screen.debug(screen.getByRole("heading"));
     */

    /**
     * expect：アサーションと言われているもの。実際にテストして判定する。マッチャーにアクセスできる。
     * expectの後のメソッド：マッチャーと言われているもの。
     * マッチャーの一覧：https://jestjs.io/docs/expect#expectvalue
     */

    expect(screen.getByRole("heading")).toBeTruthy(); // 存在しているか

    expect(screen.getAllByRole("button")[0]).toBeTruthy(); // getAllByRole：複数の場合配列が返される。
    expect(screen.getAllByRole("button")[1]).toBeTruthy();

    expect(screen.getByText("レッスン")).toBeTruthy(); // getByText()：テキストで検索し取得する。

    expect(screen.queryByText("レッスンやだ")).toBeNull(); // toBeNull()：ないか。Nullであるかどうか。

    expect(screen.getByTestId("copyright")).toBeTruthy(); // getByTestId()：テスト用のIdを付与できる。
  });
});
