import { useCounter } from "./useCounter";
import { act, renderHook } from "@testing-library/react";

describe("Hooksのテスト", () => {
  it("カウントが1足されている", () => {
    const { result } = renderHook(() => useCounter(3));
    // 初期値が設定されているか
    expect(result.current.count).toBe(3);

    // act：効果は、stateの更新などの非同期処理をact内で完了させてくれる。
    //    　今回の場合は、stateの更新がありactがないとstateが更新されていない状態でアサーションが発火して、エラーになる。
    // waitFor：タイムアウトまでコールバックを実行してくれる。特に非同期処理でのUIのテストで使用する。
    //        　今回は、カスタムフックのみのテストのため使用していない。
    act(() => {
      result.current.increment(); // 1増加
    });
    expect(result.current.count).toBe(4);
  });

  it("カウントが1引かれている", () => {
    const { result } = renderHook(() => useCounter(3));
    // 初期値が設定されているか
    expect(result.current.count).toBe(3);

    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(2);
  });

  it("カウントが２倍されている", () => {
    const { result } = renderHook(() => useCounter(3));
    expect(result.current.count).toBe(3);
    act(() => {
      result.current.double();
    });
    expect(result.current.count).toBe(6);
  });

  it("カウントが３倍されている", () => {
    const { result } = renderHook(() => useCounter(3));
    expect(result.current.count).toBe(3);
    act(() => {
      result.current.triple();
    });
    expect(result.current.count).toBe(9);
  });

  it("カウントがリセットされている", () => {
    const { result } = renderHook(() => useCounter(3));
    expect(result.current.count).toBe(3);
    act(() => {
      result.current.reset();
    });
    expect(result.current.count).toBe(0);
  });
});
