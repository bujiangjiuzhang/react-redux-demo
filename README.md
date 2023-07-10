**前言：React与Redux没有关系，只是搭配使用效果更好。**
## 1）Redux
##### 1、什么是Redux?
Redux是一个javascript容器，用于进行全局的状态管理。
##### 2、Redux的三大核心
（1）单一数据源
（2）是只读的
（3）使用纯函数来执行修改
##### 3、Redux的使用
###### 1、action
构建一个函数，返回一个对象，其中包含type属性，用来表示当前触发的事件类型。
```vue
const sendAction = () => {
    return {
        type: 'send',
        value: 20
    }
}

export default sendAction
```
###### 2、reducer
用来响应action，根据type，返回对应的state,通过return把值回传给store。
```vue
const initState = {
  value: 1,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "send":
      return state.value = action.value;
    default:
      return state.value;
  }
};

module.exports = { reducer };

```
###### 3、store
通过createStore来构建store，并将reducer作为参数传进来。
```vue
import { createStore } from "redux";
import { reducer } from "../reducer";

const store = createStore(reducer);

export default store;
```
###### 		4、页面上使用
（1）通过store.dispatch(action)来触发action  
（2）通过store.subscribe(()=>{})来监听  
（3）通过store.getState()来获取state
```vue
import react, { Component } from "react";
import store from "../store";
import sendAction from "../action";

const action = sendAction();

export default class Home extends Component {
  send = () => {
    store.dispatch(action);
  };

  componentDidMount() {
    store.subscribe(() => {
    // 由于监听了但是没有更新state不会页面刷新，所有需要：
    this.setState({})
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.send}>发送Action</button>
        <h1>{store.getState()}</h1>
      </div>
    );
  }
}

```
## 2）React-redux
> React-redux是React官方出的配合React的绑定库，可以在React中更方便的读取和更新数据。

##### 1、react-redux中两个重要组成部分
###### （1）Provider组件
用于包裹整个解构，让组件可以获取到store。
```vue
import CompA from "./components/CompA";
import CompB from "./components/CompB";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <CompA></CompA>
      ++++++++++++++++++++++
      <CompB></CompB>
    </Provider>
  );
}

export default App;

```
###### （2）connect方法
要接收Provider的store，就需要把组件通过connect进行加强。
`connect(要接收state的函数，要发送action的函数)(组件)`
页面上如果要接收数据需传第一个参数，要触发action需传第二个参数。
**1、使用第一个参数mapStateToProps获取store中的状态值**
```vue
import { connect } from "react-redux";

function CompB(props) {
  return <div>CompB======{props.count}</div>;
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, null)(CompB);

```
**2、使用第二个参数mapDispatchToProps触发action**
```vue

import { connect } from "react-redux";

function CompA(props) {
    console.log(props)

    const addClick = () => {
        props.addActions()
    }

  return (
    <div>
      <button onClick={addClick}>CompA</button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addActions: ()=> {
            dispatch({
                type: 'add'
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(CompA);
```
