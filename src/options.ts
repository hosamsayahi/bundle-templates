export type ColorType = (color: string | number) => string;
import { blue, lightBlue, lightRed, lightYellow } from 'kolorist';

export type Option = {
  id: number;
  name: string;
  displayName: string;
  color: ColorType;
};

export const packageBundlers: Option[] = [
  {
    id: 1,
    name: 'rollup',
    displayName: 'Rollup',
    color: lightRed,
  },
  {
    id: 2,
    name: 'esbuild',
    displayName: 'Esbuild',
    color: lightYellow,
  },
];

export const packageTypes: Option[] = [
  {
    id: 1,
    name: 'javascript',
    displayName: 'Javascript',
    color: lightYellow,
  },
  {
    id: 2,
    name: 'typescript',
    displayName: 'Typescript',
    color: lightBlue,
  },
];

export const packageFeatures: Option[] = [
  {
    id: 1,
    name: 'css-support',
    displayName: 'Css Support',
    color: blue,
  },
  {
    id: 2,
    name: 'react-support',
    displayName: 'React Support',
    color: lightBlue,
  },
  {
    id: 3,
    name: 'unit-testing',
    displayName: 'Unit Testing',
    color: lightRed,
  },
];

export const templates = packageBundlers.map((option: Option) => {
  return option.name;
});

export const types = packageTypes.map((option: Option) => {
  return option.name;
});

export const features = packageFeatures.map((option: Option) => {
  return option.name;
});
