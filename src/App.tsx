import React from 'react'
import { TextArea, Divider, Button } from '@douyinfe/semi-ui'
import styled from 'styled-components'

const Root = styled.div`
  padding: 12px;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 12px;
  h4 {
    margin-bottom: 12px;
  }
  .input {
    margin-bottom: 12px;
  }
`

const App: React.FC = () => {
  return (
    <Root>
      <div>
        <h4>异常请求地址</h4>
        <TextArea rows={10} showClear className="input" />
        <Button theme="solid" type="primary" block>
          探测
        </Button>
        <Divider margin="12px" />
        <h4>日志</h4>
        <TextArea rows={10} disabled />
      </div>
      <div>
        <h4>结果</h4>
        <TextArea rows={10} disabled />
      </div>
    </Root>
  )
}

export default App
