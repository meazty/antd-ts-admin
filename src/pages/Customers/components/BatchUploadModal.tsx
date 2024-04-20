import React from 'react';
import { ModalForm, ProFormTextArea } from '@ant-design/pro-components';
import { Alert, Col, Collapse, List, Row, Typography } from 'antd';
import CategorySelector from './CategorySelector';

interface Props {
  open: boolean;
  onOpenChange: (visible: boolean) => void;
  onFinish: (formData: any) => Promise<any>;
  emails: any;
}

const { Panel } = Collapse;
const { Text } = Typography;

const BatchUploadModal: React.FC<Props> = ({ open, onOpenChange, onFinish, emails }) => {
  return (
    <ModalForm
      title="批量上传"
      open={open}
      onOpenChange={onOpenChange}
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
      }}
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={16}>
          <ProFormTextArea
            name="emails"
            label="批量邮箱（一行一个邮箱）"
            width="md"
            rules={[{ required: true, message: '请输入批量邮箱' }]}
            placeholder="一行一个邮箱"
            fieldProps={{
              style: { minHeight: '500px' },
            }}
          />
          <CategorySelector />
        </Col>
        <Col span={8}>
          <p>上传结果：</p>
          {emails && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Alert message={`总邮箱数量: ${emails?.emailList?.length}`} type="info" showIcon />
              <Alert message={`去复后邮箱数量: ${emails?.emailSet?.length}`} type="info" showIcon />
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
