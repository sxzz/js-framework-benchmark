import path from 'path';
import { fileURLToPath } from 'url';

// add __dirname functionality to this module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function (env, { mode }) {
  const production = mode === 'production';
  return {
    mode: production ? 'production' : 'development',
    devtool: production ? 'source-maps' : 'inline-source-map',
    entry: {
      app: ['./src/todo-item.ts']
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/'
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: ['src', 'node_modules']
    },
    devServer: {
      port: 9000,
      historyApiFallback: true,
      open: !process.env.CI,
      static: {
        directory: path.join(__dirname, '/')
      }
    },
    module: {
      rules: [
        {
          test: /\.ts$/i,
          use: [{ loader: 'ts-loader' }],
          exclude: /node_modules/
        }
      ]
    }
  };
}
