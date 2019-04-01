import React from 'react'
import renderer from 'react-test-renderer'
import StatusBlock from '@/components/StatusBlock'

describe('StatusBlock base test', () => {
  it('should init correctly', () => {
    const component = renderer.create(<StatusBlock/>)
  })
})
