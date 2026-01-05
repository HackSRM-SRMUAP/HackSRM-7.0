import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import React from 'react'

// ./icons/HackSRMIcon.jsx
export function HackSRMIcon() {
  return React.createElement('img', {
    src: './static/hacksrm-logo.svg',
    alt: 'HackSRM',
    style: { height: '1.5rem', display: 'block' },
  })
}

export default defineConfig({
  name: 'default',
  title: 'hacksrm-studio',
  icon: HackSRMIcon,

  projectId: 'vrujefqh',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      logo: HackSRMIcon,
    },
  },
})
