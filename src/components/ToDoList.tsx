import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector, todoState } from "../atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  max-width: 30rem;
  margin: 0 auto;

  hr {
    margin: 2rem auto;
  }
`;
const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 600;
  color: ${(props) => props.theme.titleColor};
  text-align: center;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <Container>
      <Title>MY TO DO</Title>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>

      <CreateToDo />
      <ul>
        {toDos?.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
    </Container>
  );
}

export default ToDoList;
