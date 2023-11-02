# React JEST・React Testing Library入門
## はじめに
このREADMEでは、JEST・React Testing Libraryを使ったテストコードの書き方を共有します。
もし、テストの歴史や考え方をご覧になりたい方は、
[フロントエンドテスト戦略・考え方](https://github.com/bu-abe/jest-project#%E3%83%95%E3%83%AD%E3%83%B3%E3%83%88%E3%82%A8%E3%83%B3%E3%83%89%E3%83%86%E3%82%B9%E3%83%88%E6%88%A6%E7%95%A5%E8%80%83%E3%81%88%E6%96%B9)をご参照ください。
## 目次
- [React JEST・React Testing Library入門](#react-jestreact-testing-library入門)
  - [はじめに](#はじめに)
  - [目次](#目次)
  - [JESTとは](#jestとは)
  - [React Testing Libraryとは？](#react-testing-libraryとは)
    - [そもそもTesting Libraryとは？](#そもそもtesting-libraryとは)
    - [React Testing Libraryとは？](#react-testing-libraryとは-1)
  - [なぜ、Jest・RTL？](#なぜjestrtl)
    - [Jestの場合](#jestの場合)
    - [React Testing Libraryの場合](#react-testing-libraryの場合)
  - [How to Jest and RTL](#how-to-jest-and-rtl)
  - [前提](#前提)
  - [導入方法](#導入方法)
      - [Create React Appを使用する方法](#create-react-appを使用する方法)
      - [Create React Appを使用しない方法](#create-react-appを使用しない方法)
  - [テストファイルの作成](#テストファイルの作成)
  - [基本構文・最低限の知識](#基本構文最低限の知識)
  - [describe・it(test)メソッド](#describeittestメソッド)
  - [expectメソッド](#expectメソッド)
  - [renderメソッド・screenオブジェクトメソッド](#renderメソッドscreenオブジェクトメソッド)
  - [screenの検索クエリ](#screenの検索クエリ)
    - [getByとqueryByの違いは何なの？](#getbyとquerybyの違いは何なの)
    - [複数の要素を取得する](#複数の要素を取得する)
  - [検索クエリのタイプ](#検索クエリのタイプ)
    - [結局、どのクエリを使えば良いの？](#結局どのクエリを使えば良いの)
  - [ユーザーのイベント](#ユーザーのイベント)
    - [では、fireEventとuserEventどう違うの？](#ではfireeventとusereventどう違うの)
  - [コンポーネントのpropsのテスト](#コンポーネントのpropsのテスト)
  - [非同期での処理](#非同期での処理)
    - [fireEvent・userEventはなぜ非同期処理なのにいらないの？](#fireeventusereventはなぜ非同期処理なのにいらないの)
  - [テスト・テストケースのセットアップ(前後処理)](#テストテストケースのセットアップ前後処理)
  - [Reduxのテスト](#reduxのテスト)
  - [その他](#その他)
    - [テストスイートとテストケースの題名を、日本語で書くか英語で書くか](#テストスイートとテストケースの題名を日本語で書くか英語で書くか)
    - [テストファイルのディレクトリ構成はどうする？](#テストファイルのディレクトリ構成はどうする)
    - [カバレッジの取得](#カバレッジの取得)
  - [まとめ](#まとめ)
  - [参考文献](#参考文献)

## JESTとは
Meta(旧Facebook)社によって開発されたJavaScript向けのテストフレームワークです。<br>
JavascriptのユニットテストといえばJESTです。<br>
テストランナーからマッチャー、カバレッジ等のテストに必要な一連の機能が備わっています。

特徴は、あれこれ設定をすることなく、他の依存ライブラリを追加することもなく、誰でもすぐにユニットテストを書き始められるようになっているのが特徴です。

## React Testing Libraryとは？
### そもそもTesting Libraryとは？
テストを実行したいコンポーネントの描写やクリックイベントの実行、描写した内容からの要素の取得に使うライブラリです。

### React Testing Libraryとは？
React専用のTesting Libraryで、ユーザー視点でのテストが可能です。

余談ですが、<br>
Vueの場合、Vue Testing Library<br>
Angularの場合、Angular Testing Libraryが存在します。

## なぜ、Jest・RTL？
### Jestの場合
結論から言うと、テストでの何でも屋であるためです。<br>
まずテストをする際に必要になってくる要素が三点あります。
- テストランナー
- アサーション
- テストモック

それぞれに違うライブラリが存在しており、使いたいライブラリがあれば都度インストールをする必要があり、テスト初心者にはハードルが高いです。<br>
その点Jestは、三点の要素を含んでいて(互換性がある)、すぐテストを書き始めることができます。<br>
いわば、オールインワン的な存在なのです。<br>

### React Testing Libraryの場合
ReactのプロジェクトでTesting Libraryといえば、
- React Testing Library
- Enzyme

の二つがあります。

Enzymeを選ぶべきではない理由あります。
- React v17 以降の互換性が悪い。
特にHooksとの相性が悪いです。<br>
例えば、useEffectのテストでは、非常に手間がかかってしまいます。<br>
しかし、RTLは、React専用のTesting Libraryとして開発されたため、互換性があり使用しやすいです。<br>
よって、RTLが選ばれます。

**二点は、Reactも推奨しているツールです。**

※ 以降、React Testing LibraryをRTLと省略します。

## How to Jest and RTL
##  前提
- exampleの各フォルダのテスト内容の説明はしません。
基本的構文・使い方を説明します。
ファイルのコメントアウトで何をしようとしているかわかると思いますので、ご了承ください。

## 導入方法
#### Create React Appを使用する方法
```
npx create-react-app プロジェクト名 
```
jest及びRTLが自動でインストールされます。

#### Create React Appを使用しない方法
主に、既存プロジェクトで使用すると思います。
Jestのインストール
```bash
yarn add --dev jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer jest-environment-jsdom 
```
Jestのカスタムする場合は、"jest.config.js"で設定できます。
(設定に関しては割愛します)

もし設定をしたい場合は、以下の記事がおすすめです。
- [Jest document Jestの設定](https://jestjs.io/ja/docs/configuration)
- [この頃流行りのJestを導入して軽快にJSをテストしよう](https://qiita.com/hogesuke_1/items/8da7b63ff1d420b4253f#%E8%A8%AD%E5%AE%9A%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB)

<br>

React Testing Libraryのインストール
```bash
yarn add --dev @testing-library/react @testing-library/jest-dom @testing-library/user-event  
```

package.jsonの"scripts"にJestのスクリプトを設定します。
Ex.
```json
"scripts": {
    ~
    "test": "jest --env=jsdom --verbose",
    "test:watch": "jest --watch --env=jsdom --verbose"
},
```

テスト実行の仕方
```bash
yarn test // テストを実行
or
yarn test:watch // テスト実行及びウォッチモード
```
<br>

また、テストに関連して、モックサーバーが必要になることがあります。
今回は、一般的に使用されている"msw"というライブラリを使用して、仮APIを作成してテストを行なっています。
今回はJest・RTLを使い方の説明のためは割愛します。
"msw"の参考記事
[MSW で加速するフロントエンド開発](https://zenn.dev/takepepe/articles/msw-driven-development)
[jest における MSW の活用事例](https://zenn.dev/takepepe/articles/jest-msw-mocking)

## テストファイルの作成
拡張子の前に".test"を追加することにより、testファイルと識別する。 
Ex. CheckBox.test.jsx

<br>
 
## 基本構文・最低限の知識
最低限知る必要があるやメソッドを知る必要があります。
順に解説していきます。

## describe・it(test)メソッド
こちらは、Jestのメソッドです。
どちらもテストの基盤となるもので、テストの内容を示します。
- **describe**<br>
テストスイートと呼ばれていて、テストの題名です。第二引数をfunctionにしてテストケースを記載していきます。
- **it(test)**<br>
テストケースの題名です。第二引数をfunctionにしてテストの内容を記載していきます。<br>
testとitは同義です。


```javascript
describe("ここに題名が入ります。", () => {
    it("ここにテストケースの題名が入ります。", () => {
        
    })
    
    test("ここにテストケースの題名が入ります。", () => {
        
    })
})
```
## expectメソッド
こちらは、Jestのメソッドです。<br>
アサーションと言われているもで、テストの判定をするときに使用します。<br>
また、マッチャーという判定の仕方のメソッドがあり、様々なマッチャーを使い判定をします。<br>
テストケースの中で記載します。一つのテストケースにいくつexpectがあっても良いです。<br>
以下のリンクは、マッチャーの一覧になるので、参考にしてみてください。
[https://jestjs.io/docs/expect#expectvalue](https://jestjs.io/docs/expect#expectvalue)
```javascript
describe("ここに題名が入ります。", () => {
    it("ここにテストケースの題名が入ります。", () => {
        expect(~~~).toBeTruthy();  
        expect(~~~).toBeInTheDocument();  
    })
})
```

## renderメソッド・screenオブジェクトメソッド
こちらは、RTLのメソッドでどちらも使用頻度が高いです。<br>
- **render()**<br>
コンポーネントを描画するときに使用します。
- **screen.getByxxx()**<br>
コンポーネントの要素を検索し選択するときに使用します。

```javascript
describe("レンダリングのテスト", () => {
    it("h1タグが存在している", () => {
        render(<Render />);
               
        // logの役割であり、レンダリングされた要素を表示します。
        screen.debug(); 
        
        // h1タグが存在しているか判定しています。
        expect(screen.getByRole("heading")).toBeTruthy();  
    })
})
```
## screenの検索クエリ
screenオブジェクトメソッドの検索クエリは、大きく分けて三つあり、
- **getBy...**
要素を選択するときに使用する。
- **queryBy...**
getBy...と同じである。
- **findBy...**
非同期で要素を選択するときに使用する。

### getByとqueryByの違いは何なの？
二つ同じ機能なのになぜ存在しているのか疑問に思ったかもしれません。

結論から言うと、<br>
**要素が存在しないことをアサーションする場合にはqueryByを使い、それ以外の場合はgetByを使います。**<br>
getByは要素が見つからない場合、見つからない時点でエラーを返します。<br>
そのため、アサーションの中で要素が見つからないgetByを使用すると、<br>
getByのエラーが表示され、実際にテストしたいこと(expect)の判定がわかりません。<br>
逆に、queryByは要素が見つからない場合、エラーを返さずnullを返すため、実際に判定したい内容の邪魔をしません。

### 複数の要素を取得する
複数の要素を取得する場合は、
- **getAllBy...**
- **queryAllBy...**
- **findAllBy...**

三点とも要素の配列が返ってきます。

![](https://i.imgur.com/1C96Sli.png)

## 検索クエリのタイプ
検索クエリのタイプはいくつもあります。<br>
例えば、getByText, getByRole etc...たくさんあります。<br>
本セクションでは、exampleフォルダ内のテストファイルで頻出するクエリタイプとクエリの優先度について説明します。<br>
(今回は、getByに絞ります)<br>
今から使用頻度が高いものをご紹介します。
- **getByText("レンダー")**<br>
描画された中から引数で指定したテキストを検索します。
- **getByRole("heading")**<br>
各要素に設定されているrole属性で検索します。<br>
わかりにくいと思うので、下記に例を出します。
```html
<div>
    <h1>
        こんにちは
    </h1>
</div>
```
H1タグが設定されているとします。
<br>
```javascript
screen.debug(screen.getByRole('heading'));

 /* 
  * この場合の結果は、下記になる。
  * <h1>
  *    こんにちは
  * </h1>
  */
```
上記のように、h1タグを取得できます。

他にもgetByRole("heading")は、h1だけでなくh2,h3など取得できます。<br>
もし描画された中に要素が複数あった場合は、第二引数でoptionsを設定して特定します。<br>
設定をしないとエラーになってしまうので、設定をする必要があります。

```html
<div>
    <h1>
        こんにちは
    </h1>
    <h2>
        Hello
    </h2>
</div>
```
```javascript
screen.debug(screen.getByRole('heading', {name: "こんにちは"}));

 /* 
  * 第二引数にoptionを設定したことにより結果は、下記になる。
  * <h1>
  *    こんにちは
  * </h1>
  */
```

下記が、第二引数でのoptionsの一覧になります。<br>
取得したいものに応じて、optionsの設定を行なってください。
```javascript
  options?: {
    exact?: boolean = true,
    hidden?: boolean = false,
    name?: TextMatch,
    normalizer?: NormalizerFn,
    selected?: boolean,
    checked?: boolean,
    pressed?: boolean,
    current?: boolean | string,
    expanded?: boolean,
    queryFallbacks?: boolean,
    level?: number,
  }
```
引数の設定の仕方の一覧は以下になっているので、参考にしてください。<br>
[https://github.com/A11yance/aria-query#elements-to-roles](https://github.com/A11yance/aria-query#elements-to-roles)

- getByPlaceholderText<br>
placeholderで検索します。

- getByTestId
テスト専用のidを使用し検索します。<br>
下記のようにテスト専用のidを設定して扱います。
```html
<div>
    <p data-testid="test">
        こんにちは
    </p>
</div>
```
```javascript
screen.debug(screen.getByTest("test"));

 /* 
  * この場合の結果は、下記になる。
  * <p>
  *    こんにちは
  * </p>
  */
```

### 結局、どのクエリを使えば良いの？
例えば、様々なやり方で要素を取得できる場合、どのクエリ使えば良いか悩むかと思います。<br>
公式ドキュメントによると、取得方法には優勢順位というものがあります。<br>
優先順位は以下のようになっています。

1. 対象の要素に誰も(マウス、支援技術、視覚的)がアクセスできるクエリ
    1. getByRole
    2. getByLabelText
    3. getByPlaceholderText
    4. getByText
    5. getByDisplayValue
2. セマンティッククエリ
    1. getByAltText
    2. getByTitle
3. テスト ID
    1. getByTestig
    
[https://testing-library.com/docs/queries/about/#priority](https://testing-library.com/docs/queries/about/#priority)

この様にテストIDは、どうしてもエレメントを取得できない時に使います。<br>
基本的には、No.1のクエリでほとんどの要素の取得はできると思います。

## ユーザーのイベント
ユーザーのイベントはRTLが提供していて、クリックの動作やタイピングなどのユーザーの振る舞いのことを指しています。<br>
ユーザーのイベントを操作するには、二つの方法があります。<br>
二つとも非同期処理のため、async/awaitを使用する必要があります。<br>
1. **fireEvent**
2. **userEvent**

上記二つは特に機能の違いはありません。

### では、fireEventとuserEventどう違うの？
同じ機能を持っているイベントどちらを使うか迷うと思います。<br>
それぞれのイベントは特徴を持っています。<br>
例えば、クリックイベントの場合、
1. **fireEvent**<br>
クリックイベントのみしか実行されません。
2. **userEvent**<br>
クリック全般の動作が実行されます。<br>
つまり、クリックイベント以外にもhoverやpointDownなどのイベントも実行されます。<br>
よりユーザーの振る舞いを再現します。

**テストケースに応じて使い分けることがベストだと思います。**

## コンポーネントのpropsのテスト
propsの内容もテストすることができます。<br>
コールバックをpropsで渡した時は、モック関数を作成する必要があります。<br>
テストケース内でモック関数を作成します。<br>
モック関数は、"jest.fn()"を使用することで作成できます。

Ex.onChangeをpropsで渡した場合、
```javascript
describe("propsのテスト", () => {
    it("onChangeが一回発火している", async () => {
        const onChange = jest.fn();
        render(<TextBox onChange={onChange} />);
       
        const inputValue = screen.getByPlaceholderText("Enter");
        await userEvent.type(inputValue, "test");

        expect(onConsole).toHaveBeenCalledTimes(1);
    })
})
```
上記は、TextBoxコンポーネントにonChangeを渡していて、<br>
userEventを使用し"test"をタイプした時の関数が一回呼ばれているかテストしています。

## 非同期での処理
非同期処理のものをテストで書く際に、知っておかないと苦労するものがあります。<br>
それは、二点あります。
- **act()**<br>
stateの更新などの非同期処理をact内で完了させてくれます。<br>
主に状態の更新に使用されます。
- **waitFor()**<br>
タイムアウトまでコールバックを実行してくれます。<br>
主に非同期処理でのアサーションでUIをテストをする時に使用します。

上記の処理をしないと、stateが更新されていない状態でアサーションが発火して、エラーになります。

### fireEvent・userEventはなぜ非同期処理なのにいらないの？
結論から言うと、fireEvent・userEventは内部でactを使用しています。<br>
そのため、actを使用せずにasync/awaitのみで使用できます。
```javascript
configureDTL({
  ~~,
  eventWrapper: cb => {
    let result
    act(() => {
      result = cb()
    })
    return result
  },
})
```

## テスト・テストケースのセットアップ(前後処理)
これは、ネストされたテストの場合、テストのタイミングでやりたい処理をしたいときに使用します。<br>
Reactで例えるならば、useEffectが分けられているものだと思ってください。<br>
実際のケースだと、Reduxや擬似サーバーなどを使用する時に使用します。<br>
前後処理は、四つあり実行順で記載します。
1. **beforeAll**<br>
テストファイルで最初に一度だけ実行される処理です。
2. **beforeEach**<br>
テストケース(it)を**始める前**に毎回行われる処理です。
3. **afterEach**<br>
テストケース(it)が**終わった後**に毎回行われる処理です。
4. **afterAll**<br>
テストファイルで最後に一度だけ実行される処理です。 

## Reduxのテスト
今まで習ってきたことを応用します。<br>
Reduxのテストでは、テスト用のstoreとreducerを作成してテストをします。<br>
以下が実際のテスト内容になります。
```javascript
describe("Reduxの非同期テスト", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterSlice,
      },
    });
  });

  test("計算がされている", async () => {
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );

    await userEvent.click(screen.getByText("FETCHDUMMY"));
    expect(await screen.findByTestId("count-value")).toHaveTextContent("105");
  });
});
```
特に難しくなく、テストケースごとにstoreとreducerをリセットしてテストします。

## その他
### テストスイートとテストケースの題名を、日本語で書くか英語で書くか
この件に関しては、基本的にテストが分かれば良いのですが、
英語が得意でない限り、日本語で書いた方が良いと思います。<br>
理由は、やはり見やすく、テストの意図をすぐ読み取ることができることです。<br>
そこは、プロジェクト内でルールを決めることが必要です。

### テストファイルのディレクトリ構成はどうする？
一般的なパターンは大きく分けて二つ存在します。
- プロジェクトのルートに"__test__"ディレクトリを作成して、その中にテストファイルを配置する
```
.
├── __tests__
│   └── atoms
│       └── CheckBox
│           └── CheckBox.test.js
└── src
    └── atoms
        └── CheckBox
            └── CheckBox.js
```
- 各コンポーネントのモジュールファイルにテストファイルを隣接して配置する。<br>
exampleフォルダ内のテストファイルは上記のやり方をしています。
```
.
└── src
    └── atoms
        └── CheckBox
            ├── CheckBox.js
            └── CheckBox.test.js
```
<br>

ファイルの置き場は、テストコードを書く前に決めてからテストコードを書くことをおすすめします。

### カバレッジの取得
カバレッジとは、コード網羅率です。コード全体の中で、テストが行われた割合のことです。<br>
テストを行なっているとどのくらいテストできているかを知りたい時だったり、必要になったりする時があると思います。<br>
Jestは、カバレッジをレポートしてくれる機能を持っているのでとても便利です。<br>

カバレッジの表示方法は、テスト実行時のオプションに"--coverage"を追加するだけです。<br>
カバレッジのテストを実行すると、coverageフォルダが生成され、ブラウザで確認できます。
Ex.
**Create React Appを使用する方法**
```bash
  npm test -- --covarage --watchAll=false
  or
  yarn test -- --covarage --watchAll=false
```

**Create React Appを使用しない場合**
```bash
  npm test -- --covarage
  or
  yarn test -- --covarage
```
実際のexampleファイルのカバレッジが以下のように表示されます。

![](https://i.imgur.com/9Hb0bOJ.png)
<br>

そして、生成されたcovarageフォルをブラウザで確認すると以下のようにわかりやすく表示されます。<br>
![](https://i.imgur.com/UITwvZ9.png)
カバレッジレポートの見方については、以下の記事がとても参考になるのでご覧ください。<br>
[Jestのカバレッジはどのように見ればよいのだろうか？](https://qiita.com/s_karuta/items/c464f220a4b65f70f214)


## まとめ
今まで、Jest・RTLの説明から基本構文まで説明してきました。<br>
exampleフォルダの中にテストの実装例のファイルを入れましたので、ローカルで動かしたり参考にしたりしてください。<br>
他にもまだまだ、たくさん機能があるみたいなので、テストを書く際に使用してみてください。

## 参考文献
- [React Testing Library document](https://testing-library.com/docs/queries/about/)
- [React テストのレシピ集](https://ja.reactjs.org/docs/testing-recipes.html)
- [Reactソフトウェアテスト(Hooks+ReduxToolKit時代のモダンテスト手法)](https://www.udemy.com/course/reacthooksreduxtoolkit/)
- [React Testing Libraryの使い方](https://qiita.com/ossan-engineer/items/4757d7457fafd44d2d2f#%E8%A4%87%E6%95%B0%E3%81%AE%E8%A6%81%E7%B4%A0%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E3%81%AF)
- [ReactでTesting Library/Jestを使ってテストを学ぼう](https://reffect.co.jp/react/react-test#Testing_LibraryJest)
- [React のテストを書いてたら act で囲んでよーって言われたとき](https://bufferings.hatenablog.com/entry/2021/11/18/015809)
- [React + Testing Library + Jestの覚書](https://zenn.dev/nus3/articles/jest-react-testing-library)
