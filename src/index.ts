import minimist from 'minimist';
import { red, lightYellow, white, lightRed, lightBlue } from 'kolorist';
import path from 'node:path';
import prompts from 'prompts';
import fs from 'node:fs';

const cwd = process.cwd();

type ColorType = (color: string | number) => string;

type Option = {
  id: number;
  name: string;
  displayName: string;
  color: ColorType;
};

const packageBundlers: Option[] = [
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

const packageTypes: Option[] = [
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

const templates = packageBundlers.map((option: Option) => {
  return option.name;
});

const types = packageTypes.map((option: Option) => {
  return option.name;
});

const defaultProjectDir = 'my-package';

async function run() {
  const argBundler = undefined;
  const argType = undefined;

  let projectDir = defaultProjectDir;
  const getProjectName = () =>
    projectDir === '.' ? path.basename(path.resolve()) : projectDir;

  let cli: prompts.Answers<'packageName' | 'packageBundler' | 'packageType'>;

  try {
    cli = await prompts(
      [
        {
          type: 'text',
          name: 'packageName',
          message: white('Name Of Package: '),
          initial: defaultProjectDir,
          onState: (state) => {
            projectDir = state.value || defaultProjectDir;
          },
          validate: (value) =>
            !fs.existsSync(value) || isEmpty(value)
              ? true
              : `'${value}' Already Exists, Choose Another`,
        },
        {
          type: argBundler && templates.includes(argBundler) ? null : 'select',
          name: 'packageBundler',
          message:
            typeof argBundler === 'string' && !templates.includes(argBundler)
              ? white(
                  `The Bundler Chosen (${argBundler}) Is Not Valid, Please Choose From The List Below`
                )
              : white('Select a Bundler'),
          initial: 0,
          choices: packageBundlers.map((type) => {
            const color = type.color;
            return {
              title: color(type.displayName || type.name),
              value: type,
            };
          }),
        },
        {
          type: argType && types.includes(argType) ? null : 'select',
          name: 'packageType',
          message:
            typeof argType === 'string' && !types.includes(argType)
              ? white(
                  `The Type Chosen (${argType}) Is Not Valid, Please Choose From The List Below`
                )
              : white('Select a Type'),
          initial: 0,
          choices: packageTypes.map((type) => {
            const color = type.color;
            return {
              title: color(type.displayName || type.name),
              value: type,
            };
          }),
        },
      ],
      {
        onCancel: () => {
          throw new Error(red('CANCELED BY DEVELOPER'));
        },
      }
    );
  } catch (cancelled: any) {
    console.log(cancelled.message);
    return;
  }

  const { packageBundler, packageType } = cli;
  
  const root = path.join(cwd, projectDir);
  const template = packageBundler ? packageBundler.name : argBundler;
  const type = packageType ? packageType.name : argType;
  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm';

  fs.mkdirSync(root, { recursive: true });

  console.log(`\nCreating New Project In ${root}`);

  const localTemplateDir = path.join(cwd, 'templates', `${template}-${type}`);

  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, file);
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(localTemplateDir, file), targetPath);
    }
  };

  const pkg = JSON.parse(
    fs.readFileSync(path.join(localTemplateDir, `package.json`), 'utf-8')
  );

  pkg.name == getProjectName();

  write('package.json', JSON.stringify(pkg, null, 2));

  const files = fs.readdirSync(localTemplateDir);
  files
    .filter((f) => f !== 'package.json')
    .forEach((file) => {
      write(file);
    });

  console.log(`\Package Starter Bundle Initialized`);
  console.log(`\nRun The Commands Below To Start, Happy Coding !!\n`);
  if (root !== cwd) {
    console.log(`  cd ${path.relative(cwd, root)}`);
  }
  console.log(`  ${pkgManager} install`);
  console.log(`  ${pkgManager} run dev`);
}

try {
  run();
} catch (error) {
  console.log(red('Error Occurred'));
}

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

function copy(src: string, dest: string) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

function pkgFromUserAgent(userAgent: string | undefined) {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(' ')[0];
  const pkgSpecArr = pkgSpec.split('/');
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}

export function isEmpty(path: string) {
  const files = fs.readdirSync(path);
  return files.length === 0;
}
