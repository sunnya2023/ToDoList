import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, IToDo, categoryState, todoState } from "../atom";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  gap: 5px;
`;
const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  border-bottom: 1px solid ${(props) => props.theme.btnColor};
  padding: 1rem;
  &::placeholder {
    color: ${(props) => props.theme.disabled};
  }
`;

const Btn = styled.button`
  background: ${(props) => props.theme.btnColor};
  color: ${(props) => props.theme.textColor};
  border: none;
  outline: none;
  padding: 1rem;
  border-radius: 5px;
`;
interface IForm {
  toDo: string;
}
function CreateToDo() {
  const setToDos = useSetRecoilState(todoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("toDo", { required: "please write a to do" })}
        placeholder="Write your to do"
      />

      <Btn>Add</Btn>
    </Form>
  );
}

export default CreateToDo;
