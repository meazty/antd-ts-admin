import { ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';

interface Props {
  newRecord?: boolean;
}

const BasicForm: React.FC<Props> = () => {
  return (
    <>
      <ProForm.Group>
        <ProFormText
          rules={[{ required: true, message: '请输入名称' }]}
          width="md"
          label="名称"
          name="name"
        />
        <ProFormTextArea
          name="description"
          label="描述"
          width="md"
          rules={[{ required: false, message: '请输入描述' }]}
          placeholder="可选：请输入详细的描述"
        />
      </ProForm.Group>
    </>
  );
};

export default BasicForm;
