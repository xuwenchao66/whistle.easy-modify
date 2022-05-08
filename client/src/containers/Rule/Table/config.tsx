import { Switch, Space, Button, Typography } from 'antd';
import { ColumnType } from 'antd/es/table';
import { Rule } from '@server/src/models/rules/rule.type';

const { Link } = Typography;

export const getColumn = (): ColumnType<Rule>[] => [
  {
    title: 'Pattern',
    key: 'pattern',
    dataIndex: 'pattern',
    ellipsis: true,
    render: (value) => <Link>{value}</Link>,
  },
  {
    title: 'Response Body',
    key: 'response',
    dataIndex: 'response',
    ellipsis: true,
    render: (_, row) => row.replacer?.response?.body,
  },
  {
    title: 'Action',
    key: 'operation',
    dataIndex: 'operation',
    width: 200,
    render: (_, row) => {
      const { enable } = row;

      return (
        <Space size="large">
          <Switch checked={enable} size="small" />
          <Button type="primary" size="small">
            Edit
          </Button>
          <Button type="primary" danger size="small">
            Delete
          </Button>
        </Space>
      );
    },
  },
];
