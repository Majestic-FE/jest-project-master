import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./Input";

describe("レンダリング確認", () => {
  // test：itと同義。
  test("正しくレンダリングされている", () => {
    render(<Input />);

    expect(screen.getByRole("button")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter")).toBeTruthy(); // getByPlaceholderText()：placeholderで検索し取得。
  });
});

describe("onChangeイベントの確認", () => {
  test("インプットの値が正しく更新されている", async () => {
    //const user = userEvent.setup();
    render(<Input />);
    const inputValue = screen.getByPlaceholderText("Enter");
    //await user.type(inputValue, "test");

    // userEvent：RTLのメソッド。基本的なユーザーの振る舞いを指定できる。非同期で記述する必要がある。
    // type()：タイピングのシュミレート。
    await userEvent.type(inputValue, "おはこんばんは");
    expect(inputValue.value).toBe("おはこんばんは");
  });
});

describe("propsの関数が呼び出されるか確認", () => {
  test("onConsoleが呼び出されない", async () => {
    // jest.fn()：モックの関数(ダミー関数)。
    const onConsole = jest.fn();
    render(<Input onConsole={onConsole} />);

    await userEvent.click(screen.getByRole("button")); // click()：クリックイベントのシュミレート。

    // not：否定　関数によく使用される toHaveBeenCalled()：呼ばれるか。
    // この場合は、呼ばれないかどうかテストしている。
    expect(onConsole).not.toHaveBeenCalled();
  });
  test("onConsoleが1度呼ばれる", async () => {
    const onConsole = jest.fn();
    render(<Input onConsole={onConsole} />);
    const inputValue = screen.getByPlaceholderText("Enter");

    await userEvent.type(inputValue, "test");
    await userEvent.click(screen.getByRole("button"));

    // toHaveBeenCalledTimes（）：呼ばれる回数
    expect(onConsole).toHaveBeenCalledTimes(1);
  });
});
