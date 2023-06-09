import type {Config} from '@jest/types'
const config: Config.InitialOptions = {
  verbose:true,
  transform: {
    '^.+\\.tsx?$':'ts-jest',
  },
  projects: [
    {
      displayName: 'dom',
      testEnvironment: 'jsdom',
      // snapshotSerializers: ['enzyme-to-json/serializer'],
      testMatch: ['**/__tests__/**/*.test.ts?(x)'],
      transform: {
        '^.+\\.tsx?$':'ts-jest',
      },
    },
    {
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: [
        '**/__tests__/**/*.test.node.ts?(x)',
      ],
      transform: {
        '^.+\\.tsx?$':'ts-jest',
      },
    },
  ],
}

export default config