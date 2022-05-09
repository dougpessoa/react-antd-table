import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Switch, Space } from 'antd';
import { columns, data } from './three';

// rowSelection objects indicates the need for row selection

function TreeData() {
  const [checkStrictly, setCheckStrictly] = React.useState(false);
  const [selectedRowKeys, setSelectedRows] = React.useState(
    data.filter((item) => item.checkbox).map((item) => item.key)
  );
  const [update, setUpdate] = React.useState(false);

  const functions = {
    onChange: (selectedRowKeys, selectedRows) => {
      const willSelect = [];
      console.log({ selectedRowKeys, selectedRows });
      for (let i = 0; i < selectedRows.length; i++) {
        const row = selectedRows[i];
        const hasLine = selectedRowKeys.findIndex(
          (selected) => selected === row.key
        );

        if (hasLine !== -1)
          // tem
          willSelect.push(row.key);

        if (row.type === 'lines') {
          console.log('lines: ', row);

          row.children.forEach((service) => {
            willSelect.push(service.key);

            service.children.forEach((departure) => {
              willSelect.push(departure.key);
            });
          });
        } else if (row.type === 'service') {
          row.children.forEach((departure) => {
            willSelect.push(departure.key);
          });
        }
      }

      console.log({ willSelect });
      setSelectedRows(willSelect);
    },
    onSelectNone: (data) => {
      console.log({ data });
    },
    onSelectInvert: (selectedRowKeys) => {
      console.log({ selectedRowKeys });
    },
  };
  /**
   * quando selecionar o pai, seleciona os filhos
   */

  return (
    <>
      <Table
        columns={columns}
        rowSelection={{
          ...functions,
          selectedRowKeys,
          checkStrictly: true,
        }}
        dataSource={data}
      />
    </>
  );
}

export default () => <TreeData />;
