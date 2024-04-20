import React, { useState } from 'react';
import { ModalForm } from '@ant-design/pro-components';
import { Alert, Collapse, Form, Input, List } from 'antd';
import MyUpload from '@/components/MyUpload';
import CategorySelector from './CategorySelector';

export type FormValueType = Partial<API.ItemData>;

export type UpdateFormProps = {
  open: boolean;
  onOpenChange: (visible: boolean) => void;
  onFinish: (formData: any) => Promise<any>;
};

const { Panel } = Collapse;

const UploadForm: React.FC<UpdateFormProps> = (props) => {
  const { open, onOpenChange, onFinish } = props;
  const [emails, setEmails] = useState<any>(null);
  const handleFinish = async (values: any) => {
    // 将上传的emails添加到表单数据中
    const formData = {
      ...values,
      emails: emails,
    };
    console.log('Final form data:', formData);
    return onFinish(formData); // 调用传入的onFinish，现在传入包含所有数据的formData
  };

  return (
    <ModalForm
      title="批量上传"
      open={open}
      onOpenChange={onOpenChange}
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
      }}
      onFinish={handleFinish}
    >
      <Form.Item required label="客户邮箱" name="emailFile">
        <MyUpload
          accept=".xls,.xlsx"
          url="/customers/batch-upload-excel"
          onFileUpload={(data: any) => {
            console.log('Uploaded resource URL:', data);
            setEmails(data); // Assuming 'data' is an array of objects with a 'title' property
          }}
        />
      </Form.Item>
      {emails?.length > 0 && (
        <Alert
          message="检测到邮箱"
          description={
            <Collapse>
              <Panel header={`点击查看详细 ${emails.length} 个邮箱`} key="1">
                <List
                  dataSource={emails}
                  renderItem={(email: string) => <List.Item>{email}</List.Item>}
                />
              </Panel>
            </Collapse>
          }
          type="info"
          showIcon
          style={{ marginBottom: '20px' }}
        />
      )}
      <CategorySelector />
      <Form.Item name="_id" label={false}>
        <Input type="hidden" />
      </Form.Item>
    </ModalForm>
  );
};

export default UploadForm;
