import React, { useState } from 'react';
import { ModalForm, ProForm, ProFormTextArea } from '@ant-design/pro-components';
import { Alert, Col, Collapse, Form, List, Radio, Row, Typography } from 'antd';
import CategorySelector from './CategorySelector';
import MyUpload from '@/components/MyUpload';

interface Props {
  open: boolean;
  onOpenChange: (visible: boolean) => void;
  onFinish: (formData: any) => Promise<any>;
  emails: any;
}

const { Panel } = Collapse;
const { Text } = Typography;
const { Group: RadioGroup } = Radio;

const BatchUploadModal: React.FC<Props> = ({ open, onOpenChange, onFinish, emails }) => {
  const [, setEmailArray] = useState<string[]>([]);
  const [uploadType, setUploadType] = useState('text');
  const [localEmails, setLocalEmails] = useState<any>(null);

  const handleFinish = async (values: any) => {
    // Split the textarea content by new lines and trim each email
    const emails = values.emails
      .split('\n')
      .map((email: string) => email.trim())
      .filter((email: string) => email !== '');
    setEmailArray(Array.from(new Set(emails))); // Update the state with the array of emails

    // Call the passed onFinish function to handle the submission with the processed data
    await onFinish({
      ...values,
      emails,
    });
  };

  const handleExcelFinish = async (values: any) => {
    // 将上传的emails添加到表单数据中
    const formData = {
      ...values,
      emails: localEmails,
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
      onFinish={uploadType === 'text' ? handleFinish : handleExcelFinish}
    >
      <Row gutter={16}>
        <Col span={16}>
          <ProForm.Item name="uploadType" label="上传类型">
            <RadioGroup onChange={(e) => setUploadType(e.target.value)} value={uploadType}>
              <Radio value="text">批量邮箱（一行一个邮箱）</Radio>
              <Radio value="file">文件上传</Radio>
            </RadioGroup>
          </ProForm.Item>
          {uploadType === 'text' && (
            <ProFormTextArea
              name="emails"
              label="批量邮箱（一行一个邮箱）"
              width="md"
              rules={[{ required: true, message: '请输入批量邮箱' }]}
              placeholder="一行一个邮箱"
              fieldProps={{
                style: { minHeight: '200px' },
              }}
            />
          )}
          {uploadType === 'file' && (
            <>
              <Form.Item required label="客户邮箱" name="emailFile">
                <MyUpload
                  accept=".xls,.xlsx"
                  url="/customers/batch-upload-excel"
                  onFileUpload={(data: any) => {
                    console.log('Uploaded resource URL:', data);
                    setLocalEmails(data); // Assuming 'data' is an array of objects with a 'title' property
                  }}
                />
              </Form.Item>
              {localEmails?.length > 0 && (
                <Alert
                  message="检测到邮箱"
                  description={
                    <Collapse>
                      <Panel header={`点击查看详细 ${localEmails.length} 个邮箱`} key="1">
                        <List
                          dataSource={localEmails}
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
            </>
          )}
          <CategorySelector />
        </Col>
        <Col span={8}>
          <p>上传结果：</p>
          {emails && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Alert message={`总邮箱数量: ${emails?.emailList?.length}`} type="info" showIcon />
              <Alert message={`去重后邮箱数量: ${emails?.emailSet?.length}`} type="info" showIcon />
              <Alert
                message={`成功上传数量: ${emails?.successes?.length}`}
                type="success"
                showIcon
              />
              <Collapse bordered={false}>
                <Panel
                  header={<Text type="danger">上传失败数量: {emails.failures?.length}</Text>}
                  key="1"
                >
                  <List
                    size="small"
                    bordered
                    dataSource={emails?.failures}
                    renderItem={(item: any) => (
                      <List.Item>
                        <Text type="danger">
                          {item.email}:{' '}
                          {item.error.includes('duplicate key') ? '已经存在' : item.error}
                        </Text>
                      </List.Item>
                    )}
                  />
                </Panel>
              </Collapse>
            </div>
          )}
        </Col>
      </Row>
    </ModalForm>
  );
};

export default BatchUploadModal;
