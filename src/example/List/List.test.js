import React from "react";
import { render, screen } from "@testing-library/react";
import List from "./List";

describe("データがレンダリングされるかの確認", () => {
  it("データがないときは、No data! が表示される", () => {
    render(<List />);

    // toBeInTheDocument()：html構造の中に存在するか
    expect(screen.getByText("No data !")).toBeInTheDocument();
  });

  it("データがあるときは、リストを表示される", () => {
    const dummyData = [
      { id: 0, name: "偽山本博" },
      { id: 1, name: "偽秋山竜次" },
      { id: 2, name: "偽馬場裕之" },
    ];

    render(<List items={dummyData} />);

    const frameworkItems = screen
      .getAllByRole("listitem")
      .map((ele) => ele.textContent);
    const dummyItems = dummyData.map((ele) => ele.name);

    // toEqual：一致しているか比較する。
    expect(frameworkItems).toEqual(dummyItems);

    // queryByText()：get~と似ているが、ないときに使用する。
    expect(screen.queryByText("No data !")).toBeNull();
  });
});
