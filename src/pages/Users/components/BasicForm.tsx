import { ProForm, ProFormText, ProFormSelect } from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import { useIntl } from '@umijs/max';

interface Props {
  newRecord?: boolean;
}

const BasicForm: React.FC<Props> = (props) => {
  const intl = useIntl();
  const { newRecord } = props;
  const access = useAccess();
  return (
    <>
      <ProForm.Group>
        <ProFormText
          rules={[{ required: true, message: intl.formatMessage({ id: 'name.required' }) }]}
          width="md"
          label={intl.formatMessage({ id: 'name' })}
          name="name"
        />
        <ProFormText
          rules={[{ required: true, message: intl.formatMessage({ id: 'email.required' }) }]}
          width="md"
          label={intl.formatMessage({ id: 'email' })}
          name="email"
        />
        <ProFormText
          rules={[
            { required: newRecord, message: intl.formatMessage({ id: 'password.required' }) },
          ]}
          width="md"
          label={intl.formatMessage({ id: 'password' })}
          name="password"
        />
        {access.canSuperAdmin && (
          <ProFormSelect
            name="role"
            width="md"
            label={intl.formatMessage({ id: 'role' })}
            valueEnum={{
              SUPER_ADMIN: intl.formatMessage({ id: 'role.super_admin' }),
              CUSTOMER: intl.formatMessage({ id: 'role.customer' }),
              ORDER_CLERK: intl.formatMessage({ id: 'role.order_clerk' }),
              ADMIN: intl.formatMessage({ id: 'role.admin' }),
              FINANCIAL_STAFF: intl.formatMessage({ id: 'role.financial_staff' }),
            }}
          />
        )}
      </ProForm.Group>
    </>
  );
};

export default BasicForm;
