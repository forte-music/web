import initStoryshots, { renderOnly } from '@storybook/addon-storyshots';

const configPath = './storybook';
initStoryshots({ suite: 'Smoke StoryShots', configPath, test: renderOnly });
