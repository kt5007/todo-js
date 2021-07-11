"use strict";

// タスクを格納する配列の用意
let todoItems = [];
// タスクを所定の形式で作る関数
function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };
  todoItems.push(todo);
  // アイテムの追加
  renderTodo(todo);
}

// タスクが入力されてenterもしくは追加を押したときに実行
const form = document.getElementById('add-form');
form.addEventListener("submit", (event) => {
  // enterを押すと画面が遷移するので阻止
  event.preventDefault();
  // 入力したアイテムを取得
  const input = document.getElementById('input-task');
  const text = input.value.trim();
  if (text !== "") {
    addTodo(text);
    // 入力欄を空欄
    input.value = "";
    input.focus;
  }
});

function renderTodo(todo) {
  const list = document.getElementById("todo-list");
  // すでにタスクが存在する確認
  const existItem = document.querySelector(`[data-key='${todo.id}']`);
  // 削除ボタンのときに要素を取り除く
  if(todo.deleted){
    existItem.remove();
    return
  }
  const isDone = todo.checked ? 'done': '';
  const isChecked = todo.checked ? 'checked': '';
  // li要素の作成
  const node = document.createElement("li");
  // 属性の設定
  node.setAttribute('data-key',todo.id);
  node.setAttribute("class", "list-item");
  // li要素の中身
  node.innerHTML = `
  <span class="task-name">
    <input id="${todo.id}" type="checkbox" class="js-check" ${isChecked}/>
    <span class="${isDone}">${todo.text}</span>
  </span>
  <span class="button-edit-delete">
    <button class="button-delete">削除</button>
  </span>
  `;
  // 更新アイテムか否か判別
  if(existItem){
    // 更新
    list.replaceChild(node,existItem);
  }else{
    // 最後に追加
    list.append(node);
  }
}

// クリックイベントが発生したときの処理
const list = document.getElementById("todo-list");
list.addEventListener('click', event=>{
  const itemKey = event.target.closest('.list-item').dataset.key;
  // チェックボタンの時
  if(event.target.classList.contains('js-check')){
    toggleDone(itemKey);
  }
  // 削除ボタンの時
  if(event.target.classList.contains('button-delete')){
    deleteTodo(itemKey);
  }
});

// 完了
function toggleDone(key) {
  const index = todoItems.findIndex(item=>item.id===Number(key));
  todoItems[index].checked=!todoItems[index].checked;
  renderTodo(todoItems[index]);
}

// 削除
function deleteTodo(key) {
  const index = todoItems.findIndex(item=>item.id===Number(key));
  const todo ={
    deleted:true,
    ...todoItems[index]
  }
  todoItems = todoItems.filter(item=>item.id!==Number(key));
  renderTodo(todo);
}