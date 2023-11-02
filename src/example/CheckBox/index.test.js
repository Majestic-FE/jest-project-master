import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckBox from "./index";

describe("CheckBoxのレンダリングテスト", () => {
  test("正しくレンダリングされている", () => {
    render(<CheckBox />);

    expect(screen.getByRole("checkbox")).toBeTruthy();
  });
});

describe("CheckBoxの動作テスト", () => {
  it("onChangeが動作していて、ラベルが表示されている。", async () => {
    const onChange = jest.fn();
    render(<CheckBox label={"テスト"} checked={false} onChange={onChange} />);

    await userEvent.click(screen.getByRole("checkbox"));

    expect(screen.getByText("テスト")).toBeInTheDocument();
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
