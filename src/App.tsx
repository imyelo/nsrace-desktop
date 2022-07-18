import React from 'react'
import { Button, Card, TextArea } from '@douyinfe/semi-ui'
import styled from 'styled-components'
import { useRequest } from 'ahooks'
import { submit } from './services/nsrace'
import { Result } from './components/Result'
import { Presets } from './components/Presets'

const Root = styled.div`
  box-sizing: border-box;
  padding: 12px;
  height: 100%;
  display: grid;
  grid-template-columns: 4fr 3fr;
  column-gap: 12px;
  .fullcard {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .semi-card-body {
      flex: 1;
      overflow-y: auto;
    }
  }
`

const DEFAULT_INPUT =
  import.meta.env.MODE === 'development'
    ? `www.amazon.com
https://m.media-amazon.com/images/S/sash/KFPk-9IF4FqAqY-.woff2
https://d3216uwaav9lg7.cloudfront.net/assets-Sell.css
https://d2beun48pmgqbs.cloudfront.net/katal.flo.components.7ab5eca7e6ecca63134f.css
https://d1t40axu4ik42k.cloudfront.net/cathodeBoomerang.d11474def2665bc03c00.min.js
https://m.media-amazon.com/images/S/sash/mzVbGSgvdBfRLX9.woff
https://m.media-amazon.com/images/S/sash/kfKKBuoqcD$AUKL.woff
`
    : ''
const PLACEHOLDER = `www.amazon.com
https://m.media-amazon.com/images/S/sash/KFPk-9IF4FqAqY-.woff2`

const App: React.FC = () => {
  const [input, setInput] = React.useState(DEFAULT_INPUT)
  const handleInput = React.useCallback((value: string) => setInput(value), [setInput])
  const submitter = useRequest(submit, {
    manual: true,
  })
  const handleSubmit = React.useCallback(async () => {
    submitter.run(input.split('\n').filter(Boolean))
  }, [input, submitter])
  return (
    <Root>
      <Card
        className="fullcard"
        title="目标地址"
        headerExtraContent={<Presets onSelect={handleInput} />}
        footer={
          <Button theme="solid" type="primary" block onClick={handleSubmit} loading={submitter.loading}>
            探测
          </Button>
        }
      >
        <TextArea autosize showClear className="input" placeholder={PLACEHOLDER} value={input} onChange={handleInput} />
      </Card>
      <Card title="DNS 解析结果" loading={submitter.loading} className="fullcard">
        <Result value={submitter.data} />
      </Card>
    </Root>
  )
}

export default App
