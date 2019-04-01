import React from 'react'
import renderer from 'react-test-renderer'
import HomePage from '@/Home'

describe('base test', () => {
  it('should init success', () => {
    const component = renderer.create(
      <HomePage/>
    )
  })
})
