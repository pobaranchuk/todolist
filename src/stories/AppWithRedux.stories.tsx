import type { Meta, StoryObj } from '@storybook/react';

import AppWithRedux from "../AppWithRedax";

import {Provider} from "react-redux";
import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AppWithRedux> = {
  title: 'TODOLIST/AppWithRedux',
  component: AppWithRedux,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {

  },
  decorators: [ReduxStoreProviderDecorator]

};

export default meta;
type Story = StoryObj<typeof AppWithRedux>;

export const AppWithReduxStory: Story = {
  // render: () => <Provider store={store}><AppWithRedux/></Provider>
}

