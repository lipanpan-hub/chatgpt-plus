import { Avatar, Button, List, Typography, message, Popconfirm, theme as antdTheme, Divider } from 'antd'
import { DeleteOutlined, MessageOutlined } from '@ant-design/icons'
import { useTranslation } from '@/locales'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSiteContext } from '@/contexts/site'

const _data = [
  {
    uuid: 1,
    title: 'ChatGPT',
    message: 'Ant Design Title 1',
  },
  {
    uuid: 2,
    title: 'ChatGPT',
    message: 'Ant Design Title 2',
  },
  {
    uuid: 3,
    title: 'ChatGPT',
    // message: 'Ant Design Title 3',
  },
  {
    uuid: 4,
    title: 'ChatGPT',
    // message: 'Ant Design Title 4',
  },
  {
    uuid: 5,
    title: 'ChatGPT',
    message: 'Ant Design Title 1',
  },
  {
    uuid: 6,
    title: 'ChatGPT',
    message: 'Ant Design Title 2',
  },
  {
    uuid: 7,
    title: 'ChatGPT',
    // message: 'Ant Design Title 3',
  },
  {
    uuid: 8,
    title: 'ChatGPT',
    // message: 'Ant Design Title 4',
  },
]

function IndexPage() {
  const router = useRouter()
  const { token } = antdTheme.useToken()
  const { theme } = useSiteContext()
  const { t } = useTranslation()
  const [uuid, setUuid] = useState<any>(null)

  const openChat = useCallback(
    (id: number) => {
      console.log(id)
      router.push(`/chat?uuid=${id}`)
    },
    [router]
  )

  useEffect(() => {
    const _uuid = router.query?.uuid
    if (_uuid) {
      console.log(_uuid)
      setUuid(_uuid)
    } else {
      if (_data && _data.length > 0) {
        openChat(_data[0]['uuid'])
      }
    }
  }, [openChat, router.query?.uuid])

  const confirm = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    console.log(e)
    message.success('Click on Yes')
  }

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    console.log(e)
    message.error('Click on No')
  }
  return (
    <div style={{ borderRight: `1px solid ${token.colorBorder}`, width: 260, padding: 16, overflow: 'hidden', position: 'relative' }}>
      <Button type="dashed" block size="large">
        {t('chat.newChat')}
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={_data}
        split={false}
        style={{ marginTop: 10, paddingBottom: 100, paddingLeft: 4, paddingRight: 4, overflow: 'scroll', height: '100%', maxHeight: 'inherit', scrollbarWidth: 'none' }}
        renderItem={(item, index) => (
          <Button
            block
            type="default"
            style={{
              height: '100%',
              borderRadius: 6,
              padding: '4px 2px 4px 6px',
              marginTop: '12px',
              borderColor: uuid == item.uuid ? token.colorPrimaryHover : undefined,
              backgroundColor: uuid == item.uuid ? (theme == 'dark' ? token.colorPrimaryHover : '#e8e8e8') : undefined,
            }}
            onClick={() => openChat(item.uuid)}
          >
            <List.Item
              style={{ padding: 2 }}
              actions={[
                // @ts-ignore
                <Popconfirm key="del" title="Delete the chat" description="Are you sure to delete this chat?" onConfirm={confirm} onCancel={cancel} okText="Yes" cancelText="No">
                  <DeleteOutlined
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  />
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                style={{ alignItems: 'center' }}
                avatar={<Avatar shape={'circle'} size={42} style={{ padding: 4 }} src={<Image src={require('@/assets/openai.png')} width={42} height={42} alt="avatar" />} />}
                title={
                  <div style={{ textAlign: 'left' }}>
                    <span style={{ color: uuid == item.uuid ? (theme === 'dark' ? '#fff' : token.colorPrimaryActive) : token.colorText }}>{item.title}</span>
                  </div>
                }
                description={
                  <Typography.Paragraph
                    style={{ marginBottom: 0, fontSize: 12, textAlign: 'left', color: uuid == item.uuid ? (theme === 'dark' ? '#eee' : token.colorPrimaryActive) : token.colorText }}
                    ellipsis={{ rows: 1 }}
                  >
                    {item.message || 'No message'}
                  </Typography.Paragraph>
                }
              />
            </List.Item>
          </Button>
        )}
      />
      <div
        style={{
          width: 'auto',
          position: 'absolute',
          display: 'flex',
          justifyContent: 'end',
          flexDirection: 'column',
          left: 16,
          right: 16,
          paddingBottom: 16,
          bottom: 0,
          height: 80,
          background: token.colorBgContainer,
        }}
      >
        <Button type="primary" block size="large">
          {t('chat.tryGpt4')}
        </Button>
      </div>
    </div>
  )
}

export default IndexPage
