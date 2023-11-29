import type { Meta, StoryObj } from '@storybook/react';
import {Task} from "../Task";
import {Provider, useSelector} from "react-redux";
import {AppRootStateType, store} from "../state/store";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";
import {TaskType} from "../ToDoList";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
  title: 'TODOLIST/Task',
  component: Task,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {   task : {id: "sd", title: "Bla", isDone: true},
    todolistId: "IdCool"
  },
  decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
// export const TaskIsDoneStory: Story = {
//
// };
// export const TaskIsNotDoneStory: Story = {
//   // args: {
//   //   task : {id: "f", title: "HTML&CSS", isDone: false},
//   //   todolistId: "todolistId1"
//   // }
// };
const TaskWithRedux = () => {
  let task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
  if(!task){
    task = {id: "f", title: "Hardcoded", isDone: false}
  }
  return <Task task={task} todolistId={"todolistId1"} />
}

export const TaskStory = {
  render: () => <TaskWithRedux />
}
