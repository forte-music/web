import initStoryshots, {
  renderOnly,
  imageSnapshot,
} from '@storybook/addon-storyshots';

initStoryshots({ suite: 'Smoke StoryShots', test: renderOnly });
initStoryshots({ suite: 'Image StoryShots', test: imageSnapshot });
