import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoSelector, todoState } from "../atom";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(todoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      //   console.log("oldCategory", oldToDos);
      const targetIndex = oldToDos.findIndex((select) => select.id === id);
      //   console.log(targetIndex);
      const targetToDo = oldToDos[targetIndex];
      //   console.log(targetToDo);
      const newToDo = { text, id, category: name as any };
      //   console.log(newToDo);
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const deleteToDo = () => {
    setToDos((oldToDos) => oldToDos.filter((todo) => todo.id !== id));
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      <button onClick={deleteToDo}>delete</button>
    </li>
  );
}

export default ToDo;
