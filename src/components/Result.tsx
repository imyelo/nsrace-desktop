import React from 'react'
import { Button, ButtonGroup, Tag, Tree, Toast } from '@douyinfe/semi-ui'
import { IconCopy } from '@douyinfe/semi-icons'
import styled from 'styled-components'
import { INSRaceRecord } from 'nsrace'
import { clipboard } from 'electron'
import { ISubmitResult } from '../services/nsrace'

export const Result: React.FC<{ value?: ISubmitResult }> = ({ value }) => {
  const data = React.useMemo(() => {
    return (
      value?.map(({ host, response }) => ({
        key: host,
        label: host,
        children: response?.times?.map(time => ({
          key: `${host}-${time?.ip}`,
          label: <Record value={time} host={host} />,
        })),
      })) || []
    )
  }, [value])
  return (
    <>
      <Tree treeData={data} expandAll />
    </>
  )
}

const RecordStyle = styled.div`
  display: flex;
  justify-content: space-between;
  .information {
    .ip {
      margin-right: 0.5em;
    }
  }
  .operations {
    opacity: 0;
    transition: all 200ms ease;
  }
  &:hover {
    .operations {
      opacity: 1;
    }
  }
`
const Record: React.FC<{ value: INSRaceRecord; host: string }> = ({ value, host }) => {
  const duration = React.useMemo(() => {
    if (value.duration === Infinity) {
      return 'timeout'
    }
    return `${value.duration.toFixed(0)}ms`
  }, [value])
  const handleCopy = React.useCallback(() => {
    clipboard.writeText(`${value.ip} ${host}`)
    Toast.success('已复制 Hosts 规则')
  }, [value, host])
  return (
    <RecordStyle>
      <div className="information">
        <span className="ip">{value.ip}</span>
        <Tag color={value.duration === Infinity ? 'orange' : 'green'}>{duration}</Tag>
      </div>
      <ButtonGroup size="small" theme="borderless" className="operations">
        <Button icon={<IconCopy />} onClick={handleCopy} />
      </ButtonGroup>
    </RecordStyle>
  )
}
