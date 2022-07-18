import React from 'react'
import { IconGlobeStroke, IconGithubLogo, IconFigma } from '@douyinfe/semi-icons'

interface IPreset {
  label: React.ReactNode
  value: string
}

export const PRESETS: IPreset[] = [
  {
    label: (
      <>
        <IconGlobeStroke /> Amazon
      </>
    ),
    value: [
      'https://m.media-amazon.com/images/S/sash/KFPk-9IF4FqAqY-.woff2',
      'https://d3216uwaav9lg7.cloudfront.net/assets-Sell.css',
      'https://d2beun48pmgqbs.cloudfront.net/katal.flo.components.7ab5eca7e6ecca63134f.css',
      'https://d1t40axu4ik42k.cloudfront.net/cathodeBoomerang.d11474def2665bc03c00.min.js',
    ].join('\n'),
  },
  {
    label: (
      <>
        <IconGithubLogo />
        GitHub
      </>
    ),
    value: [
      'https://github.com/github/.github/blob/master/profile/README.md',
      'https://avatars.githubusercontent.com/u/9919?s=200&v=4',
      'https://raw.githubusercontent.com/github/.github/master/profile/README.md',
      'https://github.githubassets.com/favicons/favicon.png',
    ].join('\n'),
  },
  {
    label: (
      <>
        <IconFigma />
        Figma
      </>
    ),
    value: [
      'https://static.figma.com/app/icon/1/favicon.png',
      'https://www.figma.com/api/profile/handle/figma',
      'https://s3-alpha.figma.com/profile/c82ecc52-1c47-405d-980b-904ff54c6577',
    ].join('\n'),
  },
]
