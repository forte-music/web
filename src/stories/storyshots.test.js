import initStoryshots, { renderOnly } from '@storybook/addon-storyshots';

const configPath = './config/storybook';

initStoryshots({ suite: 'Smoke StoryShots', configPath, test: renderOnly });
