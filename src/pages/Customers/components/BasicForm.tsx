import { ProForm, ProFormText } from '@ant-design/pro-components';
import CategorySelector from './CategorySelector';

interface Props {
  newRecord?: boolean;
}

const BasicForm: React.FC<Props> = () => {
  return (
    <>
      <ProForm.Group>
        <ProFormText
          rules={[{ required: true, message: '请输入邮箱' }]}
          width="md"
          label="邮箱"
          name="email"
        />
        <CategorySelector />
      </ProForm.Group>
    </>
  );
};

export default BasicForm;
