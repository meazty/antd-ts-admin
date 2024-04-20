import useQueryList from '@/hooks/useQueryList';
import { addItem } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import { ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Button, Divider, Input, InputRef, Space } from 'antd';
import { useRef, useState } from 'react';

interface Props {
  newRecord?: boolean;
}

const BasicForm: React.FC<Props> = () => {
  const { items: categories, query: queryCategories } = useQueryList('/categories');
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addCategory = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!name) {
      return;
    }
    await addItem('/categories', { name });
    await queryCategories();
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <>
      <ProForm.Group>
        <ProFormText
          rules={[{ required: true, message: '请输入邮箱' }]}
          width="md"
          label="邮箱"
          name="email"
        />

        <ProFormSelect
          rules={[{ required: false, message: '请输入所属分组！' }]}
          label="所属分组"
          name="category"
          showSearch
          width="md"
          placeholder="选择或添加所属分组"
          fieldProps={{
            dropdownRender: (menu) => (
              <>
                {menu}
                <Divider style={{ margin: '8px 0' }} />
                <Space style={{ padding: '0 8px 4px' }}>
                  <Input
                    placeholder="请输入所属分组名称"
                    ref={inputRef}
                    value={name}
                    width="lg"
                    onChange={onNameChange}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addCategory}>
                    添加分组
                  </Button>
                </Space>
              </>
            ),
          }}
          options={categories.map((category: any) => ({
            label: category.name,
            value: category._id,
          }))}
        />
      </ProForm.Group>
    </>
  );
};

export default BasicForm;
