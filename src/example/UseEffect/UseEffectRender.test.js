import React from "react";
import { render, screen } from "@testing-library/react";
import UseEffectRender from "./UseEffectRender";

// useEffectのテスト方法
describe("useEffectのレンダリング確認", () => {
  test("非同期後、レンダリングされている", async () => {
    render(<UseEffectRender />);

    expect(screen.queryByText(/I am/)).toBeNull();

    // findByText：基本的にはgetBy~、queryBy~と機能は一緒。非同期の処理が終わるまで待ってくれる。
    expect(await screen.findByText(/I am/)).toBeInTheDocument();
  });
});
