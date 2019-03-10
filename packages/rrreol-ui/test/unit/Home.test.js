import React from 'react'
import HomePage from '@/Home'
import renderer from 'react-test-renderer'

describe('base test', () => {
  it('should init success', () => {
    const component = renderer.create(
      <HomePage/>
    )
  })
})
