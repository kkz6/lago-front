import { gql } from '@apollo/client'
import { Stack } from '@mui/material'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { generatePath, Link, useNavigate } from 'react-router-dom'
import { object, string } from 'yup'

import GoogleAuthButton from '~/components/auth/GoogleAuthButton'
import { Alert, Button, Typography } from '~/components/designSystem'
import { TextInputField } from '~/components/form'
import { envGlobalVar, hasDefinedGQLError, onLogIn } from '~/core/apolloClient'
import { FORGOT_PASSWORD_ROUTE, LOGIN_OKTA, SIGN_UP_ROUTE } from '~/core/router'
import { CurrentUserFragmentDoc, LagoApiError, useLoginUserMutation } from '~/generated/graphql'
import { useInternationalization } from '~/hooks/core/useInternationalization'
import { useShortcuts } from '~/hooks/ui/useShortcuts'
import { useDeveloperTool } from '~/hooks/useDeveloperTool'
import { useSalesForceConfig } from '~/hooks/useSalesForceConfig'
import { Card, Page, StyledLogo } from '~/styles/auth'

const { disableSignUp } = envGlobalVar()

gql`
  mutation loginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      user {
        id
        ...CurrentUser
      }
      token
    }
  }

  ${CurrentUserFragmentDoc}
`

const Login = () => {
  const { translate } = useInternationalization()
  const { isRunningInSalesForceIframe } = useSalesForceConfig()
  const navigate = useNavigate()
  const { close: closeDevTool } = useDeveloperTool()

  useEffect(() => {
    // In case the devtools are open, close it
    closeDevTool()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [loginUser, { error: loginError }] = useLoginUserMutation({
    context: { silentErrorCodes: [LagoApiError.UnprocessableEntity] },
    onCompleted(res) {
      if (!!res?.loginUser) {
        onLogIn(res.loginUser.token, res?.loginUser?.user)
      }
    },
    fetchPolicy: 'network-only',
  })

  const formikProps = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: object().shape({
      email: string()
        .email('text_620bc4d4269a55014d493fc3')
        .required('text_620bc4d4269a55014d493f98'),
      password: string().required('text_620bc4d4269a55014d493fb3'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      await loginUser({
        variables: {
          input: {
            email: values.email,
            password: values.password,
          },
        },
      })
    },
  })

  useShortcuts([
    {
      keys: ['Enter'],
      action: formikProps.submitForm,
    },
  ])

  return (
    <Page>
      <Card>
        <StyledLogo height={24} />

        <Stack spacing={8}>
          <Stack spacing={3}>
            <Typography variant="headline">{translate('text_620bc4d4269a55014d493f08')}</Typography>
            <Typography>{translate('text_620bc4d4269a55014d493f81')}</Typography>
          </Stack>

          {hasDefinedGQLError('IncorrectLoginOrPassword', loginError) && (
            <Alert data-test="error-alert" type="danger">
              {translate('text_620bc4d4269a55014d493fb7')}
            </Alert>
          )}

          {!isRunningInSalesForceIframe && (
            <>
              <Stack spacing={4}>
                <GoogleAuthButton
                  mode="login"
                  label={translate('text_660bf95c75dd928ced0ecb31')}
                  hideAlert={!!loginError}
                />
                <Button
                  fullWidth
                  startIcon="okta"
                  size="large"
                  variant="tertiary"
                  onClick={() => navigate(LOGIN_OKTA)}
                >
                  {translate('text_664c90c9b2b6c2012aa50bce')}
                </Button>
              </Stack>

              <div className="flex items-center justify-center gap-4 before:flex-1 before:border before:border-grey-300 before:content-[''] after:flex-1 after:border after:border-grey-300 after:content-['']">
                <Typography variant="captionHl" color="grey500">
                  {translate('text_6303351deffd2a0d70498675').toUpperCase()}
                </Typography>
              </div>
            </>
          )}

          <div className="flex flex-col gap-4">
            <TextInputField
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              name="email"
              beforeChangeFormatter={['lowercase']}
              formikProps={formikProps}
              label={translate('text_62ab2d0396dd6b0361614d60')}
              placeholder={translate('text_62a99ba2af7535cefacab4bf')}
            />

            <div className="relative">
              <TextInputField
                name="password"
                formikProps={formikProps}
                password
                label={translate('text_620bc4d4269a55014d493f32')}
                placeholder={translate('text_620bc4d4269a55014d493f5b')}
              />
              <Typography className="absolute right-0 top-0" variant="caption">
                <Link to={generatePath(FORGOT_PASSWORD_ROUTE)}>
                  {translate('text_642707b0da1753a9bb6672b5')}
                </Link>
              </Typography>
            </div>
          </div>

          <Button data-test="submit" fullWidth size="large" onClick={formikProps.submitForm}>
            {translate('text_620bc4d4269a55014d493f6d')}
          </Button>

          {!disableSignUp && !isRunningInSalesForceIframe && (
            <Typography
              className="mx-auto text-center"
              variant="caption"
              html={translate('text_62c84d0029355c83db4dd186', {
                linkSignUp: SIGN_UP_ROUTE,
              })}
            />
          )}
        </Stack>
      </Card>
    </Page>
  )
}

export default Login
