import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoSelector, todoState } from "../atom";
import styled from "styled-components";

const List = styled.li`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    color: ${(props) => props.theme.textColor};
    width: 100%;
  }
`;

const ListBtn = styled.button`
  background: #edadad;
  color: ${(props) => props.theme.textColor};
  border: none;
  outline: none;
  padding: 0.5rem;
  border-radius: 5px;
  margin-left: 5px;
  font-size: 0.5rem;
`;

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
    <List>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <ListBtn name={Categories.TO_DO} onClick={onClick}>
          To Do
        </ListBtn>
      )}
      {category !== Categories.DOING && (
        <ListBtn name={Categories.DOING} onClick={onClick}>
          Doing
        </ListBtn>
      )}
      {category !== Categories.DONE && (
        <ListBtn name={Categories.DONE} onClick={onClick}>
          Done
        </ListBtn>
      )}
      <ListBtn onClick={deleteToDo}>delete</ListBtn>
    </List>
  );
}

export default ToDo;
