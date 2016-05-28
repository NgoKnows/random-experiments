import { configure } from '@kadira/storybook';

function loadStories() {
    require('components/test/testStory');
}

configure(loadStories, module);
