import { ModalForm } from '@ant-design/pro-components';
import BasicForm from './BasicForm';
import { useIntl } from '@umijs/max';
interface Props {
  open: boolean;
  onOpenChange: (visible: boolean) => void;
  onFinish: (formData: any) => Promise<void>;
}

const Create: React.FC<Props> = (props) => {
  const intl = useIntl();
  const { open, onOpenChange, onFinish } = props;
  return (
    <ModalForm
      title={intl.formatMessage({ id: 'new' })}
      width="400px"
      open={open}
      onOpenChange={onOpenChange}
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
      }}
      onFinish={onFinish}
    >
      <BasicForm newRecord />
    </ModalForm>
  );
};

export default Create;
