import reducer, {
  increment,
  incrementByAmount,
} from "../../features/customCounter/customCounterSlice";

/*
 * このファイルは、Reducerのテスト
 */

describe("Reducerの動作確認", () => {
  let initialState = {
    mode: 0,
    value: 1,
  };
  describe("incrementが正常に動作している", () => {
    it("modeが0の時、valueが1増加しているか", () => {
      // actionを作成
      const action = { type: increment.type };

      // reducerにアクセス。1増加する処理をする。
      const state = reducer(initialState, action);

      expect(state.value).toEqual(2);
    });
    it("modeが1の時、valueが100増加しているか", () => {
      initialState = {
        mode: 1,
        value: 1,
      };
      const action = { type: increment.type };
      const state = reducer(initialState, action);

      expect(state.value).toEqual(101);
    });
    it("modeが2の時、valueが10000増加しているか", () => {
      initialState = {
        mode: 2,
        value: 1,
      };
      const action = { type: increment.type };
      const state = reducer(initialState, action);

      expect(state.value).toEqual(10001);
    });
  });
  describe("incrementByAmountが正常に動作している", () => {
    it("modeが0の時、payloadの値がそのまま入っている", () => {
      initialState = {
        mode: 0,
        value: 1,
      };
      const action = { type: incrementByAmount.type, payload: 3 };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(4);
    });
    it("modeが1の時、payload * 100の解になる", () => {
      initialState = {
        mode: 1,
        value: 1,
      };
      const action = { type: incrementByAmount.type, payload: 3 };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(301);
    });
    it("modeが2の時、payload * 10000の解になる", () => {
      initialState = {
        mode: 2,
        value: 1,
      };
      const action = { type: incrementByAmount.type, payload: 3 };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(30001);
    });
  });
});
