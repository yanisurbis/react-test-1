import { configure } from '@kadira/storybook';

function loadStories() {
  require('../src/components/stories/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
