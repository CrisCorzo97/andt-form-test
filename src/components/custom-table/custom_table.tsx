import Icon from '@ant-design/icons/lib/components/Icon';
import { ConfigProvider, Result, Table, Tooltip } from 'antd';
import { ColumnType, TablePaginationConfig } from 'antd/es/table';
import { CompareFn } from 'antd/es/table/interface';
import { AlignType } from 'rc-table/lib/interface';
import { CSSProperties, ReactNode } from 'react';
import { FcReading } from 'react-icons/fc';

// Table header section

type TableHeaderProps = {
  title: string | number;
  description?: string;
};

const TableHeader: React.FC<TableHeaderProps> = ({ title, description }) => {
  return (
    <Tooltip title={description ?? ''}>
      <span
        style={{
          fontWeight: 500,
          color: '#7E8299',
          letterSpacing: 0.8,
          zIndex: 10,
        }}
      >
        {title}
      </span>
    </Tooltip>
  );
};

// Custom table section

type ScrollType = {
  x?: string | number | true | undefined;
  y?: string | number | undefined;
} & { scrollToFirstRowOnChange?: boolean | undefined };

type CustomColumn<T> = {
  key?: string;
  title: string;
  titleDescription?: string;
  dataIndex?: string | string[];
  sorter?: CompareFn<T>;
  render?: (value: any | undefined | null, record: T) => ReactNode;
  align?: AlignType;
  width?: string | number;
};

type CustomTableProps<T extends object> = {
  rowKey: string;
  loading: boolean;
  dataSource: T[];
  columns: CustomColumn<T>[];
  pagination: TablePaginationConfig | false;
  expandable?: {
    expandedRowRender: (record: T) => ReactNode;
    rowExpandable: (data: T) => boolean;
  };
  scroll?: ScrollType;
  size?: 'large' | 'middle' | 'small';
  resultExtra?: ReactNode;
  style?: CSSProperties;
  resultSubTitle?: string;
};

export const CustomTable = <T extends object>({
  rowKey,
  dataSource,
  columns,
  pagination,
  loading,
  scroll,
  size,
  resultExtra,
  style,
  resultSubTitle,
  expandable,
}: CustomTableProps<T>) => {
  const formattedColumns: ColumnType<T>[] = columns.map((column) => ({
    showSorterTooltip: false,
    key: column.key,
    title: (
      <TableHeader title={column.title} description={column.titleDescription} />
    ),
    dataIndex: column.dataIndex,
    sorter: column.sorter,
    render: column.render,
    align: column.align,
    width: column.width,
  }));

  return (
    <ConfigProvider
      renderEmpty={() => (
        <Result
          icon={<Icon component={() => <FcReading />} />}
          extra={resultExtra}
          title='No se han encontrado resultados'
          subTitle={
            resultSubTitle ??
            'Intentá cambiar los filtros o consultalo con tu desarrollador de confianza'
          }
        />
      )}
    >
      <Table
        rowKey={rowKey}
        columns={formattedColumns}
        dataSource={dataSource ?? []}
        loading={loading}
        pagination={pagination}
        scroll={scroll ?? undefined}
        size={size ?? undefined}
        style={style ?? undefined}
        expandable={expandable}
      />
    </ConfigProvider>
  );
};
