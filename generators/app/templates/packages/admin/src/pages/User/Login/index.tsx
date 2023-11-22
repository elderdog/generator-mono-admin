import { useQuery } from '@umijs/max'
import Footer from '@/components/Footer'
import { login } from '@/services/system/login'
import { getCode } from '@/services/system/captcha'
import { LockOutlined, UserOutlined, CalculatorOutlined } from '@ant-design/icons'
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { FormattedMessage, history, useIntl, useModel, Helmet } from '@umijs/max'
import { Alert, message } from 'antd'
import Settings from '../../../../config/defaultSettings'
import React, { useState } from 'react'
import { flushSync } from 'react-dom'

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24
      }}
      message={content}
      type="error"
      showIcon
    />
  )
}

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({})
  const { initialState, setInitialState } = useModel('@@initialState')

  const { data, refetch } = useQuery(['captcha'], () => getCode())

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        'url(\'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr\')',
      backgroundSize: '100% 100%'
    }
  })

  const intl = useIntl()

  const fetchUserInfo = async (token: string) => {
    const userInfo = await initialState?.fetchUserInfo?.(token)
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo
        }))
      })
    }
  }

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await login({ ...values, uuid: data?.data?.uuid })
      if (msg.code === 200) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！'
        })
        message.success(defaultLoginSuccessMessage)
        await fetchUserInfo(msg.data.token)
        const urlParams = new URL(window.location.href).searchParams
        history.push(urlParams.get('redirect') || '/')
        return
      }
      console.log(msg)
      // 如果失败去设置用户错误信息
      setUserLoginState(msg)
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！'
      })
      console.log(error)
      message.error(defaultLoginFailureMessage)
    }
  }
  const { status } = userLoginState

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: '登录页'
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0'
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw'
          }}
          logo={<img alt="logo" src={UMI_APP_PUBLIC_PATH + 'logo.svg'} />}
          title="Ant Design"
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          initialValues={{
            autoLogin: true
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams)
          }}
        >
          {status === 'error' && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: '账户或密码错误(admin/ant.design)'
              })}
            />
          )}
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: '用户名: admin or user'
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="请输入用户名!"
                    />
                  )
                }
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: '密码: ant.design'
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  )
                }
              ]}
            />
            <ProFormText
              name="code"
              fieldProps={{
                size: 'large',
                prefix: <CalculatorOutlined />
              }}
              addonAfter={
                <img
                  src={'data:image/gif;base64,' + data?.data.img}
                  onClick={refetch as () => void}
                />
              }
            />
          </>
          <div style={{ marginBottom: 24 }}>
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
            </ProFormCheckbox>
            <a
              style={{
                float: 'right'
              }}
            >
              <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  )
}

export default Login
