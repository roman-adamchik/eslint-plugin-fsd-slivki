const layers = {
  shared: 'shared',
  entities: 'entities',
  features: 'features',
  widgets: 'widgets',
  pages: 'pages',
  app: 'app'
}

const layersWithPublicApi = {
  entities: 'entities',
  features: 'features',
  widgets: 'widgets',
  pages: 'pages',
}

const layersMap = {
  'app': new Set(['pages', 'widgets', 'features', 'entities', 'shared']),
  'pages': new Set(['widgets', 'features', 'entities', 'shared']),
  'widgets': new Set(['features', 'entities', 'shared']),
  'features': new Set(['entities', 'shared']),
  'entities': new Set(['entities', 'shared']),
  'shared': new Set(['shared']),
}

module.exports = {
  layers,
  layersMap,
  layersWithPublicApi
}
