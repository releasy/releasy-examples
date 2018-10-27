import path from 'path'
import fs from 'fs'
import React from 'react'
import Helmet from 'react-helmet';
import { StaticRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { ReleasyProvider, Config, Link, renderToStringWithData } from 'react-releasy';

import App from '../src/components/App/App.jsx';
import manifest from '../build/asset-manifest.json';

const extractAssets = (assets, chunks) => Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map(k => assets[k]);

export default (req, res, next) => {
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

  fs.readFile(filePath, 'utf8', (htmlErr, htmlData) => {
    if (htmlErr) {
      console.log(htmlErr)
      return res.status(404).end()
    }

    const modules = [];
    const context = {};

    const config = new Config({
      link: new Link({
        url: 'https://swapi-releasy.herokuapp.com',
      }),
      ssrMode: true,
    });

    renderToStringWithData(
      <Loadable.Capture report={m => modules.push(m)}>
        <ReleasyProvider config={config}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </ReleasyProvider>
      </Loadable.Capture>,
    ).then(({ html, scripts }) => {
      const helmet = Helmet.renderStatic();

      const extraChunks = extractAssets(manifest, modules)
        .map(c => `<script type="text/javascript" src="/${c}"></script>`);

      return res.send(
          htmlData
            .replace('<html>', `<html ${helmet.htmlAttributes.toString()}>`)
            .replace(/<title>.*?<\/title>/g, helmet.title.toString())
            .replace('</head>', `${helmet.meta.toString()}</head>`)
            .replace('<div id="root"></div>', `<div id="root">${html}</div>${scripts}`)
            .replace('</body>', extraChunks.join('') + '</body>')
      );
    }).catch(err => {
      console.log(err)
      return res.status(404).end() 
    });
  });
}