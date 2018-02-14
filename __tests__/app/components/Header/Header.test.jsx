import React from 'react'
import { shallow, mount } from '../../../../__utils__/setup'
import Header from '../../../../app/components/Header/Header'
import { StaticRouter } from 'react-router'

function render() {
  return (
    <StaticRouter location="/" context={{}}>
      <Header />
    </StaticRouter>
  )
}

describe('<Header />', () => {

  it('Renders the site title', () => {
    const el = mount(render());
    expect(el.find('h1').text().trim()).toEqual('React Isomorphic Server w/GraphQL')
  })

  it('renders menu of links', () => {
    const el = mount(render())
    expect(el.find('ul li').length).toEqual(2);
    expect(el.find('ul li').first().text()).toEqual('Home');
    expect(el.find('ul li').at(1).text()).toEqual('Users');
  })

})