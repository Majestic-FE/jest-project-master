import reducer, {
  fetchDummy,
} from "../../features/customCounter/customCounterSlice";

/*
 * このファイルは、ExtraReducerのテスト
 */
describe("extraReducersの確認", () => {
  const initialState = {
    mode: 0,
    value: 0,
  };
  it("成功した場合、100 + payloadの解になる", () => {
    const action = { type: fetchDummy.fulfilled.type, payload: 5 };
    const state = reducer(initialState, action);
    expect(state.value).toEqual(105);
  });
  it("失敗した場合、100 - payloadの解になる", () => {
    const action = { type: fetchDummy.rejected.type, payload: 5 };
    const state = reducer(initialState, action);
    expect(state.value).toEqual(95);
  });
});
