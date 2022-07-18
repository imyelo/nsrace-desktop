import React from 'react'
import { Button, ButtonGroup, Tag, Tree, Toast, Tooltip, Typography } from '@douyinfe/semi-ui'
import { IconCopy, IconSave, IconUndo } from '@douyinfe/semi-icons'
import styled from 'styled-components'
import { ITimeRecord } from 'nsrace'
import { clipboard } from 'electron'
import hostile from 'hostile'
import { ISubmitResult } from '../../services/nsrace'

export const Result: React.FC<{ value?: ISubmitResult }> = ({ value }) => {
  const data = React.useMemo(() => {
    return (
      value?.map(({ host, response }) => ({
        key: host,
        label: <HostRecord host={host} />,
        children: response?.times?.length && response?.times?.map(time => ({
          key: `${host}-${time?.ip}`,
          label: <IPRecord value={time} host={host} />,
        })) || [{
          key: `${host}-empty`,
          label: <Typography.Text disabled>查询失败</Typography.Text>
        }],
      })) || []
    )
  }, [value])

  return (
    <>
      <Tree treeData={data} expandAll value={void 0} />
    </>
  )
}

const RecordStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .information {
    & > * {
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

const HostRecord: React.FC<{ host: string }> = ({ host }) => {
  const handleClear = React.useCallback(() => {
    const [error, count] = removeHost(host)
    if (!error && !count) {
      return Toast.info('没有该域名相关的 Hosts 记录')
    }
    if (!error) {
      return Toast.success('已重置该域名的 Hosts 记录')
    }
    if (error.message.includes('EACCES')) {
      return Toast.error('重置失败，请使用管理员权限运行本程序')
    }
    Toast.error('更新 Hosts 文件失败')
  }, [host])
  return (
    <RecordStyle>
      <div className="information">
        <span>{host}</span>
      </div>
      <ButtonGroup className="operations">
        <Tooltip position="topLeft" content="重置 Hosts">
          <Button size="small" theme="borderless" icon={<IconUndo />} onClick={handleClear} />
        </Tooltip>
      </ButtonGroup>
    </RecordStyle>
  )
}

const IPRecord: React.FC<{ value: ITimeRecord; host: string }> = ({ value, host }) => {
  const duration = React.useMemo(() => {
    if (value.duration === Infinity) {
      return 'lost'
    }
    return `${value.duration.toFixed(0)}ms`
  }, [value])
  const handleCopy = React.useCallback(() => {
    clipboard.writeText(`${value.ip} ${host}`)
    Toast.success('已复制 Hosts 规则')
  }, [value, host])
  const handleSave = React.useCallback(() => {
    const [error] = updateHost(host, value.ip)
    if (!error) {
      return Toast.success('已写入 Hosts 文件')
    }
    if (error.message.includes('EACCES')) {
      return Toast.error('写入失败，请使用管理员权限运行本程序')
    }
    Toast.error('写入 Hosts 文件失败')
  }, [value, host])
  return (
    <RecordStyle>
      <div className="information">
        <span className="ip">{value.ip}</span>
        <Tag color={value.duration === Infinity ? 'orange' : 'green'}>{duration}</Tag>
      </div>
      <ButtonGroup className="operations">
        <Tooltip position="topLeft" content="复制 Hosts 规则">
          <Button size="small" theme="borderless" aria-label="111" icon={<IconCopy />} onClick={handleCopy} />
        </Tooltip>
        <Tooltip position="topLeft" content="直接写入 Hosts">
          <Button size="small" theme="borderless" icon={<IconSave />} onClick={handleSave} />
        </Tooltip>
      </ButtonGroup>
    </RecordStyle>
  )
}

const removeHost = (host: string): [Error?, number?] => {
  try {
    const lines = hostile.get(false)
    const matchedLines = lines
      .map(line => ({
        ip: line[0],
        host: line[1],
      }))
      .filter(line => line.host === host)
    matchedLines.forEach(line => {
      hostile.remove(line.ip, line.host)
    })
    return [void 0, matchedLines.length]
  } catch (error) {
    return [error as Error]
  }
}

const updateHost = (host: string, ip: string): [Error?] => {
  try {
    removeHost(host)
    hostile.set(ip, host)
    return []
  } catch (error) {
    return [error as Error]
  }
}
