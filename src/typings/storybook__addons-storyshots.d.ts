declare module '@storybook/addon-storyshots' {
  interface Options {
    suite?: string;
    configPath?: string;
    test: TestFn;
  }

  type TestFn = (options: { story: any; context: any; renderFrom: any }) => any;

  declare function initStoryshots(options?: Options): void;
  declare export const renderOnly: TestFn;

  export default initStoryshots;
}
